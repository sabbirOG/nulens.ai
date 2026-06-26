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
  },
  puffed_rice: {
    id: "puffed_rice",
    name: "Muri (Puffed Rice)",
    banglaName: "Muri (Puffed Rice)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Muri (Puffed Rice) detected by AI."
  },
  biriyani: {
    id: "biriyani",
    name: "Biryani (Rich Spiced Rice)",
    banglaName: "Biryani (Rich Spiced Rice)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Biryani (Rich Spiced Rice) detected by AI."
  },
  puri: {
    id: "puri",
    name: "Puri (Deep-fried Bread)",
    banglaName: "Puri (Deep-fried Bread)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Puri (Deep-fried Bread) detected by AI."
  },
  ruti: {
    id: "ruti",
    name: "Atta Roti (Flatbread)",
    banglaName: "Atta Roti (Flatbread)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Atta Roti (Flatbread) detected by AI."
  },
  bread: {
    id: "bread",
    name: "Atta Roti (Flatbread)",
    banglaName: "Atta Roti (Flatbread)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Atta Roti (Flatbread) detected by AI."
  },
  noodles: {
    id: "noodles",
    name: "Noodles",
    banglaName: "Noodles",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Noodles detected by AI."
  },
  kabab: {
    id: "kabab",
    name: "Kebab (Grilled Meat)",
    banglaName: "Kebab (Grilled Meat)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Kebab (Grilled Meat) detected by AI."
  },
  daal: {
    id: "daal",
    name: "Masoor Dal (Red Lentil Curry)",
    banglaName: "Masoor Dal (Red Lentil Curry)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Masoor Dal (Red Lentil Curry) detected by AI."
  },
  fish: {
    id: "fish",
    name: "Rui Macher Jhol (Rui Fish Curry)",
    banglaName: "Rui Macher Jhol (Rui Fish Curry)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Rui Macher Jhol (Rui Fish Curry) detected by AI."
  },
  egg_boiled: {
    id: "egg_boiled",
    name: "Boiled Egg",
    banglaName: "Boiled Egg",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Boiled Egg detected by AI."
  },
  egg_poached: {
    id: "egg_poached",
    name: "Poached Egg",
    banglaName: "Poached Egg",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Poached Egg detected by AI."
  },
  begun_vaji: {
    id: "begun_vaji",
    name: "Begun Bhaja (Fried Eggplant)",
    banglaName: "Begun Bhaja (Fried Eggplant)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Begun Bhaja (Fried Eggplant) detected by AI."
  },
  vorta: {
    id: "vorta",
    name: "Bhorta (Mashed Seasoned Side)",
    banglaName: "Bhorta (Mashed Seasoned Side)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Bhorta (Mashed Seasoned Side) detected by AI."
  },
  potato_mashed: {
    id: "potato_mashed",
    name: "Aloo Bhorta (Mashed Potatoes)",
    banglaName: "Aloo Bhorta (Mashed Potatoes)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Aloo Bhorta (Mashed Potatoes) detected by AI."
  },
  potato: {
    id: "potato",
    name: "Potato (Alu)",
    banglaName: "Potato (Alu)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Potato (Alu) detected by AI."
  },
  chop_alu: {
    id: "chop_alu",
    name: "Alur Chop (Potato Snack)",
    banglaName: "Alur Chop (Potato Snack)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Alur Chop (Potato Snack) detected by AI."
  },
  shak: {
    id: "shak",
    name: "Shak (Spinach/Greens)",
    banglaName: "Shak (Spinach/Greens)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Shak (Spinach/Greens) detected by AI."
  },
  vaji: {
    id: "vaji",
    name: "Vaji (Stir-fried Vegetables)",
    banglaName: "Vaji (Stir-fried Vegetables)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Vaji (Stir-fried Vegetables) detected by AI."
  },
  vegetable: {
    id: "vegetable",
    name: "Mixed Vegetables",
    banglaName: "Mixed Vegetables",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Mixed Vegetables detected by AI."
  },
  cabbage: {
    id: "cabbage",
    name: "Cabbage Vaji",
    banglaName: "Cabbage Vaji",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Cabbage Vaji detected by AI."
  },
  cauliflower: {
    id: "cauliflower",
    name: "Cauliflower (Fulkopi)",
    banglaName: "Cauliflower (Fulkopi)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Cauliflower (Fulkopi) detected by AI."
  },
  chichinga_vaji: {
    id: "chichinga_vaji",
    name: "Chichinga Vaji (Snake Gourd)",
    banglaName: "Chichinga Vaji (Snake Gourd)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Chichinga Vaji (Snake Gourd) detected by AI."
  },
  dundol: {
    id: "dundol",
    name: "Dundol (Sponge Gourd)",
    banglaName: "Dundol (Sponge Gourd)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Dundol (Sponge Gourd) detected by AI."
  },
  kochu: {
    id: "kochu",
    name: "Kochu (Taro Root)",
    banglaName: "Kochu (Taro Root)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Kochu (Taro Root) detected by AI."
  },
  korola_vaji: {
    id: "korola_vaji",
    name: "Korola Vaji (Bitter Gourd)",
    banglaName: "Korola Vaji (Bitter Gourd)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Korola Vaji (Bitter Gourd) detected by AI."
  },
  kumra_vaji: {
    id: "kumra_vaji",
    name: "Kumra Vaji (Sweet Pumpkin)",
    banglaName: "Kumra Vaji (Sweet Pumpkin)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Kumra Vaji (Sweet Pumpkin) detected by AI."
  },
  lau: {
    id: "lau",
    name: "Lau (Bottle Gourd)",
    banglaName: "Lau (Bottle Gourd)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Lau (Bottle Gourd) detected by AI."
  },
  okra: {
    id: "okra",
    name: "Dharosh (Okra)",
    banglaName: "Dharosh (Okra)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Dharosh (Okra) detected by AI."
  },
  potol: {
    id: "potol",
    name: "Potol (Pointed Gourd)",
    banglaName: "Potol (Pointed Gourd)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Potol (Pointed Gourd) detected by AI."
  },
  shim: {
    id: "shim",
    name: "Shim (Flat Beans)",
    banglaName: "Shim (Flat Beans)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Shim (Flat Beans) detected by AI."
  },
  green_pea: {
    id: "green_pea",
    name: "Green Peas",
    banglaName: "Green Peas",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Green Peas detected by AI."
  },
  piyaju: {
    id: "piyaju",
    name: "Peyaju (Onion Lentil Fritter)",
    banglaName: "Peyaju (Onion Lentil Fritter)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Peyaju (Onion Lentil Fritter) detected by AI."
  },
  roll: {
    id: "roll",
    name: "Spring Roll",
    banglaName: "Spring Roll",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Spring Roll detected by AI."
  },
  sweets: {
    id: "sweets",
    name: "Mishti (Sweets)",
    banglaName: "Mishti (Sweets)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "sweet",
    description: "Mishti (Sweets) detected by AI."
  },
  jilapi: {
    id: "jilapi",
    name: "Jilapi (Sweet Jalebi)",
    banglaName: "Jilapi (Sweet Jalebi)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "sweet",
    description: "Jilapi (Sweet Jalebi) detected by AI."
  },
  chomchom: {
    id: "chomchom",
    name: "Chomchom (Sweet Cham Cham)",
    banglaName: "Chomchom (Sweet Cham Cham)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "sweet",
    description: "Chomchom (Sweet Cham Cham) detected by AI."
  },
  payesh: {
    id: "payesh",
    name: "Payesh (Rice Pudding)",
    banglaName: "Payesh (Rice Pudding)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "sweet",
    description: "Payesh (Rice Pudding) detected by AI."
  },
  burinda: {
    id: "burinda",
    name: "Boondi Sweet",
    banglaName: "Boondi Sweet",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "sweet",
    description: "Boondi Sweet detected by AI."
  },
  apple: {
    id: "apple",
    name: "Apple",
    banglaName: "Apple",
    calories: 60,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "snack",
    description: "Apple detected by AI."
  },
  banana: {
    id: "banana",
    name: "Banana (Kola)",
    banglaName: "Banana (Kola)",
    calories: 60,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "snack",
    description: "Banana (Kola) detected by AI."
  },
  grapes: {
    id: "grapes",
    name: "Grapes (Angur)",
    banglaName: "Grapes (Angur)",
    calories: 60,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "snack",
    description: "Grapes (Angur) detected by AI."
  },
  guava: {
    id: "guava",
    name: "Guava (Peyara)",
    banglaName: "Guava (Peyara)",
    calories: 60,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "snack",
    description: "Guava (Peyara) detected by AI."
  },
  mango: {
    id: "mango",
    name: "Mango (Aam)",
    banglaName: "Mango (Aam)",
    calories: 60,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "snack",
    description: "Mango (Aam) detected by AI."
  },
  orange: {
    id: "orange",
    name: "Orange (Komola)",
    banglaName: "Orange (Komola)",
    calories: 60,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "snack",
    description: "Orange (Komola) detected by AI."
  },
  papaya: {
    id: "papaya",
    name: "Papaya (Pepe)",
    banglaName: "Papaya (Pepe)",
    calories: 60,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "snack",
    description: "Papaya (Pepe) detected by AI."
  },
  pineapple: {
    id: "pineapple",
    name: "Pineapple (Anarosh)",
    banglaName: "Pineapple (Anarosh)",
    calories: 60,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "snack",
    description: "Pineapple (Anarosh) detected by AI."
  },
  badam: {
    id: "badam",
    name: "Badam (Nuts)",
    banglaName: "Badam (Nuts)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Badam (Nuts) detected by AI."
  },
  dates: {
    id: "dates",
    name: "Khejur (Dates)",
    banglaName: "Khejur (Dates)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Khejur (Dates) detected by AI."
  },
  cha: {
    id: "cha",
    name: "Cha (Sweet Milk Tea)",
    banglaName: "Cha (Sweet Milk Tea)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "sweet",
    description: "Cha (Sweet Milk Tea) detected by AI."
  },
  milk: {
    id: "milk",
    name: "Milk",
    banglaName: "Milk",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Milk detected by AI."
  },
  achar: {
    id: "achar",
    name: "Achar (Pickle)",
    banglaName: "Achar (Pickle)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Achar (Pickle) detected by AI."
  },
  lemon: {
    id: "lemon",
    name: "Lemon (Lebo)",
    banglaName: "Lemon (Lebo)",
    calories: 40,
    carbs: 10,
    protein: 1.0,
    fat: 0.5,
    servingSize: "1 portion",
    glycemicIndex: 40,
    category: "vegetable",
    description: "Lemon (Lebo) detected by AI."
  },
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
