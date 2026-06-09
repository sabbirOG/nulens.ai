"use client";

import React from "react";
import { UserProfileType, PROFILE_RECOMMENDATIONS } from "@/lib/food-db";
import { Flame, Compass, Wheat, Shield, Droplets } from "lucide-react";

interface PlateBalanceGaugeProps {
  items: Array<{ foodId: string; quantity: number }>;
  profileType: UserProfileType;
  foodDb: Record<
    string,
    { calories: number; carbs: number; protein: number; fat: number }
  >;
}

const profileLabels: Record<UserProfileType, string> = {
  general: "General",
  diabetic: "Diabetic",
  child: "Child",
};

export default function PlateBalanceGauge({
  items,
  profileType,
  foodDb,
}: PlateBalanceGaugeProps) {
  const rules = PROFILE_RECOMMENDATIONS[profileType];

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

  const calPercent = Math.min((calories / rules.calorieTarget) * 100, 100);
  const carbPercent = Math.min((carbs / rules.carbLimit) * 100, 100);
  const proteinPercent = Math.min((protein / rules.proteinTarget) * 100, 100);
  const fatPercent = Math.min((fat / rules.fatLimit) * 100, 100);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (calPercent / 100) * circumference;

  const macros = [
    {
      label: "Carbs",
      icon: Wheat,
      iconColor: "text-cyan-400",
      value: carbs,
      limit: rules.carbLimit,
      percent: carbPercent,
      barColor:
        carbPercent > 85
          ? "bg-pink-500 shadow-md shadow-pink-500/40"
          : "bg-cyan-500",
      unit: "g",
    },
    {
      label: "Protein",
      icon: Shield,
      iconColor: "text-purple-400",
      value: protein,
      limit: rules.proteinTarget,
      percent: proteinPercent,
      barColor:
        proteinPercent >= 100 ? "bg-green-500" : "bg-purple-500",
      unit: "g",
    },
    {
      label: "Fat",
      icon: Droplets,
      iconColor: "text-pink-400",
      value: fat,
      limit: rules.fatLimit,
      percent: fatPercent,
      barColor:
        fatPercent > 90
          ? "bg-red-500 shadow-md shadow-red-500/40"
          : "bg-pink-500",
      unit: "g",
    },
  ];

  return (
    <section className="card-surface p-4 sm:p-5 flex flex-col gap-5 animate-fade-up">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400 shrink-0" />
            Plate Balance
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Nutrient load from current scan
          </p>
        </div>
        <span className="shrink-0 text-[10px] sm:text-xs bg-zinc-800 border border-zinc-700 px-2.5 py-1.5 rounded-full text-zinc-300 font-bold uppercase tracking-wide">
          {profileLabels[profileType]}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Calorie ring */}
        <div className="relative flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36 shrink-0">
          <svg
            className="w-full h-full -rotate-90"
            viewBox="0 0 128 128"
            aria-hidden
          >
            <circle
              cx="64"
              cy="64"
              r={radius}
              className="stroke-zinc-800"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              className="stroke-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] transition-all duration-700 ease-out"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center text-center">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mb-0.5" />
            <span className="text-2xl sm:text-3xl font-black text-zinc-100 leading-none">
              {Math.round(calories)}
            </span>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase mt-1">
              / {rules.calorieTarget} kcal
            </span>
          </div>
        </div>

        {/* Macro bars */}
        <div className="flex-1 w-full flex flex-col gap-4">
          {macros.map((macro) => {
            const Icon = macro.icon;
            return (
              <div key={macro.label} className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Icon className={`w-4 h-4 ${macro.iconColor}`} />
                    {macro.label}
                  </span>
                  <span className="text-zinc-400 font-medium tabular-nums">
                    <strong className="text-zinc-100">
                      {Math.round(macro.value)}
                      {macro.unit}
                    </strong>
                    <span className="text-zinc-600 mx-1">/</span>
                    {macro.limit}
                    {macro.unit}
                  </span>
                </div>
                <div className="w-full h-3 bg-zinc-800/80 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${macro.percent}%` }}
                    className={`h-full rounded-full transition-all duration-700 ease-out ${macro.barColor}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily allowance summary */}
      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm bg-zinc-950/60 rounded-xl border border-zinc-800/80 px-4 py-3">
        <span className="text-zinc-500">Meal vs daily allowance</span>
        <span className="font-bold text-zinc-100 tabular-nums">
          {calories > 0
            ? Math.round((calories / rules.calorieTarget) * 100)
            : 0}
          %
        </span>
      </div>
    </section>
  );
}
