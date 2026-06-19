"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PROFILE_RECOMMENDATIONS } from "@/lib/food-db";
import {
  Camera,
  Activity,
  UtensilsCrossed,
  PlusCircle,
  ArrowRight,
  Heart,
  ShieldAlert,
  Baby,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Trash2,
  Flame,
  Wheat,
  Shield,
  Droplets,
} from "lucide-react";

export default function Home() {
  const todayStr = new Date().toLocaleDateString("en-CA");
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const {
    profile,
    loggedMeals,
    handleDeleteLoggedMeal,
    mergedFoodDb,
    scannedItems,
  } = useApp();

  const rules = PROFILE_RECOMMENDATIONS[profile];

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

  const formatDateLabel = (dateStr: string) => {
    if (dateStr === todayStr) return "Today";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const changeDate = (days: number) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + days);
    setSelectedDate(date.toLocaleDateString("en-CA"));
  };

  // Filter logged meals for selected date
  const dayMeals = loggedMeals.filter((m) => m.date === selectedDate);

  // Calculate day totals
  let dayCal = 0;
  let dayCarb = 0;
  let dayProtein = 0;
  let dayFat = 0;

  dayMeals.forEach((meal) => {
    meal.items.forEach((item) => {
      const food = mergedFoodDb[item.foodId];
      if (food) {
        dayCal += food.calories * item.quantity;
        dayCarb += food.carbs * item.quantity;
        dayProtein += food.protein * item.quantity;
        dayFat += food.fat * item.quantity;
      }
    });
  });

  const calPercent = Math.min((dayCal / rules.calorieTarget) * 100, 100);
  const carbPercent = Math.min((dayCarb / rules.carbLimit) * 100, 100);
  const proteinPercent = Math.min((dayProtein / rules.proteinTarget) * 100, 100);
  const fatPercent = Math.min((dayFat / rules.fatLimit) * 100, 100);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (calPercent / 100) * circumference;

  const getMealEmoji = (type: string) => {
    switch (type) {
      case "breakfast":
        return "🍳";
      case "lunch":
        return "🍲";
      case "dinner":
        return "🍛";
      default:
        return "☕";
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      {/* Welcome Hero */}
      <section className="bg-gradient-to-br from-accent/10 to-teal-500/5 p-6 rounded-2xl border border-accent/10">
        <h1 className="text-2xl font-bold text-foreground tracking-tight leading-snug">
          Know what&apos;s on your plate
        </h1>
        <p className="text-muted mt-1.5 text-sm">
          NuLens.ai uses smart computer vision to analyze Bangladeshi meals and provide nutrition advice aligned with your health needs.
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <Link
            href="/scan"
            className="px-4 py-2.5 rounded-xl btn-primary text-xs font-semibold flex items-center gap-2 shadow-sm shadow-accent/20"
          >
            <Camera className="w-4 h-4" />
            Scan a meal
          </Link>
          <Link
            href="/profile"
            className="px-4 py-2.5 rounded-xl btn-secondary text-xs font-semibold flex items-center gap-2"
          >
            Configure profile
          </Link>
        </div>
      </section>

      {/* Date Selector Navigation */}
      <div className="flex items-center justify-between p-3 card-surface bg-surface">
        <button
          onClick={() => changeDate(-1)}
          className="p-2 rounded-lg hover:bg-surface-muted text-muted active:text-foreground touch-target cursor-pointer transition-colors"
          aria-label="Previous day"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 font-bold text-foreground text-sm">
          <Calendar className="w-4 h-4 text-accent" />
          <span>{formatDateLabel(selectedDate)}</span>
        </div>
        <button
          onClick={() => changeDate(1)}
          className="p-2 rounded-lg hover:bg-surface-muted text-muted active:text-foreground touch-target cursor-pointer transition-colors"
          aria-label="Next day"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Daily Consumption Summary Dashboard */}
      <div className="card-surface p-5 bg-surface flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-28 h-28 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-stone-100"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-teal-500 transition-all duration-700 ease-out"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Flame className="w-4 h-4 text-teal-600 mb-0.5" />
            <span className="text-xl font-bold text-foreground leading-none">
              {Math.round(dayCal)}
            </span>
            <span className="text-[10px] text-muted mt-0.5">/ {rules.calorieTarget} kcal</span>
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col gap-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted flex items-center gap-1">
                <Wheat className="w-3.5 h-3.5" />
                Carbs
              </span>
              <span className="text-foreground font-medium tabular-nums">
                {Math.round(dayCarb)}g / {rules.carbLimit}g
              </span>
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${carbPercent}%` }}
                className={`h-full rounded-full transition-all duration-700 ${
                  carbPercent > 85 ? "bg-amber-500" : "bg-teal-500"
                }`}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                Protein
              </span>
              <span className="text-foreground font-medium tabular-nums">
                {Math.round(dayProtein)}g / {rules.proteinTarget}g
              </span>
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${proteinPercent}%` }}
                className="h-full rounded-full bg-teal-400 transition-all duration-700"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5" />
                Fat
              </span>
              <span className="text-foreground font-medium tabular-nums">
                {Math.round(dayFat)}g / {rules.fatLimit}g
              </span>
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${fatPercent}%` }}
                className={`h-full rounded-full transition-all duration-700 ${
                  fatPercent > 90 ? "bg-amber-500" : "bg-stone-400"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logged Meals List / Timeline */}
      <div>
        <h2 className="section-title mb-3">Logged Meals</h2>
        {dayMeals.length === 0 ? (
          <div className="card-surface p-8 text-center bg-surface border border-border">
            <UtensilsCrossed className="w-8 h-8 text-muted mx-auto mb-2 opacity-60" />
            <p className="text-xs text-muted">No meals logged for this date.</p>
            <p className="text-[11px] text-muted/70 mt-0.5">
              Add meals from the results screen to begin tracking!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {dayMeals.map((meal) => {
              let mealCal = 0;
              let mealCarb = 0;
              let mealProtein = 0;
              let mealFat = 0;

              meal.items.forEach((item) => {
                const food = mergedFoodDb[item.foodId];
                if (food) {
                  mealCal += food.calories * item.quantity;
                  mealCarb += food.carbs * item.quantity;
                  mealProtein += food.protein * item.quantity;
                  mealFat += food.fat * item.quantity;
                }
              });

              return (
                <div
                  key={meal.id}
                  className="card-surface bg-surface flex flex-col sm:flex-row overflow-hidden border border-border animate-fade-up"
                >
                  {meal.imageUrl && (
                    <div className="w-full sm:w-28 sm:h-auto aspect-[4/3] sm:aspect-square relative shrink-0 bg-stone-900 border-b sm:border-b-0 sm:border-r border-border select-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={meal.imageUrl}
                        alt={`${meal.type} cover`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 p-4 flex flex-col justify-between gap-3 relative">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base select-none">{getMealEmoji(meal.type)}</span>
                          <span className="text-sm font-semibold capitalize text-foreground">
                            {meal.type}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteLoggedMeal(meal.id)}
                          className="p-1.5 rounded-lg text-muted hover:text-red-600 active:bg-surface-muted transition-colors cursor-pointer touch-target"
                          aria-label="Delete logged meal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {meal.items.map((item, idx) => {
                          const food = mergedFoodDb[item.foodId];
                          if (!food) return null;
                          return (
                            <div key={idx} className="flex justify-between text-xs text-muted">
                              <span>
                                {food.name} <span className="text-[10px] text-muted/80">({item.quantity}x)</span>
                              </span>
                              <span className="tabular-nums">
                                {Math.round(food.calories * item.quantity)} kcal
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border flex justify-between items-center text-[10px] font-semibold text-muted/95 uppercase tracking-wider">
                      <span>Meal Total</span>
                      <span className="text-accent font-bold tabular-nums">
                        {Math.round(mealCal)} kcal | C: {Math.round(mealCarb)}g | P:{" "}
                        {Math.round(mealProtein)}g | F: {Math.round(mealFat)}g
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Profile Card */}
        <Link
          href="/profile"
          className="card-surface p-5 bg-surface hover:border-accent/30 transition-all flex flex-col justify-between gap-6 group"
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-stone-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Health Profile</h3>
                <p className="text-xs text-muted mt-0.5">Change recommendation rules</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-muted/60">
            <div className="mt-0.5">{getProfileIcon()}</div>
            <div>
              <span className="text-xs font-semibold text-foreground capitalize">
                {profile} Profile
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
          className="card-surface p-5 bg-surface hover:border-accent/30 transition-all flex flex-col justify-between gap-6 group"
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-stone-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Active Plate</h3>
                <p className="text-xs text-muted mt-0.5">Current scan items & optimization</p>
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
                {scannedItems.length > 0
                  ? "Pending logging to tracker"
                  : "No active scan items"}
              </p>
            </div>
            {scannedItems.length > 0 && (
              <div className="px-2 py-1 rounded bg-teal-50 text-[10px] font-bold text-teal-700 animate-pulse">
                Unsaved Scan
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Manual Quick Add Card */}
      <div className="card-surface p-5 bg-surface flex items-center justify-between gap-4">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
            <PlusCircle className="w-5 h-5 text-stone-600" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">Quick Add Item</h3>
            <p className="text-xs text-muted mt-0.5">Manually construct your active plate</p>
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
