export interface FoodItem {
  id: string;
  name: string;
  banglaName: string;
  calories: number; // kcal per serving
  carbs: number; // grams per serving
  protein: number; // grams per serving
  fat: number; // grams per serving
  servingSize: string; // e.g., "1 cup (150g)", "1 piece (100g)"
  glycemicIndex: number; // 0 to 100
  category: 'staple' | 'protein' | 'vegetable' | 'snack' | 'sweet';
  description: string;
}

export const BANGLADESHI_FOOD_DB: Record<string, FoodItem> = {
  rice: {
    id: "rice",
    name: "Plain Rice (Sada Bhat)",
    banglaName: "সাদা ভাত",
    calories: 200,
    carbs: 45,
    protein: 4.2,
    fat: 0.4,
    servingSize: "1 cup cooked (150g)",
    glycemicIndex: 73, // High GI
    category: "staple",
    description: "Standard parboiled white rice, staple carbohydrate source of Bangladeshi cuisine."
  },
  roti: {
    id: "roti",
    name: "Atta Roti (Flatbread)",
    banglaName: "আটা রুটি",
    calories: 110,
    carbs: 22,
    protein: 3.5,
    fat: 0.5,
    servingSize: "1 piece (45g)",
    glycemicIndex: 62, // Medium GI
    category: "staple",
    description: "Whole wheat handmade flatbread, a healthier carbohydrate alternative."
  },
  dal: {
    id: "dal",
    name: "Masoor Dal (Red Lentil Curry)",
    banglaName: "মসুর ডাল",
    calories: 120,
    carbs: 18,
    protein: 8.0,
    fat: 2.5,
    servingSize: "1 medium bowl (150ml)",
    glycemicIndex: 25, // Low GI
    category: "vegetable",
    description: "Cooked red lentils tempered with onions, garlic, and spices. Rich in protein and dietary fiber."
  },
  ilish: {
    id: "ilish",
    name: "Shorshe Ilish (Mustard Hilsa)",
    banglaName: "সর্ষে ইলিশ",
    calories: 280,
    carbs: 3.0,
    protein: 22.0,
    fat: 20.0,
    servingSize: "1 piece with gravy (120g)",
    glycemicIndex: 5, // Negligible GI
    category: "protein",
    description: "Hilsa fish cooked in a sharp mustard paste gravy. High in omega-3 fatty acids and protein."
  },
  beef: {
    id: "beef",
    name: "Beef Bhuna (Spicy Beef)",
    banglaName: "গরুর মাংস ভুনা",
    calories: 320,
    carbs: 4.0,
    protein: 24.0,
    fat: 22.0,
    servingSize: "1 medium bowl (120g)",
    glycemicIndex: 0,
    category: "protein",
    description: "Slow-cooked beef in a dense spicy aromatic onion gravy. High protein but also high saturated fat."
  },
  chicken: {
    id: "chicken",
    name: "Chicken Curry (Murgir Jhol)",
    banglaName: "মুরগির ঝোল",
    calories: 210,
    carbs: 5.0,
    protein: 19.5,
    fat: 12.0,
    servingSize: "1 serving (150g)",
    glycemicIndex: 5,
    category: "protein",
    description: "Traditional light chicken curry cooked with potatoes and spices."
  },
  begun_bhaja: {
    id: "begun_bhaja",
    name: "Begun Bhaja (Fried Eggplant)",
    banglaName: "বেগুন ভাজা",
    calories: 140,
    carbs: 6.0,
    protein: 1.5,
    fat: 12.0,
    servingSize: "2 slices (90g)",
    glycemicIndex: 15, // Low GI
    category: "vegetable",
    description: "Eggplant slices shallow-fried in mustard oil with turmeric. Low carbs, but absorbs significant oil."
  },
  singara: {
    id: "singara",
    name: "Singara (Potato Pastry)",
    banglaName: "সিঙ্গারা",
    calories: 190,
    carbs: 26,
    protein: 3.0,
    fat: 8.5,
    servingSize: "1 piece (75g)",
    glycemicIndex: 70, // High GI
    category: "snack",
    description: "Fried pastry stuffed with spiced potato mash. High glycemic index and refined wheat content."
  },
  roshogolla: {
    id: "roshogolla",
    name: "Roshogolla (Sweet Syrup Ball)",
    banglaName: "রসগোল্লা",
    calories: 150,
    carbs: 32,
    protein: 3.5,
    fat: 1.2,
    servingSize: "1 piece (60g)",
    glycemicIndex: 82, // Extremely High GI
    category: "sweet",
    description: "Soft chhana cheese balls soaked in sugary cardamom syrup. Highly glycemic."
  },
  khichuri: {
    id: "khichuri",
    name: "Bhuna Khichuri (Spiced Rice & Lentils)",
    banglaName: "ভুনা খিচুড়ি",
    calories: 320,
    carbs: 55,
    protein: 9.5,
    fat: 8.0,
    servingSize: "1 plate (200g)",
    glycemicIndex: 55, // Medium GI
    category: "staple",
    description: "Yellow rice cooked with lentils, warm spices, and ghee. A comforting, fiber-rich staple."
  },
  luchi: {
    id: "luchi",
    name: "Luchi (Deep-fried Puffed Bread)",
    banglaName: "লুচি",
    calories: 210,
    carbs: 24,
    protein: 3.2,
    fat: 12.0,
    servingSize: "2 pieces (60g)",
    glycemicIndex: 75, // High GI
    category: "staple",
    description: "Deep-fried puffed flatbread made of refined flour. High calorie and glycemic load."
  },
  haleem: {
    id: "haleem",
    name: "Haleem (Spiced Lentil & Beef Stew)",
    banglaName: "হালিম",
    calories: 260,
    carbs: 22,
    protein: 18.0,
    fat: 11.0,
    servingSize: "1 bowl (180g)",
    glycemicIndex: 42, // Low-Medium GI
    category: "protein",
    description: "Slow-cooked stew of mixed lentils, barley, wheat, and beef or mutton. High in protein and fiber."
  },
  fuchka: {
    id: "fuchka",
    name: "Fuchka (Spiced Chickpea Street Snack)",
    banglaName: "ফুচকা",
    calories: 160,
    carbs: 24,
    protein: 2.8,
    fat: 6.0,
    servingSize: "5 pieces (75g)",
    glycemicIndex: 68, // Medium-High GI
    category: "snack",
    description: "Crispy hollow puris filled with spiced potato-chickpea mash, served with sour tamarind water."
  },
  aloo_bhorta: {
    id: "aloo_bhorta",
    name: "Aloo Bhorta (Mashed Potatoes)",
    banglaName: "আলু ভর্তা",
    calories: 90,
    carbs: 16,
    protein: 1.5,
    fat: 2.5,
    servingSize: "1/2 cup (80g)",
    glycemicIndex: 80, // High GI
    category: "vegetable",
    description: "Mashed potatoes seasoned with mustard oil, red chilies, onions, and coriander. High glycemic index."
  },
  lal_bhat: {
    id: "lal_bhat",
    name: "Lal Bhat (Red Rice)",
    banglaName: "লাল চালের ভাত",
    calories: 190,
    carbs: 40,
    protein: 4.8,
    fat: 0.6,
    servingSize: "1 cup cooked (150g)",
    glycemicIndex: 50, // Low-Medium GI
    category: "staple",
    description: "Traditional unpolished Bangladeshi red rice. High in fiber, low-GI alternative to Sada Bhat."
  },
  rui_mach: {
    id: "rui_mach",
    name: "Rui Macher Jhol (Rui Fish Curry)",
    banglaName: "রুই মাছের ঝোল",
    calories: 180,
    carbs: 3.5,
    protein: 18.5,
    fat: 10.0,
    servingSize: "1 piece with gravy (140g)",
    glycemicIndex: 5,
    category: "protein",
    description: "Rui (Rohu fish) cooked in a light cumin-onion gravy with potatoes. Great source of protein and healthy fats."
  },
  egg: {
    id: "egg",
    name: "Egg (Boiled/Poached)",
    banglaName: "ডিম (সিদ্ধ/পোচ)",
    calories: 75,
    carbs: 0.6,
    protein: 6.3,
    fat: 5.0,
    servingSize: "1 piece (50g)",
    glycemicIndex: 0,
    category: "protein",
    description: "Whole egg, great source of high-quality protein and essential nutrients."
  },
  lal_shak: {
    id: "lal_shak",
    name: "Lal Shak (Red Spinach)",
    banglaName: "লাল শাক",
    calories: 45,
    carbs: 4.0,
    protein: 2.5,
    fat: 2.0,
    servingSize: "1 serving (100g)",
    glycemicIndex: 15,
    category: "vegetable",
    description: "Red spinach sautéed with garlic, onions, and oil. Rich in iron, fiber, and vitamins."
  },
  biryani: {
    id: "biryani",
    name: "Kacchi Biryani / Tehari",
    banglaName: "কাচ্চি বিরিয়ানি / তেহারি",
    calories: 450,
    carbs: 60.0,
    protein: 18.0,
    fat: 15.0,
    servingSize: "1 plate (250g)",
    glycemicIndex: 65,
    category: "staple",
    description: "Spiced rice dish cooked with meat (beef or mutton) and potatoes in ghee/oil."
  },
  salad: {
    id: "salad",
    name: "Salad (Cucumber & Onion)",
    banglaName: "সালাদ",
    calories: 15,
    carbs: 3.0,
    protein: 0.8,
    fat: 0.1,
    servingSize: "1 bowl (100g)",
    glycemicIndex: 15,
    category: "vegetable",
    description: "Fresh cucumber, onion, and green chili mix. High fiber, low calorie."
  },
  cucumber: {
    id: "cucumber",
    name: "Shosha (Cucumber)",
    banglaName: "শসা",
    calories: 15,
    carbs: 3.6,
    protein: 0.7,
    fat: 0.1,
    servingSize: "1 medium (100g)",
    glycemicIndex: 15,
    category: "vegetable",
    description: "Fresh sliced cucumber. Extremely hydrating and low in calories."
  },
  carrot: {
    id: "carrot",
    name: "Carrot (Gajor)",
    banglaName: "গাজর",
    calories: 41,
    carbs: 9.6,
    protein: 0.9,
    fat: 0.2,
    servingSize: "1 medium (100g)",
    glycemicIndex: 35,
    category: "vegetable",
    description: "Sweet, crunchy orange carrots. High in beta-carotene and vitamin A."
  },
  tomato: {
    id: "tomato",
    name: "Tomato",
    banglaName: "টমেটো",
    calories: 18,
    carbs: 3.9,
    protein: 0.9,
    fat: 0.2,
    servingSize: "1 medium (100g)",
    glycemicIndex: 15,
    category: "vegetable",
    description: "Fresh red tomatoes. Rich in vitamin C and lycopene, an antioxidant."
  },
  watermelon: {
    id: "watermelon",
    name: "Watermelon (Tormuj)",
    banglaName: "তরমুজ",
    calories: 30,
    carbs: 8.0,
    protein: 0.6,
    fat: 0.2,
    servingSize: "1 cup (150g)",
    glycemicIndex: 72,
    category: "vegetable",
    description: "Fresh sweet watermelon, highly hydrating but high glycemic index."
  },
  juice: {
    id: "juice",
    name: "Fruit Juice",
    banglaName: "ফলের রস",
    calories: 120,
    carbs: 28.0,
    protein: 0.5,
    fat: 0.0,
    servingSize: "1 glass (250ml)",
    glycemicIndex: 65,
    category: "snack",
    description: "Sweet fruit juice. High in sugar, low in fiber."
  },
  beguni: {
    id: "beguni",
    name: "Beguni (Fried Eggplant in Batter)",
    banglaName: "বেগুনি",
    calories: 140,
    carbs: 12.0,
    protein: 2.0,
    fat: 10.0,
    servingSize: "2 pieces",
    glycemicIndex: 60,
    category: "snack",
    description: "Eggplant sliced thin and deep fried in besan batter."
  },
  alur_chop: {
    id: "alur_chop",
    name: "Alur Chop (Potato Snack)",
    banglaName: "আলুর চপ",
    calories: 160,
    carbs: 22.0,
    protein: 3.0,
    fat: 7.0,
    servingSize: "1 piece",
    glycemicIndex: 75,
    category: "snack",
    description: "Deep fried potato mash coated in batter."
  },
  peyaju: {
    id: "peyaju",
    name: "Peyaju (Onion Lentil Fritter)",
    banglaName: "পেঁয়াজু",
    calories: 110,
    carbs: 12.0,
    protein: 4.0,
    fat: 5.0,
    servingSize: "3 pieces",
    glycemicIndex: 45,
    category: "snack",
    description: "Crispy deep fried onion and lentil fritters."
  },
  chola: {
    id: "chola",
    name: "Chola Boot (Chickpeas)",
    banglaName: "ছোলা ভুনা",
    calories: 160,
    carbs: 22.0,
    protein: 8.0,
    fat: 4.0,
    servingSize: "1 small bowl",
    glycemicIndex: 35,
    category: "snack",
    description: "Spiced chickpeas cooked with onions and chilies. Great source of protein and fiber."
  }
};

