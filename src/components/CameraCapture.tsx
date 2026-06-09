"use client";

import React, { useRef, useState, useEffect } from "react";
import { Camera, Upload, AlertCircle, RefreshCw, Layers } from "lucide-react";

interface CameraCaptureProps {
  onScanComplete: (detectedItems: Array<{ foodId: string; quantity: number }>) => void;
}

export default function CameraCapture({ onScanComplete }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Presets for easy demonstration
  const presets = [
    {
      name: "Traditional Hilsa Meal",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=400",
      items: [
        { foodId: "rice", quantity: 1.5 },
        { foodId: "dal", quantity: 1 },
        { foodId: "ilish", quantity: 1 },
        { foodId: "begun_bhaja", quantity: 1 },
      ]
    },
    {
      name: "Rich Beef & Rice",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400",
      items: [
        { foodId: "rice", quantity: 2 },
        { foodId: "beef", quantity: 1 },
        { foodId: "begun_bhaja", quantity: 2 },
      ]
    },
    {
      name: "Bengali Tea Time Sweet",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400",
      items: [
        { foodId: "singara", quantity: 2 },
        { foodId: "roshogolla", quantity: 2 },
      ]
    }
  ];

  // Initialize camera stream
  const startCamera = async () => {
    setErrorMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // prefer back camera
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCameraAccess(true);
      setIsCameraActive(true);
      setCapturedImage(null);
    } catch (err: unknown) {
      console.error("Camera access failed:", err);
      setHasCameraAccess(false);
      setIsCameraActive(false);
      setErrorMsg("Unable to access camera. Please upload an image or use our plate presets below.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Capture current video frame to canvas
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imgData = canvas.toDataURL("image/webp");
        setCapturedImage(imgData);
        stopCamera();
        runYoloScan(imgData, null);
      }
    }
  };

  // Trigger file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result as string;
        setCapturedImage(imgData);
        stopCamera();
        runYoloScan(imgData, null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run the mock YOLOv8 scan
  const runYoloScan = (imageSource: string, presetItems: typeof presets[0]["items"] | null) => {
    setIsScanning(true);
    setScanStep("Initializing YOLOv8 Vision pipeline...");
    
    // Cycle scanning feedback
    const steps = [
      "Uploading frame to ML Server...",
      "YOLOv8: Segmenting plate area...",
      "YOLOv8: Identifying Bangladeshi food items...",
      "Matching visual features against database...",
      "Analyzing portion boundaries...",
      "Classification complete!"
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setScanStep(steps[currentStepIndex]);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
        
        // Return detected items
        if (presetItems) {
          onScanComplete(presetItems);
        } else {
          // If custom upload/capture, randomize a meal or select standard rice & dal
          const defaultScanned = [
            { foodId: "rice", quantity: 1.5 },
            { foodId: "dal", quantity: 1 },
            { foodId: "chicken", quantity: 1 }
          ];
          onScanComplete(defaultScanned);
        }
      }
    }, 450);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden relative min-h-[350px] flex flex-col items-center justify-center p-6 text-center">
        {/* Glowing Scanning Line */}
        {isScanning && (
          <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-md shadow-cyan-400/50 z-20 animate-[scan-loop_1.8s_infinite_ease-in-out]" />
        )}

        {/* 1. Active Video Stream */}
        {isCameraActive && !capturedImage && (
          <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
              <button
                onClick={capturePhoto}
                className="w-14 h-14 rounded-full bg-red-600 border-4 border-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                title="Capture photo"
              />
              <button
                onClick={stopCamera}
                className="px-4 py-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700 text-xs text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* 2. Scanning / Uploaded / Captured Image Output */}
        {capturedImage && (
          <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-zinc-950 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={capturedImage}
              alt="Scan target"
              className="w-full h-full object-cover filter brightness-90"
            />
            {isScanning && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 p-4 z-10 backdrop-blur-[2px]">
                <Layers className="w-10 h-10 text-cyan-400 animate-pulse" />
                <span className="text-sm font-semibold text-zinc-100">{scanStep}</span>
                <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 animate-[loading-bar_2s_infinite_linear]" />
                </div>
              </div>
            )}
            {!isScanning && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setCapturedImage(null);
                    startCamera();
                  }}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white shadow-lg shadow-cyan-900/30 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Scan Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. Empty State / Fallback Options */}
        {!isCameraActive && !capturedImage && (
          <div className="flex flex-col items-center gap-4 max-w-sm">
            <div className="w-16 h-16 rounded-full bg-purple-950/40 border border-purple-800/60 flex items-center justify-center text-purple-400">
              <Camera className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-zinc-200 font-semibold text-base">Analyze your plate</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Point your camera at the meal or upload an image to identify ingredients and calculate health metrics.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full">
              <button
                onClick={startCamera}
                className="flex-1 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40 transition-colors"
              >
                <Camera className="w-4 h-4" />
                Open Camera
              </button>

              <div className="flex-1 relative border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 rounded-xl p-2.5 flex items-center justify-center gap-2 cursor-pointer transition-colors text-zinc-300">
                <Upload className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-medium">Upload File</span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  aria-label="Upload plate photo"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-1.5 text-xs text-pink-400 border border-pink-900/50 bg-pink-950/10 rounded-lg p-2.5 mt-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="text-left">{errorMsg}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preset Testing Plates */}
      <div className="flex flex-col gap-3">
        <div>
          <h4 className="text-sm font-semibold text-zinc-300">Quick Test Plates</h4>
          <p className="text-xs text-zinc-500">No real food? Choose a typical Bangladeshi plate to test health profiles.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              disabled={isScanning || isCameraActive}
              onClick={() => {
                setCapturedImage(preset.image);
                runYoloScan(preset.image, preset.items);
              }}
              className="p-3 bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 rounded-xl text-left flex items-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preset.image}
                alt={preset.name}
                className="w-12 h-12 rounded-lg object-cover filter brightness-90 group-hover:scale-105 transition-transform"
              />
              <div className="overflow-hidden">
                <span className="block font-medium text-xs text-zinc-200 truncate">{preset.name}</span>
                <span className="block text-[10px] text-zinc-500 truncate">
                  {preset.items.length} items detected
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
