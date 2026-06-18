"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BANGLADESHI_FOOD_DB } from "@/lib/food-db";
import PlateBalanceGauge from "@/components/PlateBalanceGauge";
import ScanResults from "@/components/ScanResults";
import { useApp } from "@/context/AppContext";
import { PlusCircle, Trash2, Camera } from "lucide-react";
import Link from "next/link";

function ResultsContent() {
  const {
    scannedItems,
    profile,
    handleUpdateQuantity,
    handleRemoveItem,
    handleManualAdd,
    clearPlate,
  } = useApp();

  const searchParams = useSearchParams();
  const [manualFoodId, setManualFoodId] = useState<string>("rice");
  const [showManualAdd, setShowManualAdd] = useState(false);

  useEffect(() => {
    if (searchParams.get("manualAdd") === "true") {
      setShowManualAdd(true);
    }
  }, [searchParams]);

  const onManualAddClick = () => {
    handleManualAdd(manualFoodId);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight leading-snug">
            Meal analysis
          </h1>
          <p className="text-muted mt-1 text-sm">
            Tailored insights based on your selected profile.
          </p>
        </div>
        {scannedItems.length > 0 && (
          <button
            onClick={clearPlate}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 flex items-center gap-1.5 transition-colors touch-target shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear plate
          </button>
        )}
      </div>

      {scannedItems.length === 0 ? (
        <div className="card-surface p-10 text-center flex flex-col items-center gap-4 animate-fade-up">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-muted">
            <Camera className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Your plate is empty</h3>
            <p className="text-sm text-muted mt-1 max-w-xs mx-auto">
              Scan a photo of your meal or manually add items to get nutritional suggestions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs mt-2">
            <Link
              href="/scan"
              className="flex-1 py-3.5 rounded-xl btn-primary text-sm flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Scan meal
            </Link>
            <button
              onClick={() => setShowManualAdd(true)}
              className="flex-1 py-3.5 rounded-xl btn-secondary text-sm flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-muted" />
              Add manually
            </button>
          </div>
        </div>
      ) : (
        <>
          <PlateBalanceGauge
            items={scannedItems}
            profileType={profile}
            foodDb={BANGLADESHI_FOOD_DB}
          />

          <ScanResults
            items={scannedItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            profileType={profile}
          />
        </>
      )}

      {/* Manual add card */}
      {showManualAdd && (
        <div id="manual-add" className="card-surface p-5 animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Add food manually</h2>
            {scannedItems.length > 0 && (
              <button
                onClick={() => setShowManualAdd(false)}
                className="text-xs text-muted hover:text-foreground"
              >
                Close
              </button>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={manualFoodId}
              onChange={(e) => setManualFoodId(e.target.value)}
              className="flex-1 bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:outline-none focus:border-accent"
            >
              {Object.values(BANGLADESHI_FOOD_DB).map((food) => (
                <option key={food.id} value={food.id}>
                  {food.name} ({food.banglaName})
                </option>
              ))}
            </select>
            <button
              onClick={onManualAddClick}
              className="px-6 py-3.5 rounded-xl btn-primary text-sm flex items-center justify-center gap-2 touch-target shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              Add item
            </button>
          </div>
        </div>
      )}

      {scannedItems.length > 0 && !showManualAdd && (
        <div className="text-center mt-2">
          <button
            onClick={() => setShowManualAdd(true)}
            className="text-sm font-semibold text-accent hover:underline flex items-center justify-center gap-1.5 mx-auto"
          >
            <PlusCircle className="w-4 h-4" />
            Add another item manually
          </button>
        </div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-muted">Loading results...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
