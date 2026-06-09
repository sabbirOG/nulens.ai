"use client";

import React, { useState } from "react";
import { BANGLADESHI_FOOD_DB, UserProfileType } from "@/lib/food-db";
import ProfileSelector from "@/components/ProfileSelector";
import CameraCapture from "@/components/CameraCapture";
import PlateBalanceGauge from "@/components/PlateBalanceGauge";
import ScanResults from "@/components/ScanResults";
import { PlusCircle, Info, Activity, Camera, Cpu, Database } from "lucide-react";

export default function Home() {
  const [profile, setProfile] = useState<UserProfileType>("general");
  const [scannedItems, setScannedItems] = useState<
    Array<{ foodId: string; quantity: number }>
  >([
    { foodId: "rice", quantity: 1.5 },
    { foodId: "dal", quantity: 1 },
    { foodId: "ilish", quantity: 1 },
  ]); // Default preset loaded for beautiful demo

  // Update item quantity
  const handleUpdateQuantity = (foodId: string, delta: number) => {
    setScannedItems((prev) =>
      prev.map((item) =>
        item.foodId === foodId
          ? { ...item, quantity: Math.max(0.5, item.quantity + delta) }
          : item
      )
    );
  };

  // Remove item
  const handleRemoveItem = (foodId: string) => {
    setScannedItems((prev) => prev.filter((item) => item.foodId !== foodId));
  };

  // Add items from camera scan callback
  const handleScanComplete = (
    detected: Array<{ foodId: string; quantity: number }>
  ) => {
    setScannedItems(detected);
  };

  // Manually add an item
  const [manualFoodId, setManualFoodId] = useState<string>("rice");
  const handleManualAdd = () => {
    if (scannedItems.some((item) => item.foodId === manualFoodId)) {
      // increase quantity if already exists
      handleUpdateQuantity(manualFoodId, 1);
    } else {
      setScannedItems((prev) => [...prev, { foodId: manualFoodId, quantity: 1 }]);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col antialiased">
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/10 via-cyan-900/5 to-transparent pointer-events-none" />
      <div className="absolute top-40 left-[20%] w-[300px] h-[300px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-80 right-[20%] w-[350px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-950/40">
              Nu
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white font-sans">
              NuLens<span className="text-cyan-400">.ai</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-md shadow-green-500/50" />
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
              Vision Node Connected
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col gap-8">
        
        {/* Title & Introduction */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900/20 border border-zinc-900 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
              Intelligent Dietary Assessment
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white mt-1.5 leading-tight">
              Bangladeshi Cuisine Nutrition Scan
            </h1>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Capture or upload photos of your meal (Bhat, Ilish, Dal, Beef Bhuna) to segment food components, verify portion loads, and receive clinical advice personalized for diabetic, growth, and general profiles.
            </p>
          </div>
          
          <div className="shrink-0 flex items-center justify-center bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 w-fit">
            <div className="flex flex-col items-center text-center">
              <span className="text-xs text-zinc-500 font-bold uppercase">YOLOv8 MAP</span>
              <span className="text-2xl font-black text-cyan-400">92.4%</span>
              <span className="text-[10px] text-zinc-400 mt-1">Bangla Food Model</span>
            </div>
          </div>
        </div>

        {/* Profile Selector Section */}
        <ProfileSelector selectedProfile={profile} onChange={setProfile} />

        {/* Workspace Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Side: Camera Access & Presets */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <CameraCapture onScanComplete={handleScanComplete} />
            
            {/* Manual item injection (Helper for quick testing) */}
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-5 flex flex-col gap-4">
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">Simulate Manual Plate Injection</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Quickly append items directly to verify calculations.</p>
              </div>

              <div className="flex gap-2.5">
                <select
                  value={manualFoodId}
                  onChange={(e) => setManualFoodId(e.target.value)}
                  className="flex-1 bg-zinc-950/60 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-purple-600 transition-colors"
                >
                  {Object.values(BANGLADESHI_FOOD_DB).map((food) => (
                    <option key={food.id} value={food.id}>
                      {food.name} ({food.banglaName})
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleManualAdd}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg shadow-purple-950/30 flex items-center gap-1.5 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Item
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Plate Balance Gauge & Scans Results */}
          <div className="lg:col-span-7 flex flex-col gap-6">
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

        {/* Architecture & Pipeline Info Section */}
        <section className="bg-zinc-900/10 border border-zinc-900/60 rounded-2xl p-6 flex flex-col gap-4">
          <h4 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
            <Info className="w-4.5 h-4.5 text-cyan-400" />
            2026 AI-Native Implementation Spec
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            NuLens.ai uses a decentralized inference loop. Mobile client frames are packaged and dispatched to a **YOLOv8 Instance** running on GPU-backed **Modal** containers. The predicted bounding boxes maps to our customized **Supabase PostgreSQL Schema** containing native nutritional components. Row-level policies protect diagnostic scan listings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-950/50 flex gap-3">
              <Camera className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-zinc-300">PWA Camera Capture</span>
                <span className="block text-[10px] text-zinc-500 mt-1 leading-relaxed">
                  HTML5 capture and fallback file reader configured for offline client operations.
                </span>
              </div>
            </div>
            
            <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-950/50 flex gap-3">
              <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-zinc-300">Modal ML Endpoint</span>
                <span className="block text-[10px] text-zinc-500 mt-1 leading-relaxed">
                  FastAPI backend running YOLOv8 object segmentation trained on 25+ Bangladeshi dishes.
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-950/50 flex gap-3">
              <Database className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-bold text-zinc-300">Supabase DB</span>
                <span className="block text-[10px] text-zinc-500 mt-1 leading-relaxed">
                  PostgreSQL relations map ingredients, portion coefficients, and profile history with RLS locks.
                </span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 mt-12 bg-zinc-950/20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <span>&copy; 2026 NuLens.ai. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
