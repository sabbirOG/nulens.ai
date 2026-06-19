-- ==========================================
-- NuLens.ai - Database Schema & Initial Seed
-- ==========================================

-- 1. Create Profiles Table (Linked to Supabase Auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    health_goal TEXT DEFAULT 'general' CHECK (health_goal IN ('general', 'diabetic', 'child')),
    weight NUMERIC,
    height NUMERIC,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Create Scans / Meal Logs Table
CREATE TABLE IF NOT EXISTS public.scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    image_url TEXT,
    detected_items JSONB NOT NULL, -- Array: [{ foodId: string, quantity: number }]
    health_feedback JSONB NOT NULL, -- Object: { status: string, message: string, tips: string[] }
    meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
    date DATE NOT NULL DEFAULT CURRENT_DATE, -- For daily tracker timeline sorting
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Create Food Nutrition Database Table
CREATE TABLE IF NOT EXISTS public.food_nutrition (
    id TEXT PRIMARY KEY, -- Food key matches foodId in App (e.g. 'rice', 'ilish')
    item_name TEXT NOT NULL,
    bangla_name TEXT NOT NULL,
    calories NUMERIC NOT NULL, -- kcal per serving
    carbs NUMERIC NOT NULL, -- grams per serving
    protein NUMERIC NOT NULL, -- grams per serving
    fat NUMERIC NOT NULL, -- grams per serving
    serving_size TEXT NOT NULL,
    gi_index INTEGER NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('staple', 'protein', 'vegetable', 'snack', 'sweet')),
    description TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- NULL for system defaults, UUID for user custom items
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_nutrition ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- Row Level Security (RLS) Policies
-- ==========================================

-- Profiles RLS Policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" 
    ON public.profiles FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = user_id);

-- Scans RLS Policies
DROP POLICY IF EXISTS "Users can view their own scans" ON public.scans;
CREATE POLICY "Users can view their own scans" 
    ON public.scans FOR SELECT 
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own scans" ON public.scans;
CREATE POLICY "Users can insert their own scans" 
    ON public.scans FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own scans" ON public.scans;
CREATE POLICY "Users can delete their own scans" 
    ON public.scans FOR DELETE 
    USING (auth.uid() = user_id);

