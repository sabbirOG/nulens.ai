"use client";

import { WifiOff } from "lucide-react";

export default function OfflineFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <div className="p-6 rounded-full bg-secondary/30 mb-8">
        <WifiOff className="w-12 h-12 text-muted-foreground" />
      </div>
      
      <h1 className="text-3xl font-semibold tracking-tight mb-3">
        You&apos;re Offline
      </h1>
      
      <p className="text-muted-foreground max-w-sm mx-auto mb-8">
        NuLens.ai needs an internet connection to perform live AI meal scanning. 
        However, your previously cached daily tracker data remains accessible.
      </p>
      
      <button 
        onClick={() => window.location.reload()}
        className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 active:scale-95 transition-all"
      >
        Try Again
      </button>
    </div>
  );
}
