import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();
    if (!image) {
      return NextResponse.json({ error: "No image data provided" }, { status: 400 });
    }

    // 1. Check if hosted FastAPI server URL is defined (Production / Vercel mode)
    const yoloApiUrl = process.env.YOLO_API_URL;
    if (yoloApiUrl) {
      try {
        console.log(`Forwarding scan request to external YOLO FastAPI: ${yoloApiUrl}`);
        const response = await fetch(yoloApiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image }),
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`External API returned status ${response.status}: ${errText}`);
        }

        const data = await response.json();
        return NextResponse.json({ detections: data.detections || [] });
      } catch (apiError: any) {
        console.error("Error calling external YOLO FastAPI:", apiError);
        return NextResponse.json(
          { error: "Hosted model inference server failed", details: apiError.message },
          { status: 500 }
        );
      }
    }

    // 2. Fallback to local python script subprocess execution (Local dev mode)
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: "Invalid base64 image data" }, { status: 400 });
    }

    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");

    // Ensure temp directory exists
    const tempDir = path.join(process.cwd(), "yolo-training", "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Generate unique temp file path
    const filename = `scan_${Date.now()}.webp`;
    const tempFilePath = path.join(tempDir, filename);

    // Write buffer to temp file
    fs.writeFileSync(tempFilePath, buffer);

    // Resolve path to python interpreter in the virtual environment
    const isWindows = process.platform === "win32";
    const pythonPath = isWindows
      ? path.join(process.cwd(), ".venv", "Scripts", "python.exe")
      : path.join(process.cwd(), ".venv", "bin", "python");

    const predictScriptPath = path.join(process.cwd(), "yolo-training", "predict.py");

    // Execute Python script
    const command = `"${pythonPath}" "${predictScriptPath}" "${tempFilePath}"`;
    
    let detections = [];
    try {
      const { stdout, stderr } = await execPromise(command);
      if (stderr) {
        console.error("Python model prediction stderr:", stderr);
      }
      
      const stdoutTrimmed = stdout.trim();
      const jsonStart = stdoutTrimmed.indexOf("[");
      const jsonEnd = stdoutTrimmed.lastIndexOf("]") + 1;

      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        const cleanJson = stdoutTrimmed.substring(jsonStart, jsonEnd);
        detections = JSON.parse(cleanJson);
      } else {
        throw new SyntaxError(`No valid JSON output found. Raw output: ${stdoutTrimmed}`);
      }
    } catch (execError: any) {
      console.error("Error executing Python YOLO prediction script:", execError);
      return NextResponse.json(
        { error: "Model inference execution failed", details: execError.message },
        { status: 500 }
      );
    } finally {
      // Clean up temp file safely
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }

    return NextResponse.json({ detections });
  } catch (error: any) {
    console.error("API scan route error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
