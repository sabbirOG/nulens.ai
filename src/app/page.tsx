"use client";

import React, { useState } from "react";
import { BANGLADESHI_FOOD_DB, UserProfileType } from "@/lib/food-db";
import { ALL_SECTION_IDS } from "@/lib/nav";
import { useActiveSection, scrollToSection } from "@/hooks/useActiveSection";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import MobileDrawer from "@/components/MobileDrawer";
import ProfileSelector from "@/components/ProfileSelector";
import CameraCapture from "@/components/CameraCapture";
import PlateBalanceGauge from "@/components/PlateBalanceGauge";
import ScanResults from "@/components/ScanResults";
import {
  PlusCircle,
  ChevronDown,
  Camera,
  Cpu,
  Database,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const [profile, setProfile] = useState<UserProfileType>("general");
  const [scannedItems, setScannedItems] = useState<
    Array<{ foodId: string; quantity: number }>
  >([
    { foodId: "rice", quantity: 1.5 },
    { foodId: "dal", quantity: 1 },
    { foodId: "ilish", quantity: 1 },
  ]);
  const [manualFoodId, setManualFoodId] = useState<string>("rice");
  const [showManualAdd, setShowManualAdd] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeSection = useActiveSection(ALL_SECTION_IDS);

  const handleUpdateQuantity = (foodId: string, delta: number) => {
    setScannedItems((prev) =>
      prev.map((item) =>
        item.foodId === foodId
          ? { ...item, quantity: Math.max(0.5, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (foodId: string) => {
    setScannedItems((prev) => prev.filter((item) => item.foodId !== foodId));
  };

  const handleScanComplete = (
    detected: Array<{ foodId: string; quantity: number }>
  ) => {
    setScannedItems(detected);
    scrollToSection("results");
  };

  const handleManualAdd = () => {
    if (scannedItems.some((item) => item.foodId === manualFoodId)) {
      handleUpdateQuantity(manualFoodId, 1);
    } else {
      setScannedItems((prev) => [
        ...prev,
        { foodId: manualFoodId, quantity: 1 },
      ]);
    }
  };

  const openManualAdd = () => {
    setShowManualAdd(true);
    scrollToSection("manual-add");
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/8 blur-[100px] rounded-full" />
        <div className="absolute top-1/3 -left-32 w-[300px] h-[300px] bg-cyan-600/5 blur-[80px] rounded-full" />
      </div>

      <AppHeader
        onMenuOpen={() => setDrawerOpen(true)}
        activeSection={activeSection}
      />

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onManualAdd={openManualAdd}
        activeSection={activeSection}
      />

      <main className="flex-1 safe-px max-w-6xl w-full mx-auto px-4 py-5 sm:py-8 flex flex-col gap-6 sm:gap-8 has-bottom-nav lg:pb-8">
        {/* Hero */}
        <section
          id="home"
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-5 sm:p-8 animate-fade-up"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-950/40 border border-purple-800/40 rounded-full px-3 py-1 mb-3">
                <Sparkles className="w-3 h-3" />
                AI Nutrition Lens
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-white leading-tight">
                Scan Bangladeshi meals, get instant health insights
              </h1>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed hidden sm:block">
                Capture Bhat, Ilish, Dal, Beef Bhuna and more. Get portion
                analysis and personalized advice for diabetic, child, and
                general profiles.
              </p>
            </div>

            <div className="flex gap-3 sm:gap-4 shrink-0">
              <div className="flex-1 sm:flex-none text-center bg-zinc-950/60 border border-zinc-800 rounded-2xl px-4 py-3 sm:px-5 sm:py-4">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block">
                  Accuracy
                </span>
                <span className="text-xl sm:text-2xl font-black text-cyan-400 block mt-0.5">
                  92.4%
                </span>
                <span className="text-[10px] text-zinc-500">YOLOv8</span>
              </div>
              <div className="flex-1 sm:flex-none text-center bg-zinc-950/60 border border-zinc-800 rounded-2xl px-4 py-3 sm:px-5 sm:py-4">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block">
                  Foods
                </span>
                <span className="text-xl sm:text-2xl font-black text-purple-400 block mt-0.5">
                  25+
                </span>
                <span className="text-[10px] text-zinc-500">Dishes</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => scrollToSection("scan")}
            className="sm:hidden w-full mt-5 py-3.5 rounded-xl bg-purple-600 active:bg-purple-500 text-white font-semibold text-sm flex items-center justify-center gap-2 touch-target active:scale-[0.98] transition-all"
          >
            <Camera className="w-4 h-4" />
            Scan a Plate Now
          </button>
        </section>

        {/* Profile */}
        <div id="profile">
          <ProfileSelector selectedProfile={profile} onChange={setProfile} />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6 order-1">
            <CameraCapture onScanComplete={handleScanComplete} />

            <div id="manual-add" className="card-surface overflow-hidden">
              <button
                onClick={() => setShowManualAdd(!showManualAdd)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left touch-target"
                aria-expanded={showManualAdd}
              >
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">
                    Add Item Manually
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Quick-add for testing
                  </p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-500 transition-transform duration-200 ${showManualAdd ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`grid transition-all duration-200 ${showManualAdd ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 flex flex-col gap-3 border-t border-zinc-800/60 pt-4">
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <select
                        value={manualFoodId}
                        onChange={(e) => setManualFoodId(e.target.value)}
                        className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-zinc-300 focus:outline-none focus:border-purple-600 transition-colors"
                      >
                        {Object.values(BANGLADESHI_FOOD_DB).map((food) => (
                          <option key={food.id} value={food.id}>
                            {food.name} ({food.banglaName})
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={handleManualAdd}
                        className="px-5 py-3.5 rounded-xl bg-purple-600 active:bg-purple-500 text-sm font-semibold text-white flex items-center justify-center gap-2 touch-target active:scale-[0.98] transition-all shrink-0"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="results"
            className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 order-2"
          >
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
          </div>
        </div>

        <details id="about" className="card-surface group animate-fade-up">
          <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none touch-target [&::-webkit-details-marker]:hidden">
            <div>
              <h2 className="text-sm font-bold text-zinc-300">
                How NuLens Works
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                AI pipeline &amp; data architecture
              </p>
            </div>
            <ChevronDown className="w-5 h-5 text-zinc-500 transition-transform group-open:rotate-180" />
          </summary>

          <div className="px-4 pb-4 sm:px-5 sm:pb-5 border-t border-zinc-800/60 pt-4">
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
              Mobile frames are sent to a YOLOv8 instance on GPU-backed Modal
              containers. Predictions map to a Supabase PostgreSQL nutrition
              database with row-level security.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/40 flex gap-3">
                <Camera className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-zinc-300">
                    PWA Camera
                  </span>
                  <span className="block text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    HTML5 capture with offline-ready client operations.
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/40 flex gap-3">
                <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-zinc-300">
                    Modal ML
                  </span>
                  <span className="block text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    FastAPI + YOLOv8 trained on 25+ Bangladeshi dishes.
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/40 flex gap-3">
                <Database className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-zinc-300">
                    Supabase DB
                  </span>
                  <span className="block text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    Nutrition data, portions, and profile history with RLS.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </details>
      </main>

      <footer className="hidden sm:block border-t border-zinc-800/60 py-5 sm:py-6 safe-pb lg:pb-6">
        <div className="safe-px max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <span>&copy; 2026 NuLens.ai</span>
          <div className="flex gap-5">
            <a href="#" className="active:text-zinc-300 transition-colors py-2">
              Privacy
            </a>
            <a href="#" className="active:text-zinc-300 transition-colors py-2">
              Terms
            </a>
          </div>
        </div>
      </footer>

      <BottomNav activeSection={activeSection} />
    </div>
  );
}
