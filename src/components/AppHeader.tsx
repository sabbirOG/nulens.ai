import Link from "next/link";
import { Menu } from "lucide-react";
import { PRIMARY_NAV } from "@/lib/nav";

interface AppHeaderProps {
  onMenuOpen: () => void;
  activePath: string;
}

export default function AppHeader({
  onMenuOpen,
  activePath,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-md safe-pt">
      <div className="safe-px max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-left shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center font-bold text-white text-sm">
            Nu
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            NuLens<span className="text-accent">.ai</span>
          </span>
        </Link>

        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Desktop navigation"
        >
          {PRIMARY_NAV.map((item) => {
            const isActive = activePath === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={isActive ? "page" : undefined}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent-soft text-accent-text"
                    : "text-muted hover:text-foreground hover:bg-surface-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={onMenuOpen}
          className="lg:hidden p-2.5 rounded-xl border border-border bg-surface text-muted active:bg-surface-muted touch-target"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
