import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { DRAWER_LINKS, DRAWER_LEGAL } from "@/lib/nav";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onManualAdd: () => void;
  activePath: string;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  onManualAdd,
  activePath,
}: MobileDrawerProps) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleLink = (link: (typeof DRAWER_LINKS)[0]) => {
    if (link.action === "manual-add") {
      onManualAdd();
      onClose();
      return;
    }
    if (link.path) {
      router.push(link.path);
      onClose();
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-stone-900/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-[min(300px,85vw)] bg-surface border-l border-border shadow-xl flex flex-col transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          paddingTop: "var(--safe-top)",
          paddingBottom: "var(--safe-bottom)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <span className="font-semibold text-foreground">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted active:bg-surface-muted touch-target"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="flex flex-col gap-1">
            {DRAWER_LINKS.filter((l) => l.id !== "about").map((link) => {
              const Icon = link.icon;
              const isActive =
                link.path != null && activePath === link.path;

              return (
                <li key={link.id}>
                  <button
                    onClick={() => handleLink(link)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left touch-target ${
                      isActive
                        ? "bg-accent-soft text-accent-text font-medium"
                        : "text-foreground active:bg-surface-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-sm">{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 pt-4 border-t border-border flex flex-col gap-1">
            {DRAWER_LEGAL.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLink(link)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-muted active:text-foreground hover:bg-surface-muted rounded-xl text-left touch-target"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="px-4 py-3 border-t border-border text-center">
          <p className="text-xs text-muted">&copy; 2026 NuLens.ai</p>
        </div>
      </aside>
    </>
  );
}
