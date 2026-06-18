import Link from "next/link";
import { PRIMARY_NAV } from "@/lib/nav";

interface BottomNavProps {
  activePath: string;
}

export default function BottomNav({ activePath }: BottomNavProps) {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(28,25,23,0.06)]"
      style={{ paddingBottom: "var(--safe-bottom)" }}
      aria-label="Main navigation"
    >
      <div className="flex items-stretch justify-around max-w-lg mx-auto">
        {PRIMARY_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              aria-current={isActive ? "page" : undefined}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 px-1 min-h-[52px] transition-colors touch-target ${
                isActive ? "text-accent" : "text-muted active:text-foreground"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : ""}`}
              />
              <span className="text-[10px] font-medium leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
