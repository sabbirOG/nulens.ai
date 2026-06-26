const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execPromise = promisify(exec);

async function test() {
    const isWindows = process.platform === "win32";
    const pythonPath = isWindows
      ? path.join(process.cwd(), ".venv", "Scripts", "python.exe")
      : path.join(process.cwd(), ".venv", "bin", "python");

    const predictScriptPath = path.join(process.cwd(), "yolo-training", "predict.py");
    const tempFilePath = path.join(process.cwd(), "dummy.jpg");

    const command = `"${pythonPath}" "${predictScriptPath}" "${tempFilePath}"`;
    console.log("Command:", command);

    try {
      const { stdout, stderr } = await execPromise(command);
      console.log("STDOUT:", stdout);
      console.log("STDERR:", stderr);
      
      const stdoutTrimmed = stdout.trim();
      const jsonStart = stdoutTrimmed.indexOf("[");
      const jsonEnd = stdoutTrimmed.lastIndexOf("]") + 1;

      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        const cleanJson = stdoutTrimmed.substring(jsonStart, jsonEnd);
        console.log("Clean JSON:", cleanJson);
        const detections = JSON.parse(cleanJson);
        console.log("Detections parsed:", detections);
      } else {
        console.error(`No valid JSON output found. Raw output: ${stdoutTrimmed}`);
      }
    } catch (e) {
      console.error("Error executing:", e);
    }
}

test();
