"use client";

import React from "react";
import { UserProfileType, PROFILE_RECOMMENDATIONS } from "@/lib/food-db";
import { Activity, ShieldAlert, Baby, Heart } from "lucide-react";

interface ProfileSelectorProps {
  selectedProfile: UserProfileType;
  onChange: (profile: UserProfileType) => void;
}

const profiles = [
  {
    id: "general" as UserProfileType,
    title: "General",
    shortTitle: "General",
    description: "Balanced diet focus, default calorie recommendations.",
    icon: Heart,
    color: "border-cyan-500/60 text-cyan-400 bg-cyan-950/30",
    pillActive: "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25",
    pillIdle: "bg-zinc-800/80 text-zinc-400",
    accent: "bg-cyan-500",
  },
  {
    id: "diabetic" as UserProfileType,
    title: "Diabetic",
    shortTitle: "Diabetic",
    description: "Low glycemic index, strict carbohydrate thresholds.",
    icon: ShieldAlert,
    color: "border-pink-500/60 text-pink-400 bg-pink-950/30",
    pillActive: "bg-pink-500 text-white shadow-lg shadow-pink-500/25",
    pillIdle: "bg-zinc-800/80 text-zinc-400",
    accent: "bg-pink-500",
  },
  {
    id: "child" as UserProfileType,
    title: "Child",
    shortTitle: "Child",
    description: "Growth focus, high protein and calorie adequacy.",
    icon: Baby,
    color: "border-purple-500/60 text-purple-400 bg-purple-950/30",
    pillActive: "bg-purple-500 text-white shadow-lg shadow-purple-500/25",
    pillIdle: "bg-zinc-800/80 text-zinc-400",
    accent: "bg-purple-500",
  },
];

export default function ProfileSelector({
  selectedProfile,
  onChange,
}: ProfileSelectorProps) {
  const active = profiles.find((p) => p.id === selectedProfile)!;
  const ActiveIcon = active.icon;
  const rules = PROFILE_RECOMMENDATIONS[selectedProfile];

  return (
    <section className="flex flex-col gap-4 animate-fade-up">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400 shrink-0" />
            Health Profile
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Tailor nutrition limits and dietary advice
          </p>
        </div>
      </div>

      {/* Mobile: segmented pill control */}
      <div
        className="flex p-1 bg-zinc-900/60 border border-zinc-800 rounded-2xl gap-1"
        role="tablist"
        aria-label="Select health profile"
      >
        {profiles.map((p) => {
          const Icon = p.icon;
          const isSelected = selectedProfile === p.id;
          return (
            <button
              key={p.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onChange(p.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 touch-target ${
                isSelected ? p.pillActive : `${p.pillIdle} hover:text-zinc-200`
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{p.shortTitle}</span>
            </button>
          );
        })}
      </div>

      {/* Active profile detail card */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border ${active.color} transition-all duration-300`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-white/10 shrink-0">
            <ActiveIcon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-zinc-100 text-sm sm:text-base">
              {active.title} Profile
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
              {active.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-white/10">
          <div className="text-center sm:text-left">
            <span className="block text-[10px] text-zinc-500 font-medium uppercase tracking-wide">
              Calories
            </span>
            <span className="text-sm sm:text-base text-zinc-100 font-bold">
              {rules.calorieTarget}
            </span>
            <span className="text-[10px] text-zinc-500 ml-0.5">kcal</span>
          </div>
          <div className="text-center sm:text-left">
            <span className="block text-[10px] text-zinc-500 font-medium uppercase tracking-wide">
              Max Carbs
            </span>
            <span className="text-sm sm:text-base text-zinc-100 font-bold">
              {rules.carbLimit}g
            </span>
          </div>
          <div className="text-center sm:text-left">
            <span className="block text-[10px] text-zinc-500 font-medium uppercase tracking-wide">
              Min Protein
            </span>
            <span className="text-sm sm:text-base text-zinc-100 font-bold">
              {rules.proteinTarget}g
            </span>
          </div>
        </div>
      </div>

      {/* Desktop: full card grid (hidden on mobile) */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-3">
        {profiles.map((p) => {
          const Icon = p.icon;
          const isSelected = selectedProfile === p.id;
          const profileRules = PROFILE_RECOMMENDATIONS[p.id];

          return (
            <button
              key={`desktop-${p.id}`}
              onClick={() => onChange(p.id)}
              className={`p-4 rounded-xl border text-left flex flex-col gap-3 transition-all duration-300 relative overflow-hidden group ${
                isSelected
                  ? `${p.color} shadow-lg shadow-black/40`
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
                    isSelected ? "bg-white/10" : "bg-zinc-800/80"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-zinc-100">{p.title}</span>
              </div>
              <p className="text-xs text-zinc-400">{p.description}</p>
              <div className="mt-auto pt-2 border-t border-zinc-800/60 flex justify-between text-[10px] text-zinc-400">
                <div>
                  <span className="block text-zinc-500 font-medium uppercase">
                    Target
                  </span>
                  <span className="text-zinc-200 font-bold">
                    {profileRules.calorieTarget} kcal
                  </span>
                </div>
                <div>
                  <span className="block text-zinc-500 font-medium uppercase">
                    Carbs
                  </span>
                  <span className="text-zinc-200 font-bold">
                    Max {profileRules.carbLimit}g
                  </span>
                </div>
                <div>
                  <span className="block text-zinc-500 font-medium uppercase">
                    Protein
                  </span>
                  <span className="text-zinc-200 font-bold">
                    Min {profileRules.proteinTarget}g
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