-- Food Nutrition RLS Policies
DROP POLICY IF EXISTS "Anyone can view default or own custom foods" ON public.food_nutrition;
CREATE POLICY "Anyone can view default or own custom foods" 
    ON public.food_nutrition FOR SELECT 
    USING (user_id IS NULL OR auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own custom foods" ON public.food_nutrition;
CREATE POLICY "Users can insert their own custom foods" 
    ON public.food_nutrition FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own custom foods" ON public.food_nutrition;
CREATE POLICY "Users can update their own custom foods" 
    ON public.food_nutrition FOR UPDATE 
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own custom foods" ON public.food_nutrition;
CREATE POLICY "Users can delete their own custom foods" 
    ON public.food_nutrition FOR DELETE 
    USING (auth.uid() = user_id);

-- ==========================================
-- Trigger for updating profiles.updated_at
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ==========================================
-- Initial Seeding of Bangladeshi Food Database
-- ==========================================
INSERT INTO public.food_nutrition (id, item_name, bangla_name, calories, carbs, protein, fat, serving_size, gi_index, category, description, user_id)
VALUES
('rice', 'Plain Rice (Sada Bhat)', 'সাদা ভাত', 200, 45, 4.2, 0.4, '1 cup cooked (150g)', 73, 'staple', 'Standard parboiled white rice, staple carbohydrate source of Bangladeshi cuisine.', NULL),
('roti', 'Atta Roti (Flatbread)', 'আটা রুটি', 110, 22, 3.5, 0.5, '1 piece (45g)', 62, 'staple', 'Whole wheat handmade flatbread, a healthier carbohydrate alternative.', NULL),
('dal', 'Masoor Dal (Red Lentil Curry)', 'মসুর ডাল', 120, 18, 8.0, 2.5, '1 medium bowl (150ml)', 25, 'vegetable', 'Cooked red lentils tempered with onions, garlic, and spices. Rich in protein and dietary fiber.', NULL),
('ilish', 'Shorshe Ilish (Mustard Hilsa)', 'সর্ষে ইলিশ', 280, 3.0, 22.0, 20.0, '1 piece with gravy (120g)', 5, 'protein', 'Hilsa fish cooked in a sharp mustard paste gravy. High in omega-3 fatty acids and protein.', NULL),
('beef', 'Beef Bhuna (Spicy Beef)', 'গরুর মাংস ভুনা', 320, 4.0, 24.0, 22.0, '1 medium bowl (120g)', 0, 'protein', 'Slow-cooked beef in a dense spicy aromatic onion gravy. High protein but also high saturated fat.', NULL),
('chicken', 'Chicken Curry (Murgir Jhol)', 'মুরগির ঝোল', 210, 5.0, 19.5, 12.0, '1 serving (150g)', 5, 'protein', 'Traditional light chicken curry cooked with potatoes and spices.', NULL),
('begun_bhaja', 'Begun Bhaja (Fried Eggplant)', 'বেগুন ভাজা', 140, 6.0, 1.5, 12.0, '2 slices (90g)', 15, 'vegetable', 'Eggplant slices shallow-fried in mustard oil with turmeric. Low carbs, but absorbs significant oil.', NULL),
('singara', 'Singara (Potato Pastry)', 'সিঙ্গারা', 190, 26, 3.0, 8.5, '1 piece (75g)', 70, 'snack', 'Fried pastry stuffed with spiced potato mash. High glycemic index and refined wheat content.', NULL),
('roshogolla', 'Roshogolla (Sweet Syrup Ball)', 'রসগোল্লা', 150, 32, 3.5, 1.2, '1 piece (60g)', 82, 'sweet', 'Soft chhana cheese balls soaked in sugary cardamom syrup. Highly glycemic.', NULL),
('khichuri', 'Bhuna Khichuri (Spiced Rice & Lentils)', 'ভুনা খিচুড়ি', 320, 55, 9.5, 8.0, '1 plate (200g)', 55, 'staple', 'Yellow rice cooked with lentils, warm spices, and ghee. A comforting, fiber-rich staple.', NULL),
('luchi', 'Luchi (Deep-fried Puffed Bread)', 'লুচি', 210, 24, 3.2, 12.0, '2 pieces (60g)', 75, 'staple', 'Deep-fried puffed flatbread made of refined flour. High calorie and glycemic load.', NULL),
('haleem', 'Haleem (Spiced Lentil & Beef Stew)', 'হালিম', 260, 22, 18.0, 11.0, '1 bowl (180g)', 42, 'protein', 'Slow-cooked stew of mixed lentils, barley, wheat, and beef or mutton. High in protein and fiber.', NULL),
('fuchka', 'Fuchka (Spiced Chickpea Street Snack)', 'ফুচকা', 160, 24, 2.8, 6.0, '5 pieces (75g)', 68, 'snack', 'Crispy hollow puris filled with spiced potato-chickpea mash, served with sour tamarind water.', NULL),
('aloo_bhorta', 'Aloo Bhorta (Mashed Potatoes)', 'আলু ভর্তা', 90, 16, 1.5, 2.5, '1/2 cup (80g)', 80, 'vegetable', 'Mashed potatoes seasoned with mustard oil, red chilies, onions, and coriander. High glycemic index.', NULL),
('lal_bhat', 'Lal Bhat (Red Rice)', 'লাল চালের ভাত', 190, 40, 4.8, 0.6, '1 cup cooked (150g)', 50, 'staple', 'Traditional unpolished Bangladeshi red rice. High in fiber, low-GI alternative to Sada Bhat.', NULL),
('rui_mach', 'Rui Macher Jhol (Rui Fish Curry)', 'রুই মাছের ঝোল', 180, 3.5, 18.5, 10.0, '1 piece with gravy (140g)', 5, 'protein', 'Rui (Rohu fish) cooked in a light cumin-onion gravy with potatoes. Great source of protein and healthy fats.', NULL)
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- 4. Create Storage Bucket for Meal Photos
-- ==========================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('meal-photos', 'meal-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Enable Anonymous uploads & public reads for the bucket
DROP POLICY IF EXISTS "Public read access to meal photos" ON storage.objects;
CREATE POLICY "Public read access to meal photos"
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'meal-photos');

DROP POLICY IF EXISTS "Anonymous upload to meal-photos" ON storage.objects;
CREATE POLICY "Anonymous upload to meal-photos"
    ON storage.objects FOR INSERT 
    WITH CHECK (bucket_id = 'meal-photos');

