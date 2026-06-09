"use client";

import React from "react";
import { UserProfileType, PROFILE_RECOMMENDATIONS } from "@/lib/food-db";
import { Flame, Compass, Wheat, Shield } from "lucide-react";

interface PlateBalanceGaugeProps {
  items: Array<{ foodId: string; quantity: number }>;
  profileType: UserProfileType;
  foodDb: Record<string, { calories: number; carbs: number; protein: number; fat: number }>;
}

export default function PlateBalanceGauge({
  items,
  profileType,
  foodDb,
}: PlateBalanceGaugeProps) {
  const rules = PROFILE_RECOMMENDATIONS[profileType];

  // Calculate totals
  let calories = 0;
  let carbs = 0;
  let protein = 0;
  let fat = 0;

  items.forEach((item) => {
    const food = foodDb[item.foodId];
    if (food) {
      calories += food.calories * item.quantity;
      carbs += food.carbs * item.quantity;
      protein += food.protein * item.quantity;
      fat += food.fat * item.quantity;
    }
  });

  // Calculate percentage of target/limit
  const calPercent = Math.min((calories / rules.calorieTarget) * 100, 100);
  const carbPercent = Math.min((carbs / rules.carbLimit) * 100, 100);
  const proteinPercent = Math.min((protein / rules.proteinTarget) * 100, 100);
  const fatPercent = Math.min((fat / rules.fatLimit) * 100, 100);

  // SVG parameters for Main Calorie Ring
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (calPercent / 100) * circumference;

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-6 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
        <div>
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-1.5">
            <Compass className="w-5 h-5 text-cyan-400" />
            Plate Balance Gauge
          </h3>
          <p className="text-xs text-zinc-400">Nutrient load from current scan</p>
        </div>
        <span className="text-xs bg-zinc-800/80 border border-zinc-700 px-2.5 py-1 rounded-full text-zinc-300 font-semibold uppercase">
          {profileType}
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-2">
        {/* Calorie Circular Gauge */}
        <div className="relative flex items-center justify-center w-36 h-36">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-zinc-800"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-purple-500 drop-shadow-[0_0_8px_rgba(157,78,221,0.5)] transition-all duration-1000 ease-out"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          {/* Central Label */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <Flame className="w-5 h-5 text-purple-400" />
            <span className="text-2xl font-black text-zinc-100">{Math.round(calories)}</span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase">
              / {rules.calorieTarget} kcal
            </span>
          </div>
        </div>

        {/* Breakdown bars */}
        <div className="flex-1 w-full flex flex-col gap-4">
          {/* Carbs */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300 flex items-center gap-1">
                <Wheat className="w-3.5 h-3.5 text-cyan-400" />
                Carbohydrates
              </span>
              <span className="text-zinc-400 font-medium">
                <strong className="text-zinc-200">{Math.round(carbs)}g</strong> / {rules.carbLimit}g
              </span>
            </div>
            <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                style={{ width: `${carbPercent}%` }}
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  carbPercent > 85 ? "bg-pink-500 shadow-md shadow-pink-500/50" : "bg-cyan-500"
                }`}
              />
            </div>
          </div>

          {/* Proteins */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                Protein
              </span>
              <span className="text-zinc-400 font-medium">
                <strong className="text-zinc-200">{Math.round(protein)}g</strong> / {rules.proteinTarget}g
              </span>
            </div>
            <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                style={{ width: `${proteinPercent}%` }}
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  proteinPercent >= 100 ? "bg-green-500" : "bg-purple-500"
                }`}
              />
            </div>
          </div>

          {/* Fats */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-pink-400" />
                Fats
              </span>
              <span className="text-zinc-400 font-medium">
                <strong className="text-zinc-200">{Math.round(fat)}g</strong> / {rules.fatLimit}g
              </span>
            </div>
            <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                style={{ width: `${fatPercent}%` }}
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  fatPercent > 90 ? "bg-red-500 shadow-md shadow-red-500/50" : "bg-pink-500"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Target Status bar */}
      <div className="text-xs bg-zinc-950/50 rounded-xl border border-zinc-800 p-3 text-zinc-400 flex items-center justify-between">
        <span>Current Meal Concentration:</span>
        <span className="font-bold text-zinc-200">
          {calories > 0 ? Math.round((calories / rules.calorieTarget) * 100) : 0}% of daily allowance
        </span>
      </div>
    </div>
  );
}
