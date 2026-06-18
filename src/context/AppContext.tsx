"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfileType } from "@/lib/food-db";

interface ScannedItem {
  foodId: string;
  quantity: number;
}

interface AppContextType {
  profile: UserProfileType;
  setProfile: (profile: UserProfileType) => void;
  scannedItems: ScannedItem[];
  setScannedItems: React.Dispatch<React.SetStateAction<ScannedItem[]>>;
  handleUpdateQuantity: (foodId: string, delta: number) => void;
  handleRemoveItem: (foodId: string) => void;
  handleScanComplete: (items: ScannedItem[]) => void;
  handleManualAdd: (foodId: string) => void;
  clearPlate: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfileType>("general");
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("nulens_profile");
      if (savedProfile) {
        setProfileState(savedProfile as UserProfileType);
      }
      const savedItems = localStorage.getItem("nulens_scanned_items");
      if (savedItems) {
        setScannedItems(JSON.parse(savedItems));
      }
    } catch (e) {
      console.error("Failed to load state from localStorage:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save profile to localStorage when it changes
  const setProfile = (newProfile: UserProfileType) => {
    setProfileState(newProfile);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("nulens_profile", newProfile);
      } catch (e) {
        console.error("Failed to save profile to localStorage:", e);
      }
    }
  };

  // Save scannedItems to localStorage when they change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("nulens_scanned_items", JSON.stringify(scannedItems));
    } catch (e) {
      console.error("Failed to save items to localStorage:", e);
    }
  }, [scannedItems, isLoaded]);

  const handleUpdateQuantity = (foodId: string, delta: number) => {
    setScannedItems((prev) =>
      prev.map((item) =>
        item.foodId === foodId
          ? { ...item, quantity: Math.max(0.5, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (foodId: string) => {
    setScannedItems((prev) => prev.filter((item) => item.foodId !== foodId));
  };

  const handleScanComplete = (items: ScannedItem[]) => {
    setScannedItems(items);
  };

  const handleManualAdd = (foodId: string) => {
    setScannedItems((prev) => {
      if (prev.some((item) => item.foodId === foodId)) {
        return prev.map((item) =>
          item.foodId === foodId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { foodId, quantity: 1 }];
      }
    });
  };

  const clearPlate = () => {
    setScannedItems([]);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        scannedItems,
        setScannedItems,
        handleUpdateQuantity,
        handleRemoveItem,
        handleScanComplete,
        handleManualAdd,
        clearPlate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppContextProvider");
  }
  return context;
}
