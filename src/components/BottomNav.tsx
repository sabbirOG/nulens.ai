"use client";

import React from "react";
import { PRIMARY_NAV } from "@/lib/nav";
import { scrollToSection } from "@/hooks/useActiveSection";

interface BottomNavProps {
  activeSection: string;
}

export default function BottomNav({ activeSection }: BottomNavProps) {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl"
      style={{ paddingBottom: "var(--safe-bottom)" }}
      aria-label="Main navigation"
    >
      <div className="flex items-stretch justify-around max-w-lg mx-auto">
        {PRIMARY_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 px-1 min-h-[56px] transition-colors touch-target ${
                isActive
                  ? "text-purple-400"
                  : "text-zinc-500 active:text-zinc-300"
              }`}
            >
              <div
                className={`relative p-1.5 rounded-xl transition-all ${
                  isActive ? "bg-purple-500/15" : ""
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : ""}`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
                )}
              </div>
              <span
                className={`text-[10px] font-semibold leading-none ${
                  isActive ? "text-purple-300" : ""
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