export type UserProfileType = "diabetic" | "child" | "general";

export interface ProfileRules {
  calorieTarget: number;
  carbLimit: number; // grams
  proteinTarget: number; // grams
  fatLimit: number; // grams
  maxGI: number;
}

export const PROFILE_RECOMMENDATIONS: Record<UserProfileType, ProfileRules> = {
  diabetic: {
    calorieTarget: 1800,
    carbLimit: 180, // strict carb limit
    proteinTarget: 75,
    fatLimit: 55,
    maxGI: 55, // Low GI foods prioritized
  },
  child: {
    calorieTarget: 1600,
    carbLimit: 220,
    proteinTarget: 60, // High relative protein for muscle/growth
    fatLimit: 50,
    maxGI: 75,
  },
  general: {
    calorieTarget: 2200,
    carbLimit: 300,
    proteinTarget: 80,
    fatLimit: 70,
    maxGI: 80,
  }
};

export interface HealthFeedback {
  status: 'excellent' | 'warning' | 'danger';
  message: string;
  tips: string[];
}

export function getHealthFeedback(
  items: Array<{ foodId: string; quantity: number }>,
  profileType: UserProfileType,
  foodDb: Record<string, FoodItem> = BANGLADESHI_FOOD_DB
): HealthFeedback {
  let totalCalories = 0;
  let totalCarbs = 0;
  let totalProtein = 0;
  let highGICount = 0;
  let hasStaple = false;
  let hasProtein = false;
  let hasVegetable = false;

  items.forEach(item => {
    const food = foodDb[item.foodId];
    if (food) {
      totalCalories += food.calories * item.quantity;
      totalCarbs += food.carbs * item.quantity;
      totalProtein += food.protein * item.quantity;
      
      if (food.glycemicIndex >= 70) {
        highGICount += item.quantity;
      }
      
      if (food.category === 'staple') hasStaple = true;
      if (food.category === 'protein') hasProtein = true;
      if (food.category === 'vegetable') hasVegetable = true;
    }
  });

  const tips: string[] = [];
  let status: 'excellent' | 'warning' | 'danger' = 'excellent';
  let message = "Your plate shows a solid balance!";

  if (items.length === 0) {
    return {
      status: 'excellent',
      message: "Please scan a plate to receive dietary analysis.",
      tips: ["Start by snapping a photo of your meal."]
    };
  }

  // Profile-specific rules
  if (profileType === 'diabetic') {
    const limits = PROFILE_RECOMMENDATIONS.diabetic;
    
    // Check high GI foods (e.g. Sada Bhat, Sweets)
    if (highGICount > 0) {
      status = 'warning';
      message = "High Glycemic Load detected. Your blood sugar could spike.";
      tips.push("Reduce the portion of Plain Rice (Sada Bhat) or replace it with Lal Bhat (Red Rice) or Roti.");
    }
    
    if (totalCarbs > limits.carbLimit / 3) { // more than 1/3 of daily carbs in one meal
      status = 'danger';
      message = "Excessive carbohydrates on your plate for a diabetic profile.";
      tips.push("Cut back on starchy side dishes like potatoes or sweets.");
    }

    if (totalCalories > limits.calorieTarget * 0.4) {
      tips.push("This meal constitutes a large portion of your daily calorie allowance.");
    }

    // Encourage lentils/vegetables
    if (!hasVegetable) {
      tips.push("Add fiber-rich vegetables (like Shak or cooked veggies) to help slow down sugar absorption.");
    }
    
  } else if (profileType === 'child') {
    
    // Check protein content
    if (totalProtein < 15) {
      status = 'warning';
      message = "Needs more protein. Children require sufficient protein for growth.";
      tips.push("Add a piece of fish (like Ilish or Rui), chicken, eggs, or more Masoor Dal.");
    }

    // Check calorie concentration
    if (totalCalories < 300) {
      tips.push("This meal may be too light. Ensure the child gets energy-dense, nutrient-rich foods.");
    }

    // Check sweets / deep fried
    const sweetCount = items.filter(i => {
      const f = foodDb[i.foodId];
      return f && (f.category === 'sweet' || f.category === 'snack');
    }).length;

    if (sweetCount > 0) {
      tips.push("Limit sweet snacks (like Roshogolla) to avoid childhood dental issues and sugar crashes.");
    }

  } else {
    // General Profile
    if (totalCalories > 800) {
      status = 'warning';
      message = "High calorie meal. Monitor your portions to maintain energy balance.";
      tips.push("Reduce rice portion and increase light vegetable curries.");
    }

    if (!hasProtein) {
      tips.push("Consider adding a lean protein source (fish, poultry, or lentils) to keep you saturated longer.");
    }

    if (!hasVegetable) {
      tips.push("Include vegetables or lentils to achieve a well-rounded plate of micronutrients.");
    }
  }

  // General healthy plate suggestions
  if (hasStaple && hasProtein && hasVegetable) {
    if (status === 'excellent') {
      message = "Excellent plate balance! You have combined staples, proteins, and fiber perfectly.";
    }
    tips.unshift("Great job combining a protein, vegetable/dal, and grain!");
  } else if (!hasStaple) {
    tips.push("Ensure you have a healthy portion of complex carbohydrates for sustained energy.");
  }

  return { status, message, tips };
}

