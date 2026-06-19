"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfileType, FoodItem, BANGLADESHI_FOOD_DB } from "@/lib/food-db";

export interface ScannedItem {
  foodId: string;
  quantity: number;
}

export interface LoggedMeal {
  id: string;
  date: string; // YYYY-MM-DD
  type: "breakfast" | "lunch" | "dinner" | "snack";
  items: ScannedItem[];
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
  // New States and Handlers
  loggedMeals: LoggedMeal[];
  customFoods: Record<string, FoodItem>;
  mergedFoodDb: Record<string, FoodItem>;
  handleLogMeal: (type: "breakfast" | "lunch" | "dinner" | "snack") => void;
  handleDeleteLoggedMeal: (mealId: string) => void;
  handleCreateCustomFood: (food: FoodItem) => void;
  handleOptimizePortions: (optimizedItems: ScannedItem[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfileType>("general");
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);
  const [customFoods, setCustomFoods] = useState<Record<string, FoodItem>>({});
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
      const savedMeals = localStorage.getItem("nulens_logged_meals");
      if (savedMeals) {
        setLoggedMeals(JSON.parse(savedMeals));
      }
      const savedCustomFoods = localStorage.getItem("nulens_custom_foods");
      if (savedCustomFoods) {
        setCustomFoods(JSON.parse(savedCustomFoods));
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

  // Save loggedMeals to localStorage when they change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("nulens_logged_meals", JSON.stringify(loggedMeals));
    } catch (e) {
      console.error("Failed to save logged meals to localStorage:", e);
    }
  }, [loggedMeals, isLoaded]);

  // Save customFoods to localStorage when they change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("nulens_custom_foods", JSON.stringify(customFoods));
    } catch (e) {
      console.error("Failed to save custom foods to localStorage:", e);
    }
  }, [customFoods, isLoaded]);

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

  const handleLogMeal = (type: "breakfast" | "lunch" | "dinner" | "snack") => {
    if (scannedItems.length === 0) return;
    const newMeal: LoggedMeal = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString("en-CA"), // YYYY-MM-DD
      type,
      items: [...scannedItems],
    };
    setLoggedMeals((prev) => [...prev, newMeal]);
    clearPlate();
  };

  const handleDeleteLoggedMeal = (mealId: string) => {
    setLoggedMeals((prev) => prev.filter((m) => m.id !== mealId));
  };

  const handleCreateCustomFood = (food: FoodItem) => {
    setCustomFoods((prev) => ({
      ...prev,
      [food.id]: food,
    }));
  };

  const handleOptimizePortions = (optimizedItems: ScannedItem[]) => {
    setScannedItems(optimizedItems);
  };

  const mergedFoodDb = { ...BANGLADESHI_FOOD_DB, ...customFoods };

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
        loggedMeals,
        customFoods,
        mergedFoodDb,
        handleLogMeal,
        handleDeleteLoggedMeal,
        handleCreateCustomFood,
        handleOptimizePortions,
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
