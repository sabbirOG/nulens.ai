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
  const [showSamples, setShowSamples] = useState(false);

  const presets = [
    {
      name: "Hilsa Meal",
      image:
        "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=400",
      items: [
        { foodId: "rice", quantity: 1.5 },
        { foodId: "dal", quantity: 1 },
        { foodId: "ilish", quantity: 1 },
      ],
    },
    {
      name: "Beef & Rice",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400",
      items: [
        { foodId: "rice", quantity: 2 },
        { foodId: "beef", quantity: 1 },
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
    } catch {
      setIsCameraActive(false);
      setErrorMsg("Camera unavailable. Try uploading a photo instead.");
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
    return () => stopCamera();
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
        runYoloScan(null);
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
        runYoloScan(null);
      };
      reader.readAsDataURL(file);
    }
  };

  type PresetItems = (typeof presets)[0]["items"];

  const runYoloScan = (presetItems: PresetItems | null) => {
    setIsScanning(true);
    setScanStep("Analyzing your meal...");

    setTimeout(() => {
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
    }, 1800);
  };

  return (
    <section id="scan" className="animate-fade-up">
      <div className="card-surface overflow-hidden relative">
        {isScanning && (
          <div className="absolute left-0 right-0 h-0.5 bg-accent z-20 animate-scan-loop" />
        )}

        {isCameraActive && !capturedImage && (
          <div className="relative w-full aspect-[4/3] bg-stone-900">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center gap-4">
              <button
                onClick={stopCamera}
                className="px-4 py-2.5 rounded-xl bg-white/20 text-white text-sm font-medium touch-target"
              >
                Cancel
              </button>
              <button
                onClick={capturePhoto}
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center touch-target active:scale-95"
                aria-label="Capture photo"
              >
                <div className="w-11 h-11 rounded-full border-4 border-stone-300 bg-accent" />
              </button>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="relative w-full aspect-[4/3] bg-stone-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={capturedImage}
              alt="Captured meal"
              className="w-full h-full object-cover"
            />
            {isScanning && (
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-3 p-6">
                <Layers className="w-8 h-8 text-accent animate-pulse" />
                <span className="text-sm font-medium text-foreground">
                  {scanStep}
                </span>
                <div className="w-32 h-1 bg-border rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-accent animate-loading-bar" />
                </div>
              </div>
            )}
            {!isScanning && (
              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
                <button
                  onClick={() => {
                    setCapturedImage(null);
                    startCamera();
                  }}
                  className="px-5 py-2.5 rounded-xl btn-primary text-sm flex items-center gap-2 touch-target"
                >
                  <RefreshCw className="w-4 h-4" />
                  Scan again
                </button>
              </div>
            )}
          </div>
        )}

        {!isCameraActive && !capturedImage && (
          <div className="p-6 sm:p-8">
            <div className="flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-accent-soft flex items-center justify-center">
                <Camera className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h2 className="section-title">Scan your plate</h2>
                <p className="section-subtitle mt-1 max-w-xs mx-auto">
                  Take a photo of your meal to see nutrition info
                </p>
              </div>

              <div className="flex flex-col w-full gap-2.5 max-w-xs">
                <button
                  onClick={startCamera}
                  className="w-full py-3.5 rounded-xl btn-primary text-sm flex items-center justify-center gap-2 touch-target"
                >
                  <Camera className="w-4 h-4" />
                  Open camera
                </button>
                <label className="relative w-full py-3.5 rounded-xl btn-secondary text-sm flex items-center justify-center gap-2 cursor-pointer touch-target">
                  <Upload className="w-4 h-4 text-muted" />
                  Upload photo
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
                <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl p-3 w-full max-w-xs text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {!isCameraActive && !capturedImage && !isScanning && (
        <div className="mt-3 text-center">
          <button
            onClick={() => setShowSamples(!showSamples)}
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            {showSamples ? "Hide samples" : "Try a sample plate instead"}
          </button>

          {showSamples && (
            <div className="mt-3 flex gap-2 justify-center flex-wrap">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCapturedImage(preset.image);
                    runYoloScan(preset.items);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-surface text-sm text-foreground hover:bg-surface-muted transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preset.image}
                    alt={preset.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  {preset.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
