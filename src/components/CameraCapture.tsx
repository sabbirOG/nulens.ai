"use client";

import React, { useRef, useState, useEffect } from "react";
import { Camera, Upload, AlertCircle, RefreshCw, Layers } from "lucide-react";

interface CameraCaptureProps {
  onScanComplete: (
    detectedItems: Array<{ foodId: string; quantity: number }>
  ) => void;
}

export default function CameraCapture({ onScanComplete }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const presets = [
    {
      name: "Hilsa Meal",
      image:
        "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=400",
      items: [
        { foodId: "rice", quantity: 1.5 },
        { foodId: "dal", quantity: 1 },
        { foodId: "ilish", quantity: 1 },
        { foodId: "begun_bhaja", quantity: 1 },
      ],
    },
    {
      name: "Beef & Rice",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400",
      items: [
        { foodId: "rice", quantity: 2 },
        { foodId: "beef", quantity: 1 },
        { foodId: "begun_bhaja", quantity: 2 },
      ],
    },
    {
      name: "Tea Time",
      image:
        "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400",
      items: [
        { foodId: "singara", quantity: 2 },
        { foodId: "roshogolla", quantity: 2 },
      ],
    },
  ];

  const startCamera = async () => {
    setErrorMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
      setCapturedImage(null);
    } catch (err: unknown) {
      console.error("Camera access failed:", err);
      setIsCameraActive(false);
      setErrorMsg(
        "Camera unavailable. Upload a photo or try a sample plate below."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

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

  const runYoloScan = (
    _imageSource: string,
    presetItems: (typeof presets)[0]["items"] | null
  ) => {
    setIsScanning(true);
    setScanStep("Initializing vision pipeline...");

    const steps = [
      "Uploading frame...",
      "Segmenting plate area...",
      "Identifying food items...",
      "Matching nutrition data...",
      "Analyzing portions...",
      "Complete!",
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setScanStep(steps[currentStepIndex]);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setIsScanning(false);

        if (presetItems) {
          onScanComplete(presetItems);
        } else {
          onScanComplete([
            { foodId: "rice", quantity: 1.5 },
            { foodId: "dal", quantity: 1 },
            { foodId: "chicken", quantity: 1 },
          ]);
        }
      }
    }, 400);
  };

  return (
    <section id="scan" className="flex flex-col gap-4 sm:gap-5 animate-fade-up">
      <div>
        <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
          <Camera className="w-5 h-5 text-purple-400 shrink-0" />
          Scan Your Plate
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
          Use your camera or upload a meal photo
        </p>
      </div>

      {/* Camera viewport */}
      <div className="card-surface overflow-hidden relative">
        {isScanning && (
          <div className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-md shadow-cyan-400/50 z-20 animate-scan-loop" />
        )}

        {isCameraActive && !capturedImage && (
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Viewfinder corners */}
            <div className="absolute inset-4 sm:inset-8 pointer-events-none">
              <div className="w-full h-full border border-white/20 rounded-2xl relative">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-lg" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center gap-4">
              <button
                onClick={stopCamera}
                className="px-5 py-3 rounded-xl bg-zinc-800/90 border border-zinc-700 text-sm text-white font-medium touch-target active:scale-95 transition-transform"
              >
                Cancel
              </button>
              <button
                onClick={capturePhoto}
                className="w-16 h-16 rounded-full bg-white border-4 border-zinc-300 shadow-xl flex items-center justify-center active:scale-90 transition-transform touch-target"
                aria-label="Capture photo"
              >
                <div className="w-12 h-12 rounded-full bg-red-500" />
              </button>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-zinc-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={capturedImage}
              alt="Captured meal"
              className="w-full h-full object-cover"
            />
            {isScanning && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4 p-6 z-10 backdrop-blur-sm">
                <Layers className="w-10 h-10 text-cyan-400 animate-pulse" />
                <span className="text-sm font-semibold text-zinc-100 text-center">
                  {scanStep}
                </span>
                <div className="w-40 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-cyan-500 animate-loading-bar" />
                </div>
              </div>
            )}
            {!isScanning && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center">
                <button
                  onClick={() => {
                    setCapturedImage(null);
                    startCamera();
                  }}
                  className="px-6 py-3 rounded-xl bg-cyan-600 active:bg-cyan-500 text-sm font-semibold text-white shadow-lg flex items-center gap-2 touch-target active:scale-95 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Scan Again
                </button>
              </div>
            )}
          </div>
        )}

        {!isCameraActive && !capturedImage && (
          <div className="flex flex-col items-center gap-5 p-6 sm:p-8 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-600/20 border border-purple-500/30 flex items-center justify-center">
              <Camera className="w-9 h-9 text-purple-400" />
            </div>
            <div className="max-w-xs">
              <h3 className="text-zinc-100 font-bold text-lg">
                Analyze your meal
              </h3>
              <p className="text-sm text-zinc-500 mt-1.5 leading-relaxed">
                Point your camera at Bhat, Ilish, Dal, or any Bangladeshi dish
                to get instant nutrition insights.
              </p>
            </div>

            <div className="flex flex-col w-full gap-3 max-w-sm">
              <button
                onClick={startCamera}
                className="w-full px-5 py-4 rounded-2xl bg-purple-600 active:bg-purple-500 text-white font-semibold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-purple-950/40 touch-target active:scale-[0.98] transition-all"
              >
                <Camera className="w-5 h-5" />
                Open Camera
              </button>

              <label className="w-full relative flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl border border-zinc-700 bg-zinc-900/60 active:bg-zinc-800 text-zinc-200 font-semibold text-base cursor-pointer touch-target active:scale-[0.98] transition-all">
                <Upload className="w-5 h-5 text-zinc-400" />
                Upload Photo
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*"
                  capture="environment"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  aria-label="Upload plate photo"
                />
              </label>
            </div>

            {errorMsg && (
              <div className="flex items-start gap-2.5 text-sm text-pink-400 border border-pink-900/50 bg-pink-950/20 rounded-xl p-3.5 w-full max-w-sm text-left">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preset plates — horizontal scroll on mobile */}
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-sm font-semibold text-zinc-300">
            Try Sample Plates
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            No food handy? Tap a sample to test profiles
          </p>
        </div>

        <div className="flex gap-3 overflow-x-auto snap-x-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              disabled={isScanning || isCameraActive}
              onClick={() => {
                setCapturedImage(preset.image);
                runYoloScan(preset.image, preset.items);
              }}
              className="snap-start shrink-0 w-[72%] sm:w-auto p-3 bg-zinc-900/50 active:bg-zinc-800/80 border border-zinc-800 active:border-zinc-600 rounded-2xl text-left flex items-center gap-3 transition-all disabled:opacity-40 disabled:cursor-not-allowed touch-target"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preset.image}
                alt={preset.name}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="block font-semibold text-sm text-zinc-200">
                  {preset.name}
                </span>
                <span className="block text-xs text-zinc-500 mt-0.5">
                  {preset.items.length} items
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
