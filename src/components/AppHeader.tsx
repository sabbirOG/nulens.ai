"use client";

import React from "react";
import { Menu } from "lucide-react";
import { PRIMARY_NAV } from "@/lib/nav";
import { scrollToSection } from "@/hooks/useActiveSection";

interface AppHeaderProps {
  onMenuOpen: () => void;
  activeSection: string;
}

export default function AppHeader({
  onMenuOpen,
  activeSection,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl safe-pt">
      <div className="safe-px max-w-6xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-3">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-2.5 text-left shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-purple-950/50">
            Nu
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white block leading-tight">
              NuLens<span className="text-cyan-400">.ai</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-medium hidden sm:block">
              Bangladeshi Nutrition AI
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Desktop navigation"
        >
          {PRIMARY_NAV.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-purple-500/15 text-purple-300"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-full px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-wide">
              Live
            </span>
          </div>

          {/* Hamburger — mobile & tablet */}
          <button
            onClick={onMenuOpen}
            className="lg:hidden p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-300 active:bg-zinc-800 active:text-white touch-target"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
