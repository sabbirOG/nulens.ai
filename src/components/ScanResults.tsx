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
    if (gi === 0) return { label: "N/A", style: "bg-stone-100 text-stone-500" };
    if (gi < 55) return { label: `Low ${gi}`, style: "bg-emerald-50 text-emerald-700" };
    if (gi < 70) return { label: `Med ${gi}`, style: "bg-amber-50 text-amber-700" };
    return { label: `High ${gi}`, style: "bg-red-50 text-red-700" };
  };

  const getStatusStyles = (status: typeof feedback.status) => {
    switch (status) {
      case "excellent":
        return {
          banner: "bg-emerald-50 border-emerald-100 text-emerald-800",
          icon: <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />,
        };
      case "warning":
        return {
          banner: "bg-amber-50 border-amber-100 text-amber-800",
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
        };
      case "danger":
        return {
          banner: "bg-red-50 border-red-100 text-red-800",
          icon: <AlertOctagon className="w-5 h-5 text-red-600 shrink-0" />,
        };
    }
  };

  if (items.length === 0) {
    return (
      <section id="results" className="animate-fade-up">
        <div className="card-surface p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-surface-muted flex items-center justify-center mx-auto mb-3">
            <UtensilsCrossed className="w-6 h-6 text-muted" />
          </div>
          <p className="text-sm text-muted">
            Your meal results will appear here after scanning
          </p>
        </div>
      </section>
    );
  }

  const status = getStatusStyles(feedback.status);

  return (
    <section id="results" className="flex flex-col gap-4 animate-fade-up">
      {/* Health insight — single combined card */}
      <div className={`p-4 rounded-xl border ${status.banner}`}>
        <div className="flex gap-3">
          {status.icon}
          <div className="min-w-0">
            <p className="text-sm font-medium leading-relaxed">
              {feedback.message}
            </p>
            {feedback.tips.length > 0 && (
              <ul className="mt-2 space-y-1">
                {feedback.tips.slice(0, 2).map((tip, idx) => (
                  <li key={idx} className="text-xs opacity-90 leading-relaxed">
                    • {tip}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Food items */}
      <div className="card-surface p-4 sm:p-5">
        <h2 className="section-title mb-4">
          Your plate ({items.length} items)
        </h2>

        <div className="flex flex-col gap-2">
          {items.map((item) => {
            const food = BANGLADESHI_FOOD_DB[item.foodId];
            if (!food) return null;
            const giBadge = getGIBadge(food.glycemicIndex);

            return (
              <div
                key={item.foodId}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-muted/60"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm text-foreground truncate">
                    {food.name}
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    {food.banglaName}
                    <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-medium ${giBadge.style}`}>
                      GI {giBadge.label}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <div className="flex items-center bg-surface border border-border rounded-lg">
                    <button
                      onClick={() => onUpdateQuantity(item.foodId, -0.5)}
                      disabled={item.quantity <= 0.5}
                      className="p-2 text-muted active:text-foreground disabled:opacity-30 touch-target"
                      aria-label="Decrease portion"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold px-2 min-w-[2rem] text-center tabular-nums">
                      {item.quantity}x
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.foodId, 0.5)}
                      className="p-2 text-muted active:text-foreground touch-target"
                      aria-label="Increase portion"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.foodId)}
                    className="p-2 text-muted active:text-red-600 touch-target"
                    aria-label={`Remove ${food.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
