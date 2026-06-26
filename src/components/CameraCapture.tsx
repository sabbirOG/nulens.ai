"use client";

import React, { useRef, useState, useEffect } from "react";
import { Camera, Upload, AlertCircle, RefreshCw, Layers, CheckCircle2, Play } from "lucide-react";
import { BANGLADESHI_FOOD_DB } from "@/lib/food-db";
import { useApp } from "@/context/AppContext";

interface CameraCaptureProps {
  onScanComplete: (
    detectedItems: Array<{ foodId: string; quantity: number }>
  ) => void;
}

interface BoundingBox {
  label: string;
  confidence: number;
  top: number; // percentage
  left: number; // percentage
  width: number; // percentage
  height: number; // percentage
}

export default function CameraCapture({ onScanComplete }: CameraCaptureProps) {
  const { setActivePlateImage } = useApp();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanCompleted, setScanCompleted] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [showSamples, setShowSamples] = useState(false);

  const [detectedItems, setDetectedItems] = useState<Array<{ foodId: string; quantity: number }>>([]);
  const [detectedBoxes, setDetectedBoxes] = useState<BoundingBox[]>([]);

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
      boxes: [
        { label: "Plain Rice (Sada Bhat)", confidence: 94, top: 15, left: 10, width: 45, height: 45 },
        { label: "Masoor Dal (Lentils)", confidence: 88, top: 20, left: 60, width: 30, height: 30 },
        { label: "Shorshe Ilish (Hilsa)", confidence: 91, top: 55, left: 40, width: 40, height: 35 },
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
      boxes: [
        { label: "Plain Rice (Sada Bhat)", confidence: 96, top: 20, left: 15, width: 50, height: 60 },
        { label: "Beef Bhuna", confidence: 89, top: 30, left: 55, width: 35, height: 40 },
      ],
    },
  ];

  const defaultBoxes: BoundingBox[] = [
    { label: "Plain Rice (Sada Bhat)", confidence: 85, top: 25, left: 10, width: 50, height: 50 },
    { label: "Masoor Dal (Lentils)", confidence: 78, top: 15, left: 65, width: 25, height: 30 },
    { label: "Chicken Curry", confidence: 82, top: 50, left: 50, width: 40, height: 40 },
  ];

  const startCamera = async () => {
    setErrorMsg("");
    try {
      if (typeof window !== "undefined" && !window.isSecureContext) {
        throw new Error(
          "Camera access requires a secure context (HTTPS). Please upload a photo instead, or ensure you are visiting via HTTPS."
        );
      }
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          "Camera access is not supported by this browser/device in this context. Please upload a photo instead."
        );
      }
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
      setScanCompleted(false);
    } catch (err: any) {
      setIsCameraActive(false);
      console.error("Camera capture error:", err);
      setErrorMsg(err.message || "Camera access denied. Please allow camera permissions or upload a photo instead.");
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
        runYoloScan(imgData);
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
        runYoloScan(imgData);
      };
      reader.readAsDataURL(file);
    }
  };

  const runYoloScan = async (
    imageBlobOrDataUrl: string | null,
    presetItems: typeof presets[0]["items"] | null = null,
    boxes: BoundingBox[] = []
  ) => {
    setIsScanning(true);
    setScanCompleted(false);
    setErrorMsg("");
    setScanStep("Initializing AI model layers...");

    if (presetItems) {
      // Simulate preset delay
      setTimeout(() => {
        setScanStep("Segmenting plate regions of interest...");
      }, 500);
      setTimeout(() => {
        setScanStep("Running NuLens AI analysis...");
      }, 1000);
      setTimeout(() => {
        setIsScanning(false);
        setScanCompleted(true);
        setDetectedItems(presetItems);
        setDetectedBoxes(boxes);
      }, 1500);
      return;
    }

    if (!imageBlobOrDataUrl) {
      setIsScanning(false);
      return;
    }

    try {
      setScanStep("Uploading plate image for analysis...");
      const stepTimer1 = setTimeout(() => {
        setScanStep("Segmenting plate regions of interest...");
      }, 600);
      const stepTimer2 = setTimeout(() => {
        setScanStep("Running NuLens AI analysis...");
      }, 1200);

      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBlobOrDataUrl }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      if (!response.ok) {
        throw new Error("AI analysis service failed");
      }

      const data = await response.json();
      const detections = data.detections || [];

      // Group duplicate detections into portions
      const itemsMap: Record<string, number> = {};
      detections.forEach((det: any) => {
        itemsMap[det.foodId] = (itemsMap[det.foodId] || 0) + 1;
      });

      const items = Object.entries(itemsMap).map(([foodId, quantity]) => ({
        foodId,
        quantity,
      }));

      setIsScanning(false);
      setScanCompleted(true);
      setDetectedItems(items);
      setDetectedBoxes(detections);
    } catch (err: any) {
      console.error(err);
      setIsScanning(false);
      setErrorMsg("Failed to connect to NuLens AI engine. Please try again or check your connection.");
      setScanCompleted(false);
      setCapturedImage(null);
    }
  };

  const handleConfirmScan = () => {
    setActivePlateImage(capturedImage);
    onScanComplete(detectedItems);
  };

  const handleReset = () => {
    setCapturedImage(null);
    setScanCompleted(false);
    setDetectedItems([]);
    setDetectedBoxes([]);
    setActivePlateImage(null);
    startCamera();
  };

  return (
    <section id="scan" className="animate-fade-up">
      <div className="card-surface overflow-hidden relative bg-black">
        {isScanning && (
          <div className="absolute left-0 right-0 h-0.5 bg-accent z-20 animate-scan-loop" />
        )}

        {isCameraActive && !capturedImage && (
          <div className="relative w-full aspect-[4/3]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center gap-4">
              <button
                onClick={stopCamera}
                className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-colors touch-target"
              >
                Cancel
              </button>
              <button
                onClick={capturePhoto}
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center touch-target active:scale-95 transition-transform"
                aria-label="Capture photo"
              >
                <div className="w-11 h-11 rounded-full border-4 border-stone-300 bg-accent hover:bg-accent-hover" />
              </button>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="relative w-full aspect-[4/3] bg-stone-900 select-none overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={capturedImage}
              alt="Captured meal"
              className="w-full h-full object-contain"
            />

            {/* Bounding Box Visual Overlay */}
            {scanCompleted && (
              <div className="absolute inset-0 pointer-events-none">
                {detectedBoxes.map((box, idx) => (
                  <div
                    key={idx}
                    className="absolute border-2 border-teal-400 bg-teal-400/10 shadow-[0_0_15px_rgba(20,184,166,0.3)] rounded-md animate-fade-up"
                    style={{
                      top: `${box.top}%`,
                      left: `${box.left}%`,
                      width: `${box.width}%`,
                      height: `${box.height}%`,
                      animationDelay: `${idx * 150}ms`,
                    }}
                  >
                    <span className="absolute -top-6 left-[-2px] bg-teal-500 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded shadow-md whitespace-nowrap">
                      {box.label} ({box.confidence}%)
                    </span>
                  </div>
                ))}
              </div>
            )}

            {isScanning && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <Layers className="w-10 h-10 text-accent animate-pulse" />
                <span className="text-sm font-semibold text-white">
                  {scanStep}
                </span>
                <div className="w-32 h-1 bg-stone-700 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-accent animate-loading-bar" />
                </div>
              </div>
            )}
          </div>
        )}

        {!isCameraActive && !capturedImage && (
          <div className="p-6 sm:p-8 bg-surface">
            <div className="flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-accent-soft flex items-center justify-center">
                <Camera className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h2 className="section-title">Scan your plate</h2>
                <p className="section-subtitle mt-1 max-w-xs mx-auto">
                  Take a photo of your meal to see nutritional analysis
                </p>
              </div>

              <div className="flex flex-col w-full gap-2.5 max-w-xs">
                <label className="relative w-full py-3.5 rounded-xl btn-primary text-sm flex items-center justify-center gap-2 cursor-pointer touch-target">
                  <Camera className="w-4 h-4" />
                  Open camera
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    capture="environment"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="Take photo with camera"
                  />
                </label>
                <label className="relative w-full py-3.5 rounded-xl btn-secondary text-sm flex items-center justify-center gap-2 cursor-pointer touch-target">
                  <Upload className="w-4 h-4 text-muted" />
                  Upload photo
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="Upload photo from gallery"
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

      {/* Checklist and Confirmation Actions (Only shows when scan completes) */}
      {scanCompleted && (
        <div className="card-surface p-5 mt-4 bg-surface border border-border animate-fade-up">
          <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-border">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            <h3 className="font-semibold text-sm text-foreground">AI Detection Complete</h3>
          </div>

          <div className="space-y-2 mb-5">
            {detectedItems.length > 0 ? (
              <>
                <p className="text-xs text-muted">The following items were identified on your plate. You can modify portions on the next screen:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {detectedItems.map((item) => {
                    const food = BANGLADESHI_FOOD_DB[item.foodId];
                    if (!food) return null;
                    const matchingBoxes = detectedBoxes.filter(box => box.foodId === item.foodId);
                    const confidence = matchingBoxes.length > 0 
                      ? Math.round(matchingBoxes.reduce((acc, box) => acc + box.confidence, 0) / matchingBoxes.length)
                      : 80;
                    return (
                      <div key={item.foodId} className="flex items-center justify-between p-2.5 rounded-xl bg-surface-muted/60 text-xs">
                        <span className="font-medium text-foreground">{food.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 font-semibold">
                          {item.quantity}x portion ({confidence}% matching)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-500">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">No food items detected</p>
                  <p className="text-muted-foreground mt-0.5">We couldn't recognize any Bangladeshi food in this photo. Please retake or upload a clearer photo containing recognizable dishes.</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={handleConfirmScan}
              disabled={detectedItems.length === 0}
              className="flex-1 py-3 rounded-xl btn-primary text-sm font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-accent/20 disabled:opacity-50 disabled:pointer-events-none"
            >
              Analyze Plate & View Suggestions
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-3 rounded-xl btn-secondary text-sm font-semibold flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4 text-muted" />
              Retake
            </button>
          </div>
        </div>
      )}

      {!isCameraActive && !capturedImage && !isScanning && (
        <div className="mt-3 text-center">
          <button
            onClick={() => setShowSamples(!showSamples)}
            className="text-sm text-muted hover:text-accent font-medium transition-colors"
          >
            {showSamples ? "Hide sample presets" : "Try a sample plate instead"}
          </button>

          {showSamples && (
            <div className="mt-3 flex gap-2 justify-center flex-wrap animate-fade-up">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCapturedImage(preset.image);
                    runYoloScan(null, preset.items, preset.boxes);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-surface text-sm text-foreground hover:bg-surface-muted transition-colors cursor-pointer"
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
