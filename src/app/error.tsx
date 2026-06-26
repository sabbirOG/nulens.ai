"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("NuLens.ai Global Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-fade-up">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Something went wrong!
      </h2>
      
      <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-8">
        We encountered an unexpected error while processing your request. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="btn-primary px-6 py-3 rounded-xl font-medium flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
