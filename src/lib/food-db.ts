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
  profileType: UserProfileType
): HealthFeedback {
  let totalCalories = 0;
  let totalCarbs = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let highGICount = 0;
  let hasStaple = false;
  let hasProtein = false;
  let hasVegetable = false;

  items.forEach(item => {
    const food = BANGLADESHI_FOOD_DB[item.foodId];
    if (food) {
      totalCalories += food.calories * item.quantity;
      totalCarbs += food.carbs * item.quantity;
      totalProtein += food.protein * item.quantity;
      totalFat += food.fat * item.quantity;
      
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
      tips.push("Reduce the portion of Plain Rice (Sada Bhat) or replace it with Lal Bhat (Brown Rice) or Roti.");
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
    const targets = PROFILE_RECOMMENDATIONS.child;
    
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
      const f = BANGLADESHI_FOOD_DB[i.foodId];
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
