"use client";

import React from "react";
import { UserProfileType, PROFILE_RECOMMENDATIONS } from "@/lib/food-db";
import { Flame, Wheat, Shield, Droplets } from "lucide-react";

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

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (calPercent / 100) * circumference;

  const macros = [
    {
      label: "Carbs",
      icon: Wheat,
      value: carbs,
      limit: rules.carbLimit,
      percent: carbPercent,
      color: carbPercent > 85 ? "bg-amber-500" : "bg-teal-500",
    },
    {
      label: "Protein",
      icon: Shield,
      value: protein,
      limit: rules.proteinTarget,
      percent: proteinPercent,
      color: proteinPercent >= 100 ? "bg-emerald-500" : "bg-teal-400",
    },
    {
      label: "Fat",
      icon: Droplets,
      value: fat,
      limit: rules.fatLimit,
      percent: fatPercent,
      color: fatPercent > 90 ? "bg-amber-500" : "bg-stone-400",
    },
  ];

  if (items.length === 0) return null;

  return (
    <section className="card-surface p-5 animate-fade-up">
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-title">Nutrition summary</h2>
        <span className="text-xs font-medium text-accent-text bg-accent-soft px-2.5 py-1 rounded-full">
          {profileLabels[profileType]}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-28 h-28 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-stone-200"
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
              {Math.round(calories)}
            </span>
            <span className="text-[10px] text-muted mt-0.5">kcal</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          {macros.map((macro) => {
            const Icon = macro.icon;
            return (
              <div key={macro.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted flex items-center gap-1">
                    <Icon className="w-3.5 h-3.5" />
                    {macro.label}
                  </span>
                  <span className="text-foreground font-medium tabular-nums">
                    {Math.round(macro.value)}g / {macro.limit}g
                  </span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${macro.percent}%` }}
                    className={`h-full rounded-full transition-all duration-700 ${macro.color}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
