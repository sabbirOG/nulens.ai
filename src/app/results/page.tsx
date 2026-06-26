"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
    mergedFoodDb,
    handleLogMeal,
    handleCreateCustomFood,
  } = useApp();

  const searchParams = useSearchParams();
  const router = useRouter();
  const [manualFoodId, setManualFoodId] = useState<string>("rice");
  const [showManualAdd, setShowManualAdd] = useState(false);
  const [showCustomFoodForm, setShowCustomFoodForm] = useState(false);
  const [logSuccessMessage, setLogSuccessMessage] = useState("");

  // Custom Food Form states
  const [cfName, setCfName] = useState("");
  const [cfBangla, setCfBangla] = useState("");
  const [cfCategory, setCfCategory] = useState<"staple" | "protein" | "vegetable" | "snack" | "sweet">("staple");
  const [cfCalories, setCfCalories] = useState(150);
  const [cfCarbs, setCfCarbs] = useState(25);
  const [cfProtein, setCfProtein] = useState(5);
  const [cfFat, setCfFat] = useState(3);
  const [cfServing, setCfServing] = useState("1 serving (150g)");
  const [cfGI, setCfGI] = useState(55);

  useEffect(() => {
    if (searchParams.get("manualAdd") === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowManualAdd(true);
    }
  }, [searchParams]);

  // Handle setting active selection when database changes
  useEffect(() => {
    const keys = Object.keys(mergedFoodDb);
    if (keys.length > 0 && !keys.includes(manualFoodId)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setManualFoodId(keys[0]);
    }
  }, [mergedFoodDb, manualFoodId]);

  const onManualAddClick = () => {
    handleManualAdd(manualFoodId);
  };

  const onLogMealClick = (type: "breakfast" | "lunch" | "dinner" | "snack") => {
    handleLogMeal(type);
    setLogSuccessMessage(`Successfully logged plate to ${type.charAt(0).toUpperCase() + type.slice(1)}!`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setLogSuccessMessage("");
      router.push("/"); // redirect to home dashboard
    }, 1500);
  };

  const handleCreateCustomFoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cfName || !cfBangla) return;

    const uniqueId = `custom_${Date.now()}`;
    const newFoodItem = {
      id: uniqueId,
      name: cfName,
      banglaName: cfBangla,
      calories: cfCalories,
      carbs: cfCarbs,
      protein: cfProtein,
      fat: cfFat,
      servingSize: cfServing,
      glycemicIndex: cfGI,
      category: cfCategory,
      description: "User created custom food item.",
    };

    handleCreateCustomFood(newFoodItem);
    handleManualAdd(uniqueId);

    // Reset Form
    setCfName("");
    setCfBangla("");
    setCfCategory("staple");
    setCfCalories(150);
    setCfCarbs(25);
    setCfProtein(5);
    setCfFat(3);
    setCfServing("1 serving (150g)");
    setCfGI(55);
    setShowCustomFoodForm(false);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      {logSuccessMessage && (
        <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-800 flex items-center justify-center gap-2 animate-fade-up font-medium text-sm">
          <span>✅</span>
          <span>{logSuccessMessage}</span>
        </div>
      )}

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
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 flex items-center gap-1.5 transition-colors touch-target shrink-0 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear plate
          </button>
        )}
      </div>

      {scannedItems.length === 0 ? (
        <div className="card-surface p-10 text-center flex flex-col items-center gap-4 animate-fade-up bg-surface">
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
              className="flex-1 py-3.5 rounded-xl btn-secondary text-sm flex items-center justify-center gap-2 cursor-pointer"
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
            foodDb={mergedFoodDb}
          />

          <ScanResults
            items={scannedItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            profileType={profile}
          />

          {/* Daily Meal Logger */}
          <div className="card-surface p-5 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 border border-teal-500/10">
            <h2 className="section-title mb-1.5">Log to Daily Tracker</h2>
            <p className="text-xs text-muted mb-4">
              Add this plate&apos;s total macros and calories to your daily intake history.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => onLogMealClick("breakfast")}
                className="py-3 rounded-xl bg-surface border border-border hover:bg-surface-muted text-xs font-semibold text-foreground flex flex-col items-center gap-1.5 shadow-sm cursor-pointer transition-colors active:scale-95 duration-100"
              >
                <span className="text-xl">🍳</span>
                <span>Breakfast</span>
              </button>
              <button
                onClick={() => onLogMealClick("lunch")}
                className="py-3 rounded-xl bg-surface border border-border hover:bg-surface-muted text-xs font-semibold text-foreground flex flex-col items-center gap-1.5 shadow-sm cursor-pointer transition-colors active:scale-95 duration-100"
              >
                <span className="text-xl">🍲</span>
                <span>Lunch</span>
              </button>
              <button
                onClick={() => onLogMealClick("dinner")}
                className="py-3 rounded-xl bg-surface border border-border hover:bg-surface-muted text-xs font-semibold text-foreground flex flex-col items-center gap-1.5 shadow-sm cursor-pointer transition-colors active:scale-95 duration-100"
              >
                <span className="text-xl">🍛</span>
                <span>Dinner</span>
              </button>
              <button
                onClick={() => onLogMealClick("snack")}
                className="py-3 rounded-xl bg-surface border border-border hover:bg-surface-muted text-xs font-semibold text-foreground flex flex-col items-center gap-1.5 shadow-sm cursor-pointer transition-colors active:scale-95 duration-100"
              >
                <span className="text-xl">☕</span>
                <span>Snack</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Manual add card */}
      {showManualAdd && (
        <div id="manual-add" className="card-surface p-5 animate-fade-up bg-surface">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Add food manually</h2>
            {scannedItems.length > 0 && (
              <button
                onClick={() => {
                  setShowManualAdd(false);
                  setShowCustomFoodForm(false);
                }}
                className="text-xs text-muted hover:text-foreground cursor-pointer"
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
              {Object.values(mergedFoodDb).map((food) => (
                <option key={food.id} value={food.id}>
                  {food.name} ({food.banglaName})
                </option>
              ))}
            </select>
            <button
              onClick={onManualAddClick}
              className="px-6 py-3.5 rounded-xl btn-primary text-sm flex items-center justify-center gap-2 touch-target shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Add item
            </button>
          </div>

          <div className="mt-3.5 text-left">
            <button
              type="button"
              onClick={() => setShowCustomFoodForm(!showCustomFoodForm)}
              className="text-xs font-semibold text-accent hover:underline cursor-pointer"
            >
              {showCustomFoodForm ? "Close Custom Creator" : "Can't find your food? Create custom item"}
            </button>
          </div>

          {showCustomFoodForm && (
            <form
              onSubmit={handleCreateCustomFoodSubmit}
              className="mt-4 pt-4 border-t border-border flex flex-col gap-4 animate-fade-up"
            >
              <h3 className="text-xs font-bold text-foreground">Create Custom Food Item</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">English Name</label>
                  <input
                    type="text"
                    required
                    value={cfName}
                    onChange={(e) => setCfName(e.target.value)}
                    placeholder="e.g. Begun Bhorta"
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">Bangla Name</label>
                  <input
                    type="text"
                    required
                    value={cfBangla}
                    onChange={(e) => setCfBangla(e.target.value)}
                    placeholder="e.g. বেগুন ভর্তা"
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">Category</label>
                  <select
                    value={cfCategory}
                    onChange={(e) => setCfCategory(e.target.value as "staple" | "protein" | "vegetable" | "snack" | "sweet")}
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent"
                  >
                    <option value="staple">Staple</option>
                    <option value="protein">Protein</option>
                    <option value="vegetable">Vegetable/Dal</option>
                    <option value="snack">Snack</option>
                    <option value="sweet">Sweet</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">Serving Size</label>
                  <input
                    type="text"
                    required
                    value={cfServing}
                    onChange={(e) => setCfServing(e.target.value)}
                    placeholder="e.g. 1 serving (150g)"
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">Glycemic Index (GI)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={cfGI}
                    onChange={(e) => setCfGI(Number(e.target.value))}
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={cfCalories}
                    onChange={(e) => setCfCalories(Number(e.target.value))}
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={cfCarbs}
                    onChange={(e) => setCfCarbs(Number(e.target.value))}
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">Protein (g)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={cfProtein}
                    onChange={(e) => setCfProtein(Number(e.target.value))}
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">Fat (g)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={cfFat}
                    onChange={(e) => setCfFat(Number(e.target.value))}
                    className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomFoodForm(false)}
                  className="px-3.5 py-2 rounded-xl border border-border text-xs text-muted hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs cursor-pointer"
                >
                  Save and Add to Plate
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {scannedItems.length > 0 && !showManualAdd && (
        <div className="text-center mt-2">
          <button
            onClick={() => setShowManualAdd(true)}
            className="text-sm font-semibold text-accent hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
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
