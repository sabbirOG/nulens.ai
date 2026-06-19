"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfileType, FoodItem, BANGLADESHI_FOOD_DB, getHealthFeedback } from "@/lib/food-db";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface ScannedItem {
  foodId: string;
  quantity: number;
}

export interface LoggedMeal {
  id: string;
  date: string; // YYYY-MM-DD
  type: "breakfast" | "lunch" | "dinner" | "snack";
  items: ScannedItem[];
  imageUrl?: string;
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
  // States and Handlers
  loggedMeals: LoggedMeal[];
  customFoods: Record<string, FoodItem>;
  mergedFoodDb: Record<string, FoodItem>;
  handleLogMeal: (type: "breakfast" | "lunch" | "dinner" | "snack") => void;
  handleDeleteLoggedMeal: (mealId: string) => void;
  handleCreateCustomFood: (food: FoodItem) => void;
  handleOptimizePortions: (optimizedItems: ScannedItem[]) => void;
  // Supabase states
  userId: string | null;
  supabaseActive: boolean;
  activePlateImage: string | null;
  setActivePlateImage: (img: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper to convert base64 data URI to Blob
async function base64ToBlob(base64Data: string): Promise<Blob> {
  const res = await fetch(base64Data);
  return res.blob();
}

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfileType>("general");
  const [scannedItems, setScannedItems] = useState<ScannedItem[]>([]);
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);
  const [customFoods, setCustomFoods] = useState<Record<string, FoodItem>>({});
  const [dbFoods, setDbFoods] = useState<Record<string, FoodItem>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [activePlateImage, setActivePlateImage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const supabaseActive = isSupabaseConfigured();

  // Load state and authenticate on mount
  useEffect(() => {
    async function initializeApp() {
      if (supabaseActive) {
        try {
          // 1. Authenticate user anonymously
          let currentUserId: string | null = null;
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            currentUserId = session.user.id;
          } else {
            const { data: signInData, error: signInError } = await supabase.auth.signInAnonymously();
            if (signInError) throw signInError;
            currentUserId = signInData.user?.id || null;
          }
          
          setUserId(currentUserId);

          if (currentUserId) {
            // 2. Fetch User Profile
            const { data: profileData } = await supabase
              .from("profiles")
              .select("health_goal")
              .eq("user_id", currentUserId)
              .maybeSingle();

            if (profileData) {
              setProfileState(profileData.health_goal as UserProfileType);
            } else {
              // Create default profile in Supabase
              await supabase.from("profiles").insert({
                user_id: currentUserId,
                health_goal: "general",
              });
            }

            // 3. Fetch Scans / Meal Logs history
            const { data: scansData } = await supabase
              .from("scans")
              .select("*")
              .eq("user_id", currentUserId)
              .order("created_at", { ascending: true });

            if (scansData) {
              const mappedMeals: LoggedMeal[] = scansData.map((row) => ({
                id: row.id,
                date: row.date,
                type: row.meal_type as any,
                items: row.detected_items as ScannedItem[],
                imageUrl: row.image_url || undefined,
              }));
              setLoggedMeals(mappedMeals);
            }

            // 4. Fetch Food Database (both system defaults and custom items)
            const { data: foodsData } = await supabase
              .from("food_nutrition")
              .select("*");

            if (foodsData) {
              const mappedFoods: Record<string, FoodItem> = {};
              const systemCustom: Record<string, FoodItem> = {};

              foodsData.forEach((row) => {
                const item: FoodItem = {
                  id: row.id,
                  name: row.item_name,
                  banglaName: row.bangla_name,
                  calories: Number(row.calories),
                  carbs: Number(row.carbs),
                  protein: Number(row.protein),
                  fat: Number(row.fat),
                  servingSize: row.serving_size,
                  glycemicIndex: row.gi_index,
                  category: row.category as any,
                  description: row.description || "",
                };
                mappedFoods[row.id] = item;
                if (row.user_id === currentUserId) {
                  systemCustom[row.id] = item;
                }
              });

              setDbFoods(mappedFoods);
              setCustomFoods(systemCustom);
            }
          }
        } catch (e) {
          console.error("Supabase initialization failed, falling back to localStorage:", e);
          loadLocalStorageFallback();
        }
      } else {
        loadLocalStorageFallback();
      }
      setIsLoaded(true);
    }

    function loadLocalStorageFallback() {
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
    }

    initializeApp();
  }, [supabaseActive]);

