"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AppHeader from "./AppHeader";
import MobileDrawer from "./MobileDrawer";
import BottomNav from "./BottomNav";
import { useApp } from "@/context/AppContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { handleManualAdd } = useApp();

  const handleManualAddRedirect = () => {
    // Redirect to results and open manual add modal/section if needed
    router.push("/results?manualAdd=true");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader
        onMenuOpen={() => setDrawerOpen(true)}
        activePath={pathname}
      />

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onManualAdd={handleManualAddRedirect}
        activePath={pathname}
      />

      <main className="flex-1 safe-px max-w-3xl w-full mx-auto px-4 py-6 flex flex-col gap-8 has-bottom-nav lg:pb-10">
        {children}
      </main>

      <footer className="hidden lg:block border-t border-border py-6">
        <div className="safe-px max-w-3xl mx-auto px-4 text-center text-xs text-muted">
          &copy; 2026 NuLens.ai
        </div>
      </footer>

      <BottomNav activePath={pathname} />
    </div>
  );
}
