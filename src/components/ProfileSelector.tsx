"use client";

import React from "react";
import { UserProfileType } from "@/lib/food-db";
import { Heart, ShieldAlert, Baby } from "lucide-react";

interface ProfileSelectorProps {
  selectedProfile: UserProfileType;
  onChange: (profile: UserProfileType) => void;
}

const profiles = [
  {
    id: "general" as UserProfileType,
    label: "General",
    icon: Heart,
    active: "bg-accent text-white shadow-sm",
    idle: "bg-surface text-muted border border-border hover:bg-surface-muted",
  },
  {
    id: "diabetic" as UserProfileType,
    label: "Diabetic",
    icon: ShieldAlert,
    active: "bg-accent text-white shadow-sm",
    idle: "bg-surface text-muted border border-border hover:bg-surface-muted",
  },
  {
    id: "child" as UserProfileType,
    label: "Child",
    icon: Baby,
    active: "bg-accent text-white shadow-sm",
    idle: "bg-surface text-muted border border-border hover:bg-surface-muted",
  },
];

export default function ProfileSelector({
  selectedProfile,
  onChange,
}: ProfileSelectorProps) {
  return (
    <section className="animate-fade-up">
      <p className="section-subtitle mb-3">
        Who is this meal for?
      </p>
      <div
        className="flex gap-2"
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
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-sm font-medium transition-all touch-target ${
                isSelected ? p.active : p.idle
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
