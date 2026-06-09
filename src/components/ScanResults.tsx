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
  UtensilsCrossed,
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

  const getGIBadge = (gi: number) => {
    if (gi === 0)
      return {
        label: "N/A",
        style: "bg-zinc-800 text-zinc-500 border-zinc-700",
      };
    if (gi < 55)
      return {
        label: `Low ${gi}`,
        style: "bg-green-950/40 text-green-400 border-green-800/50",
      };
    if (gi < 70)
      return {
        label: `Med ${gi}`,
        style: "bg-yellow-950/40 text-yellow-400 border-yellow-800/50",
      };
    return {
      label: `High ${gi}`,
      style: "bg-pink-950/40 text-pink-400 border-pink-800/50",
    };
  };

  const getStatusIcon = (status: typeof feedback.status) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />;
      case "warning":
        return (
          <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
        );
      case "danger":
        return (
          <AlertOctagon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
        );
    }
  };

  const getStatusBanner = (status: typeof feedback.status) => {
    switch (status) {
      case "excellent":
        return "border-green-800/50 bg-green-950/20 text-green-300";
      case "warning":
        return "border-yellow-800/50 bg-yellow-950/20 text-yellow-300";
      case "danger":
        return "border-pink-800/50 bg-pink-950/20 text-pink-300";
    }
  };

  return (
    <section className="flex flex-col gap-4 sm:gap-5 animate-fade-up">
      {/* Detected items */}
      <div className="card-surface p-4 sm:p-5">
        <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2 mb-4">
          <UtensilsCrossed className="w-5 h-5 text-purple-400 shrink-0" />
          Detected Items
          {items.length > 0 && (
            <span className="ml-auto text-xs font-semibold bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full">
              {items.length}
            </span>
          )}
        </h2>

        {items.length === 0 ? (
          <div className="text-center py-10 px-4">
            <div className="w-14 h-14 rounded-2xl bg-zinc-800/60 flex items-center justify-center mx-auto mb-3">
              <UtensilsCrossed className="w-7 h-7 text-zinc-600" />
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              No items yet. Scan a plate or try a sample above.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => {
              const food = BANGLADESHI_FOOD_DB[item.foodId];
              if (!food) return null;
              const giBadge = getGIBadge(food.glycemicIndex);

              return (
                <div
                  key={item.foodId}
                  className="p-3.5 sm:p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30"
                >
                  {/* Food info — full width on mobile */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-semibold text-sm sm:text-base text-zinc-100">
                          {food.name}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {food.banglaName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-[11px] text-zinc-500">
                          {food.servingSize}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${giBadge.style}`}
                        >
                          GI {giBadge.label}
                        </span>
                      </div>
                    </div>

                    {/* Controls — row below on mobile, inline on desktop */}
                    <div className="flex items-center justify-between sm:justify-end gap-2 mt-3 sm:mt-0 shrink-0">
                      <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.foodId, -0.5)}
                          disabled={item.quantity <= 0.5}
                          className="p-2.5 text-zinc-400 active:text-zinc-100 active:bg-zinc-800 rounded-lg disabled:opacity-30 touch-target"
                          aria-label="Decrease portion"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold text-zinc-100 px-3 min-w-[3rem] text-center tabular-nums">
                          {item.quantity}x
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.foodId, 0.5)}
                          className="p-2.5 text-zinc-400 active:text-zinc-100 active:bg-zinc-800 rounded-lg touch-target"
                          aria-label="Increase portion"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.foodId)}
                        className="p-3 text-zinc-500 active:text-pink-400 active:bg-pink-950/30 rounded-xl border border-transparent active:border-pink-900/40 transition-all touch-target"
                        aria-label={`Remove ${food.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Health feedback */}
      {items.length > 0 && (
        <div className="flex flex-col gap-3 sm:gap-4">
          <div
            className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3 ${getStatusBanner(feedback.status)}`}
          >
            <div className="shrink-0 mt-0.5">
              {getStatusIcon(feedback.status)}
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-bold uppercase tracking-wider opacity-80">
                Health Assessment
              </h3>
              <p className="text-sm sm:text-base mt-1 text-zinc-100 font-medium leading-relaxed">
                {feedback.message}
              </p>
            </div>
          </div>

          <div className="card-surface p-4 sm:p-5 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              Dietary Insights
            </h3>

            {feedback.tips.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No additional suggestions for this plate.
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {feedback.tips.map((tip, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2.5 text-sm text-zinc-300 leading-relaxed"
                  >
                    <span className="shrink-0 w-5 h-5 rounded-full bg-zinc-800 text-zinc-500 text-[10px] font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
