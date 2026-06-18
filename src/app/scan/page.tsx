"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CameraCapture from "@/components/CameraCapture";
import { useApp } from "@/context/AppContext";

export default function ScanPage() {
  const { handleScanComplete } = useApp();
  const router = useRouter();

  const handleScan = (detected: Array<{ foodId: string; quantity: number }>) => {
    handleScanComplete(detected);
    router.push("/results");
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight leading-snug">
          Scan your plate
        </h1>
        <p className="text-muted mt-1 text-sm">
          Snap a photo or upload an image of your Bangladeshi meal for instant AI analysis.
        </p>
      </div>

      <CameraCapture onScanComplete={handleScan} />
    </div>
  );
}
