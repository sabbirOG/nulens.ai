"use client";

import React from "react";
import {
  UserProfileType,
  getHealthFeedback,
  getOptimizedPlate,
} from "@/lib/food-db";
import { useApp } from "@/context/AppContext";
import {
  Plus,
  Minus,
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";

interface PortionChange {
  name: string;
  originalQty: number;
  newQty: number;
  direction: 'reduced' | 'increased' | 'removed';
  reason: string;
}

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
  const { mergedFoodDb, handleOptimizePortions } = useApp();
  const feedback = getHealthFeedback(items, profileType, mergedFoodDb);

  const [showOptimizeModal, setShowOptimizeModal] = React.useState(false);
  const [optimizedItems, setOptimizedItems] = React.useState<Array<{ foodId: string; quantity: number }>>([]);
  const [changes, setChanges] = React.useState<PortionChange[]>([]);

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

  const handleOptimizeClick = () => {
    const optimized = getOptimizedPlate(items, profileType, mergedFoodDb);
    
    // Compare original items vs optimized items
    const listChanges: PortionChange[] = [];
    const optMap = new Map(optimized.map(i => [i.foodId, i.quantity]));
    
    items.forEach(orig => {
      const optQty = optMap.get(orig.foodId) ?? 0;
      if (optQty !== orig.quantity) {
        const food = mergedFoodDb[orig.foodId];
        if (food) {
          let reason = "";
          
          if (optQty < orig.quantity) {
            if (profileType === "diabetic" && food.glycemicIndex >= 70) {
              reason = `Has a high Glycemic Index (${food.glycemicIndex}). Reducing it prevents sudden blood sugar spikes.`;
            } else if (food.category === "staple" || food.category === "sweet") {
              reason = `High-carb food. Reducing portions lowers overall glycemic load.`;
            } else {
              reason = `Helps keep total meal calories balanced.`;
            }
            listChanges.push({
              name: food.name,
              originalQty: orig.quantity,
              newQty: optQty,
              direction: 'reduced',
              reason
            });
          } else if (optQty > orig.quantity) {
            if (food.category === "protein" || orig.foodId === "dal") {
              reason = profileType === "child" 
                ? `Boosts protein intake necessary for healthy growth and bone development.`
                : `Increases protein to support metabolic health and muscle maintenance.`;
            } else {
              reason = `Provides better macronutrient balance.`;
            }
            listChanges.push({
              name: food.name,
              originalQty: orig.quantity,
              newQty: optQty,
              direction: 'increased',
              reason
            });
          }
        }
      }
    });

    setOptimizedItems(optimized);
    setChanges(listChanges);
    setShowOptimizeModal(true);
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
          <div className="min-w-0 flex-1">
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
            {feedback.status !== "excellent" && (
              <button
                onClick={handleOptimizeClick}
                className="mt-3.5 px-3.5 py-2 rounded-xl bg-white border border-border text-xs font-bold text-accent hover:bg-stone-50 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 duration-100"
              >
                ✨ Optimize Portions to Fit Goals
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Food items */}
      <div className="card-surface p-4 sm:p-5">
        <h2 className="section-title mb-4">
          Your plate ({items.length} {items.length === 1 ? "item" : "items"})
        </h2>

        <div className="flex flex-col gap-2">
          {items.map((item) => {
            const food = mergedFoodDb[item.foodId];
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
                      className="p-2 text-muted active:text-foreground disabled:opacity-30 touch-target cursor-pointer"
                      aria-label="Decrease portion"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold px-2 min-w-[2rem] text-center tabular-nums">
                      {item.quantity}x
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.foodId, 0.5)}
                      className="p-2 text-muted active:text-foreground touch-target cursor-pointer"
                      aria-label="Increase portion"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.foodId)}
                    className="p-2 text-muted hover:text-red-600 active:text-red-700 touch-target cursor-pointer"
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

      {/* Portions Swap Modal */}
      {showOptimizeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface border border-border w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-zoom-in max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between bg-surface-muted/30">
              <div>
                <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                  ✨ NuLens AI Portions Swap
                </h3>
                <p className="text-xs text-muted mt-1">
                  Optimized for your <span className="font-semibold text-accent capitalize">{profileType}</span> profile targets.
                </p>
              </div>
            </div>
            
            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* Side-by-Side Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before Card */}
                <div className="p-4 rounded-xl border border-border bg-surface-muted/20">
                  <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    Original Plate
                  </h4>
                  <div className="space-y-2">
                    {items.map(i => {
                      const food = mergedFoodDb[i.foodId];
                      if (!food) return null;
                      return (
                        <div key={i.foodId} className="flex justify-between items-center text-xs p-2 rounded-lg bg-surface border border-border/40">
                          <span className="text-foreground font-medium">{food.name}</span>
                          <span className="text-muted tabular-nums font-semibold">{i.quantity}x portion</span>
                        </div>
                      );
                    })}
                  </div>
                  {/* Macro Summary */}
                  <div className="mt-4 pt-3 border-t border-border/65 grid grid-cols-2 gap-2 text-center text-[11px] text-muted">
                    <div>
                      <p>Calories</p>
                      <p className="font-bold text-foreground text-xs mt-0.5">
                        {Math.round(items.reduce((acc, i) => acc + (mergedFoodDb[i.foodId]?.calories ?? 0) * i.quantity, 0))} kcal
                      </p>
                    </div>
                    <div>
                      <p>Carbs</p>
                      <p className="font-bold text-foreground text-xs mt-0.5">
                        {Math.round(items.reduce((acc, i) => acc + (mergedFoodDb[i.foodId]?.carbs ?? 0) * i.quantity, 0))}g
                      </p>
                    </div>
                  </div>
                </div>

                {/* After Card */}
                <div className="p-4 rounded-xl border border-teal-500/20 bg-teal-500/5">
                  <h4 className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    NuLens AI Swap
                  </h4>
                  <div className="space-y-2">
                    {optimizedItems.map(i => {
                      const food = mergedFoodDb[i.foodId];
                      if (!food) return null;
                      const origItem = items.find(o => o.foodId === i.foodId);
                      const isChanged = origItem ? origItem.quantity !== i.quantity : true;
                      
                      return (
                        <div 
                          key={i.foodId} 
                          className={`flex justify-between items-center text-xs p-2 rounded-lg ${
                            isChanged ? 'bg-teal-50 border border-teal-200 text-teal-900 font-semibold' : 'bg-surface border border-border/40 text-foreground'
                          }`}
                        >
                          <span>{food.name}</span>
                          <span className="tabular-nums">
                            {isChanged && origItem ? (
                              <span className="flex items-center gap-1 text-[11px]">
                                <span className="line-through text-muted/80 font-normal">{origItem.quantity}x</span>
                                <span>→ {i.quantity}x</span>
                              </span>
                            ) : (
                              <span>{i.quantity}x portion</span>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {/* Macro Summary */}
                  <div className="mt-4 pt-3 border-t border-border/65 grid grid-cols-2 gap-2 text-center text-[11px] text-muted">
                    <div>
                      <p>Calories</p>
                      <p className="font-bold text-teal-700 text-xs mt-0.5">
                        {Math.round(optimizedItems.reduce((acc, i) => acc + (mergedFoodDb[i.foodId]?.calories ?? 0) * i.quantity, 0))} kcal
                      </p>
                    </div>
                    <div>
                      <p>Carbs</p>
                      <p className="font-bold text-teal-700 text-xs mt-0.5">
                        {Math.round(optimizedItems.reduce((acc, i) => acc + (mergedFoodDb[i.foodId]?.carbs ?? 0) * i.quantity, 0))}g
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Change Reasons Checklist */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  AI Portions Recommendations
                </h4>
                <div className="space-y-2">
                  {changes.map((c, idx) => (
                    <div key={idx} className="flex gap-2.5 p-3 rounded-xl border border-border bg-surface text-xs leading-relaxed">
                      <span className="mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 font-bold">
                        {c.direction === 'reduced' ? '↓' : '↑'}
                      </span>
                      <div>
                        <p className="font-bold text-foreground">
                          {c.direction === 'reduced' ? 'Reduced' : 'Increased'} {c.name} ({c.originalQty}x → {c.newQty}x)
                        </p>
                        <p className="text-muted mt-0.5 text-xs font-normal">
                          {c.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-border bg-surface-muted/30 flex gap-3">
              <button
                onClick={() => setShowOptimizeModal(false)}
                className="flex-1 py-3 rounded-xl btn-secondary text-sm font-semibold transition-all cursor-pointer active:scale-95 duration-100"
              >
                Keep My Original Plate
              </button>
              <button
                onClick={() => {
                  handleOptimizePortions(optimizedItems);
                  setShowOptimizeModal(false);
                }}
                className="flex-1 py-3 rounded-xl btn-primary text-sm font-semibold shadow-sm shadow-accent/20 transition-all cursor-pointer active:scale-95 duration-100"
              >
                Accept Healthy Swaps
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
