"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { BANGLADESHI_FOOD_DB, PROFILE_RECOMMENDATIONS } from "@/lib/food-db";
import { Camera, Activity, UtensilsCrossed, PlusCircle, ArrowRight, Heart, ShieldAlert, Baby } from "lucide-react";

export default function Home() {
  const { profile, scannedItems } = useApp();

  const rules = PROFILE_RECOMMENDATIONS[profile];

  let totalCalories = 0;
  scannedItems.forEach((item) => {
    const food = BANGLADESHI_FOOD_DB[item.foodId];
    if (food) {
      totalCalories += food.calories * item.quantity;
    }
  });

  const getProfileIcon = () => {
    switch (profile) {
      case "diabetic":
        return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      case "child":
        return <Baby className="w-5 h-5 text-teal-600" />;
      default:
        return <Heart className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getProfileDesc = () => {
    switch (profile) {
      case "diabetic":
        return "Tailored to control glycemic load and carb limits.";
      case "child":
        return "Focused on protein sufficiency and growth.";
      default:
        return "General nutritional advice and balance.";
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-up">
      {/* Welcome Hero */}
      <section className="bg-gradient-to-br from-accent/10 to-teal-500/5 p-6 sm:p-8 rounded-2xl border border-accent/10">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-snug">
          Know what&apos;s on your plate
        </h1>
        <p className="text-muted mt-2 text-sm sm:text-base max-w-xl">
          NuLens.ai uses smart computer vision to analyze Bangladeshi meals and provide nutrition advice aligned with your health needs.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/scan"
            className="px-5 py-3 rounded-xl btn-primary text-sm flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            Scan a meal
          </Link>
          <Link
            href="/profile"
            className="px-5 py-3 rounded-xl btn-secondary text-sm flex items-center gap-2"
          >
            Configure profile
          </Link>
        </div>
      </section>

      {/* Grid Menu / Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Profile Card */}
        <Link
          href="/profile"
          className="card-surface p-5 hover:border-accent/30 transition-all flex flex-col justify-between gap-6 group"
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-stone-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Health profile</h3>
                <p className="text-xs text-muted mt-0.5">Change recommendation rules</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-muted/60">
            <div className="mt-0.5">{getProfileIcon()}</div>
            <div>
              <span className="text-xs font-semibold text-foreground capitalize">
                {profile} profile
              </span>
              <p className="text-[11px] text-muted mt-0.5 leading-normal">
                {getProfileDesc()}
              </p>
            </div>
          </div>
        </Link>

        {/* Plate Card */}
        <Link
          href="/results"
          className="card-surface p-5 hover:border-accent/30 transition-all flex flex-col justify-between gap-6 group"
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-stone-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Current plate</h3>
                <p className="text-xs text-muted mt-0.5">Nutrition summary & items</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-muted/60">
            <div>
              <span className="text-xs font-semibold text-foreground">
                {scannedItems.length} {scannedItems.length === 1 ? "item" : "items"}
              </span>
              <p className="text-[11px] text-muted mt-0.5">
                {scannedItems.length > 0 ? "Analyzed Bangladeshi food" : "No items scanned yet"}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-accent">
                {Math.round(totalCalories)}
              </span>
              <span className="text-[10px] text-muted ml-0.5">/ {rules.calorieTarget} kcal</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Manual Quick Add Card */}
      <div className="card-surface p-5 flex items-center justify-between gap-4">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
            <PlusCircle className="w-5 h-5 text-stone-600" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">Quick add item</h3>
            <p className="text-xs text-muted mt-0.5">Manually construct your plate</p>
          </div>
        </div>
        <Link
          href="/results?manualAdd=true"
          className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-surface-muted transition-colors shrink-0"
        >
          Add manually
        </Link>
      </div>
    </div>
  );
}
