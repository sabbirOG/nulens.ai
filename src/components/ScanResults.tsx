"use client";

import React from "react";
import {
  BANGLADESHI_FOOD_DB,
  UserProfileType,
  getHealthFeedback,
} from "@/lib/food-db";
import {
  Plus,
  Minus,
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  Trash2,
  Lightbulb,
} from "lucide-react";

interface ScanResultsProps {
  items: Array<{ foodId: string; quantity: number }>;
  onUpdateQuantity: (foodId: string, delta: number) => void;
  onRemoveItem: (foodId: string) => void;
  profileType: UserProfileType;
}

export default function ScanResults({
  items,
  onUpdateQuantity,
  onRemoveItem,
  profileType,
}: ScanResultsProps) {
  const feedback = getHealthFeedback(items, profileType);

  // Helper for GI coloring
  const getGIBadge = (gi: number) => {
    if (gi === 0) return { label: "N/A", style: "bg-zinc-800 text-zinc-500 border-zinc-700" };
    if (gi < 55) return { label: `Low GI: ${gi}`, style: "bg-green-950/30 text-green-400 border-green-800/40" };
    if (gi < 70) return { label: `Med GI: ${gi}`, style: "bg-yellow-950/30 text-yellow-400 border-yellow-800/40" };
    return { label: `High GI: ${gi}`, style: "bg-pink-950/30 text-pink-400 border-pink-800/40 animate-pulse" };
  };

  const getStatusIcon = (status: typeof feedback.status) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-yellow-400" />;
      case "danger":
        return <AlertOctagon className="w-6 h-6 text-pink-500" />;
    }
  };

  const getStatusBanner = (status: typeof feedback.status) => {
    switch (status) {
      case "excellent":
        return "border-green-800/40 bg-green-950/10 text-green-300";
      case "warning":
        return "border-yellow-800/40 bg-yellow-950/10 text-yellow-300";
      case "danger":
        return "border-pink-800/40 bg-pink-950/10 text-pink-300";
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* 1. Scanned Items List */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5">
        <h3 className="text-base font-bold text-zinc-100 mb-4">Detected Plate Contents</h3>
        
        {items.length === 0 ? (
          <div className="text-center py-8 text-zinc-500 text-sm">
            No items scanned yet. Use the camera tool above to scan your plate.
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {items.map((item) => {
              const food = BANGLADESHI_FOOD_DB[item.foodId];
              if (!food) return null;
              const giBadge = getGIBadge(food.glycemicIndex);

              return (
                <div
                  key={item.foodId}
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-900/20 hover:border-zinc-700/80 transition-colors"
                >
                  <div className="flex flex-col gap-1 overflow-hidden pr-2">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="font-semibold text-sm text-zinc-200 truncate">
                        {food.name}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {food.banglaName}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] text-zinc-400 font-medium">
                        Portion: {food.servingSize}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border font-semibold ${giBadge.style}`}>
                        {giBadge.label}
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Actions Controls */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center bg-zinc-950/60 border border-zinc-800 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.foodId, -0.5)}
                        disabled={item.quantity <= 0.5}
                        className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded disabled:opacity-40"
                        title="Decrease portion"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-zinc-200 px-2.5 w-10 text-center">
                        {item.quantity}x
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.foodId, 0.5)}
                        className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded"
                        title="Increase portion"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.foodId)}
                      className="p-2 text-zinc-500 hover:text-pink-400 hover:bg-pink-950/20 rounded-lg border border-transparent hover:border-pink-900/30 transition-all"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Personalized Health Assessment & Alerts */}
      {items.length > 0 && (
        <div className="flex flex-col gap-4">
          {/* Health Status Banner */}
          <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${getStatusBanner(feedback.status)}`}>
            <div className="shrink-0 mt-0.5">{getStatusIcon(feedback.status)}</div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">Health Status Alert</h4>
              <p className="text-sm mt-1 text-zinc-200 font-medium">{feedback.message}</p>
            </div>
          </div>

          {/* Actionable Dietitians Tips */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-1.5 border-b border-zinc-800/60 pb-2">
              <Lightbulb className="w-4 h-4 text-yellow-400 animate-pulse" />
              Tailored Dietary Insights
            </h4>
            
            {feedback.tips.length === 0 ? (
              <p className="text-xs text-zinc-500">No warnings or suggestions for this plate selection.</p>
            ) : (
              <ul className="flex flex-col gap-2.5 list-disc pl-4 text-xs text-zinc-300">
                {feedback.tips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {tip}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