export function getOptimizedPlate(
  items: Array<{ foodId: string; quantity: number }>,
  profileType: UserProfileType,
  foodDb: Record<string, FoodItem>
): Array<{ foodId: string; quantity: number }> {
  const rules = PROFILE_RECOMMENDATIONS[profileType];
  let currentCarbs = 0;

  items.forEach((item) => {
    const food = foodDb[item.foodId];
    if (food) {
      currentCarbs += food.carbs * item.quantity;
    }
  });

  let newItems = items.map((item) => ({ ...item }));

  // 1. Carb correction (especially for diabetic, or general if exceeding limit/3)
  const singleMealCarbLimit = rules.carbLimit * 0.4; // 40% of daily carb limit
  if (currentCarbs > singleMealCarbLimit) {
    let stapleWeight = 0;
    newItems.forEach((item) => {
      const food = foodDb[item.foodId];
      if (food && (food.category === "staple" || food.category === "sweet" || food.category === "snack")) {
        stapleWeight += food.carbs * item.quantity;
      }
    });

    if (stapleWeight > 0) {
      const neededReduction = currentCarbs - singleMealCarbLimit;
      const reductionRatio = Math.max(0.3, (stapleWeight - neededReduction) / stapleWeight);

      newItems = newItems.map((item) => {
        const food = foodDb[item.foodId];
        if (food && (food.category === "staple" || food.category === "sweet" || food.category === "snack")) {
          const newQty = Math.max(0.5, Math.round(item.quantity * reductionRatio * 2) / 2);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    }
  }

  // 2. Protein correction (especially for child, or general if protein < target/3)
  const singleMealProteinTarget = rules.proteinTarget * 0.35; // 35% of daily protein target
  let updatedProtein = 0;
  newItems.forEach((item) => {
    const food = foodDb[item.foodId];
    if (food) updatedProtein += food.protein * item.quantity;
  });

  if (updatedProtein < singleMealProteinTarget) {
    let hasProteinSource = false;
    newItems = newItems.map((item) => {
      const food = foodDb[item.foodId];
      if (food && food.category === "protein") {
        hasProteinSource = true;
        // Increase protein item portion up to a max of 2.0
        const newQty = Math.min(2.0, item.quantity + 0.5);
        return { ...item, quantity: newQty };
      }
      return item;
    });

    // If no protein source exists, but dal is on the plate, increase dal portion
    if (!hasProteinSource) {
      newItems = newItems.map((item) => {
        if (item.foodId === "dal") {
          return { ...item, quantity: Math.min(2.0, item.quantity + 0.5) };
        }
        return item;
      });
    }
  }

  // 3. Calorie ceiling check
  const maxMealCalories = rules.calorieTarget * 0.45; // 45% of daily calorie allowance
  let updatedCal = 0;
  newItems.forEach((item) => {
    const food = foodDb[item.foodId];
    if (food) updatedCal += food.calories * item.quantity;
  });

  if (updatedCal > maxMealCalories) {
    const ratio = maxMealCalories / updatedCal;
    newItems = newItems.map((item) => {
      const newQty = Math.max(0.5, Math.round(item.quantity * ratio * 2) / 2);
      return { ...item, quantity: newQty };
    });
  }

  return newItems;
}