  // Synchronize active plate to localStorage locally
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("nulens_scanned_items", JSON.stringify(scannedItems));
    } catch (e) {
      console.error("Failed to save items to localStorage:", e);
    }
  }, [scannedItems, isLoaded]);

  // Sync profile when it changes
  const setProfile = async (newProfile: UserProfileType) => {
    setProfileState(newProfile);
    try {
      localStorage.setItem("nulens_profile", newProfile);
      if (supabaseActive && userId) {
        await supabase
          .from("profiles")
          .upsert(
            { user_id: userId, health_goal: newProfile },
            { onConflict: "user_id" }
          );
      }
    } catch (e) {
      console.error("Failed to sync profile change:", e);
    }
  };

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
    setActivePlateImage(null);
  };

  const handleLogMeal = async (type: "breakfast" | "lunch" | "dinner" | "snack") => {
    if (scannedItems.length === 0) return;

    const dateStr = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
    const feedback = getHealthFeedback(scannedItems, profile, mergedFoodDb);

    const tempId = Math.random().toString(36).substring(2, 9);
    const newMealLocal: LoggedMeal = {
      id: tempId,
      date: dateStr,
      type,
      items: [...scannedItems],
      imageUrl: activePlateImage || undefined,
    };

    // Update state locally first (instant UI update)
    setLoggedMeals((prev) => [...prev, newMealLocal]);

    let uploadedUrl: string | null = null;

    if (activePlateImage && supabaseActive && userId) {
      try {
        const blob = await base64ToBlob(activePlateImage);
        const fileName = `${userId}/${Date.now()}.webp`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("meal-photos")
          .upload(fileName, blob, {
            contentType: "image/webp",
            cacheControl: "3600",
          });

        if (uploadError) throw uploadError;

        if (uploadData) {
          const { data: urlData } = supabase.storage
            .from("meal-photos")
            .getPublicUrl(fileName);
          uploadedUrl = urlData?.publicUrl || null;
        }
      } catch (e) {
        console.error("Failed to upload image to Supabase Storage:", e);
      }
    }

    if (supabaseActive && userId) {
      try {
        const { data, error } = await supabase
          .from("scans")
          .insert({
            user_id: userId,
            image_url: uploadedUrl,
            detected_items: scannedItems,
            health_feedback: feedback,
            meal_type: type,
            date: dateStr,
          })
          .select()
          .single();

        if (error) throw error;

        // Replace local temp ID and local base64 with real DB values
        if (data) {
          setLoggedMeals((prev) =>
            prev.map((m) =>
              m.id === tempId ? { ...m, id: data.id, imageUrl: data.image_url || m.imageUrl } : m
            )
          );
        }
      } catch (e) {
        console.error("Failed to log scan to Supabase:", e);
      }
    } else {
      // Sync fallback to localStorage
      try {
        const savedMeals = localStorage.getItem("nulens_logged_meals");
        const parsed = savedMeals ? JSON.parse(savedMeals) : [];
        localStorage.setItem(
          "nulens_logged_meals",
          JSON.stringify([...parsed, newMealLocal])
        );
      } catch (e) {
        console.error("LocalStorage save failed:", e);
      }
    }

    clearPlate();
  };

  const handleDeleteLoggedMeal = async (mealId: string) => {
    const mealToDelete = loggedMeals.find((m) => m.id === mealId);
    setLoggedMeals((prev) => prev.filter((m) => m.id !== mealId));

    if (supabaseActive && userId) {
      try {
        // Delete scan entry
        const { error } = await supabase.from("scans").delete().eq("id", mealId);
        if (error) throw error;

        // If it has an uploaded image URL, we can delete the file from Storage too
        if (mealToDelete?.imageUrl && mealToDelete.imageUrl.includes(userId)) {
          const pathParts = mealToDelete.imageUrl.split("meal-photos/");
          if (pathParts.length > 1) {
            const filePath = pathParts[1];
            await supabase.storage.from("meal-photos").remove([filePath]);
          }
        }
      } catch (e) {
        console.error("Failed to delete scan from Supabase:", e);
      }
    } else {
      // Fallback
      try {
        const savedMeals = localStorage.getItem("nulens_logged_meals");
        if (savedMeals) {
          const parsed = JSON.parse(savedMeals) as LoggedMeal[];
          localStorage.setItem(
            "nulens_logged_meals",
            JSON.stringify(parsed.filter((m) => m.id !== mealId))
          );
        }
      } catch (e) {
        console.error("LocalStorage delete failed:", e);
      }
    }
  };

  const handleCreateCustomFood = async (food: FoodItem) => {
    // Add to local state immediately
    setCustomFoods((prev) => ({
      ...prev,
      [food.id]: food,
    }));
    setDbFoods((prev) => ({
      ...prev,
      [food.id]: food,
    }));

    if (supabaseActive && userId) {
      try {
        const { error } = await supabase.from("food_nutrition").insert({
          id: food.id,
          item_name: food.name,
          bangla_name: food.banglaName,
          calories: food.calories,
          carbs: food.carbs,
          protein: food.protein,
          fat: food.fat,
          serving_size: food.servingSize,
          gi_index: food.glycemicIndex,
          category: food.category,
          description: food.description,
          user_id: userId,
        });
        if (error) throw error;
      } catch (e) {
        console.error("Failed to save custom food to Supabase:", e);
      }
    } else {
      // Fallback
      try {
        const savedCustom = localStorage.getItem("nulens_custom_foods");
        const parsed = savedCustom ? JSON.parse(savedCustom) : {};
        localStorage.setItem(
          "nulens_custom_foods",
          JSON.stringify({ ...parsed, [food.id]: food })
        );
      } catch (e) {
        console.error("LocalStorage custom food save failed:", e);
      }
    }
  };

  const handleOptimizePortions = (optimizedItems: ScannedItem[]) => {
    setScannedItems(optimizedItems);
  };

  // Resolve DB foods or fallback to static file if not synced yet/offline
  const mergedFoodDb =
    Object.keys(dbFoods).length > 0
      ? dbFoods
      : { ...BANGLADESHI_FOOD_DB, ...customFoods };

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
        userId,
        supabaseActive,
        activePlateImage,
        setActivePlateImage,
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
