"use client";

import React from "react";
import ProfileSelector from "@/components/ProfileSelector";
import { useApp } from "@/context/AppContext";

export default function ProfilePage() {
  const { profile, setProfile } = useApp();

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight leading-snug">
          Health profile settings
        </h1>
        <p className="text-muted mt-1 text-sm">
          Select who the meal recommendations should be tailored for.
        </p>
      </div>

      <div className="card-surface p-6">
        <ProfileSelector selectedProfile={profile} onChange={setProfile} />
      </div>

      {profile === "diabetic" && (
        <div className="p-4 rounded-xl border border-amber-100 bg-amber-50 text-amber-800 text-xs leading-relaxed animate-fade-up">
          <strong>Diabetic Profile Active:</strong> Plain rice, roti, and sweets will flag glycemic load concerns. Focus is on fiber, protein, and low GI alternatives.
        </div>
      )}

      {profile === "child" && (
        <div className="p-4 rounded-xl border border-teal-100 bg-teal-50 text-teal-800 text-xs leading-relaxed animate-fade-up">
          <strong>Child Growth Profile Active:</strong> Protein sufficiency is highlighted. Sweet items and low calorie density options will display warnings.
        </div>
      )}

      {profile === "general" && (
        <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-muted text-xs leading-relaxed animate-fade-up">
          <strong>General Diet Active:</strong> Balancing calories, proteins, and vegetables for daily maintenance.
        </div>
      )}
    </div>
  );
}
