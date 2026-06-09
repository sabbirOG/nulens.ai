"use client";

import React from "react";
import { UserProfileType, PROFILE_RECOMMENDATIONS } from "@/lib/food-db";
import { Activity, ShieldAlert, Baby, Heart } from "lucide-react";

interface ProfileSelectorProps {
  selectedProfile: UserProfileType;
  onChange: (profile: UserProfileType) => void;
}

export default function ProfileSelector({
  selectedProfile,
  onChange,
}: ProfileSelectorProps) {
  const profiles = [
    {
      id: "general" as UserProfileType,
      title: "General Profile",
      description: "Balanced diet focus, default calorie recommendations.",
      icon: Heart,
      color: "border-cyan-500 text-cyan-400 bg-cyan-950/20",
      accent: "bg-cyan-500",
    },
    {
      id: "diabetic" as UserProfileType,
      title: "Diabetic Profile",
      description: "Low glycemic index, strict carbohydrate thresholds.",
      icon: ShieldAlert,
      color: "border-pink-500 text-pink-400 bg-pink-950/20",
      accent: "bg-pink-500",
    },
    {
      id: "child" as UserProfileType,
      title: "Child Profile",
      description: "Growth focus, high protein and calorie adequacy.",
      icon: Baby,
      color: "border-purple-500 text-purple-400 bg-purple-950/20",
      accent: "bg-purple-500",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-400" />
          Select Health Profile
        </h3>
        <p className="text-sm text-zinc-400">
          Tailor dietary feedback and nutrition limit warnings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {profiles.map((p) => {
          const Icon = p.icon;
          const isSelected = selectedProfile === p.id;
          const rules = PROFILE_RECOMMENDATIONS[p.id];

          return (
            <button
              key={p.id}
              onClick={() => onChange(p.id)}
              className={`p-4 rounded-xl border text-left flex flex-col gap-3 transition-all duration-300 relative overflow-hidden group ${
                isSelected
                  ? `${p.color} shadow-lg shadow-black/40 scale-[1.02]`
                  : "border-zinc-800 text-zinc-400 bg-zinc-900/40 hover:border-zinc-700 hover:text-zinc-300"
              }`}
            >
              {isSelected && (
                <div
                  className={`absolute top-0 right-0 w-2 h-2 rounded-bl-lg ${p.accent}`}
                />
              )}
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-lg ${
                    isSelected ? "bg-white/10" : "bg-zinc-800/80 group-hover:bg-zinc-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-zinc-100">{p.title}</span>
              </div>
              <p className="text-xs text-zinc-400">{p.description}</p>
              
              <div className="mt-2 pt-2 border-t border-zinc-800/60 flex justify-between text-[10px] text-zinc-400">
                <div>
                  <span className="block text-zinc-500 font-medium uppercase">Target</span>
                  <span className="text-zinc-200 font-bold">{rules.calorieTarget} kcal</span>
                </div>
                <div>
                  <span className="block text-zinc-500 font-medium uppercase">Carbs</span>
                  <span className="text-zinc-200 font-bold">Max {rules.carbLimit}g</span>
                </div>
                <div>
                  <span className="block text-zinc-500 font-medium uppercase">Protein</span>
                  <span className="text-zinc-200 font-bold">Min {rules.proteinTarget}g</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
