"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { DRAWER_LINKS, DRAWER_LEGAL } from "@/lib/nav";
import { scrollToSection } from "@/hooks/useActiveSection";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onManualAdd: () => void;
  activeSection: string;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  onManualAdd,
  activeSection,
}: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleLink = (link: (typeof DRAWER_LINKS)[0]) => {
    if (link.action === "manual-add") {
      onManualAdd();
      onClose();
      return;
    }
    if (link.sectionId) {
      if (link.sectionId === "about") {
        const details = document.getElementById("about") as HTMLDetailsElement | null;
        if (details) details.open = true;
      }
      scrollToSection(link.sectionId);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer panel */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-[min(320px,85vw)] bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ paddingTop: "var(--safe-top)", paddingBottom: "var(--safe-bottom)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-white text-xs">
              Nu
            </div>
            <span className="font-bold text-zinc-100">Menu</span>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl text-zinc-400 active:text-zinc-100 active:bg-zinc-800 touch-target"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 mb-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            Navigate
          </p>
          <ul className="flex flex-col gap-1">
            {DRAWER_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.sectionId != null && activeSection === link.sectionId;

              return (
                <li key={link.id}>
                  <button
                    onClick={() => handleLink(link)}
                    className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition-colors touch-target ${
                      isActive
                        ? "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                        : "text-zinc-300 active:bg-zinc-800/80"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isActive ? "bg-purple-500/20" : "bg-zinc-800/80"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-sm font-semibold">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="block text-xs text-zinc-500 mt-0.5 truncate">
                          {link.description}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="px-3 mt-6 mb-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            Legal
          </p>
          <ul className="flex flex-col gap-1">
            {DRAWER_LEGAL.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.id}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                    }}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-400 active:text-zinc-200 active:bg-zinc-800/80 transition-colors"
                  >
                    <Icon className="w-4 h-4 shrink-0 ml-2" />
                    <span className="text-sm">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer footer */}
        <div className="px-5 py-4 border-t border-zinc-800/80">
          <p className="text-[10px] text-zinc-600 text-center">
            &copy; 2026 NuLens.ai
          </p>
        </div>
      </aside>
    </>
  );
}
