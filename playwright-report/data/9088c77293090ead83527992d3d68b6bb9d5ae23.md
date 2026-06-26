# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> NuLens.ai E2E flows >> User can navigate from home to scan and see manual add
- Location: tests\e2e\app.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.selectOption: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('select')
    - locator resolved to <select class="flex-1 bg-surface border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:outline-none focus:border-accent">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    51 × waiting for element to be visible and enabled
       - did not find some options
     - retrying select option action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - link "NuLens.ai Logo NuLens.ai" [ref=e5] [cursor=pointer]:
          - /url: /
          - img "NuLens.ai Logo" [ref=e6]
          - generic [ref=e7]: NuLens.ai
        - navigation "Desktop navigation" [ref=e8]:
          - link "Home" [ref=e9] [cursor=pointer]:
            - /url: /
          - link "Scan" [ref=e10] [cursor=pointer]:
            - /url: /scan
          - link "Plate" [ref=e11] [cursor=pointer]:
            - /url: /results
          - link "Profile" [ref=e12] [cursor=pointer]:
            - /url: /profile
    - main [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e15]:
          - generic [ref=e16]:
            - heading "Meal analysis" [level=1] [ref=e17]
            - paragraph [ref=e18]: Tailored insights based on your selected profile.
          - button "Clear plate" [ref=e19] [cursor=pointer]:
            - img [ref=e20]
            - text: Clear plate
        - generic [ref=e23]:
          - generic [ref=e24]:
            - heading "Nutrition summary" [level=2] [ref=e25]
            - generic [ref=e26]: General
          - generic [ref=e27]:
            - generic [ref=e28]:
              - img [ref=e29]
              - generic [ref=e32]:
                - img [ref=e33]
                - generic [ref=e35]: "700"
                - generic [ref=e36]: kcal
            - generic [ref=e37]:
              - generic [ref=e39]:
                - generic [ref=e40]:
                  - img [ref=e41]
                  - text: Carbs
                - generic [ref=e50]: 89g / 300g
              - generic [ref=e54]:
                - generic [ref=e55]:
                  - img [ref=e56]
                  - text: Protein
                - generic [ref=e58]: 36g / 80g
              - generic [ref=e62]:
                - generic [ref=e63]:
                  - img [ref=e64]
                  - text: Fat
                - generic [ref=e67]: 23g / 70g
        - generic [ref=e70]:
          - generic [ref=e72]:
            - img [ref=e73]
            - generic [ref=e76]:
              - paragraph [ref=e77]: Excellent plate balance! You have combined staples, proteins, and fiber perfectly.
              - list [ref=e78]:
                - listitem [ref=e79]: • Great job combining a protein, vegetable/dal, and grain!
          - generic [ref=e80]:
            - heading "Your plate (3 items)" [level=2] [ref=e81]
            - generic [ref=e82]:
              - generic [ref=e83]:
                - generic [ref=e84]:
                  - paragraph [ref=e85]: Plain Rice (Sada Bhat)
                  - paragraph [ref=e86]:
                    - text: সাদা ভাত
                    - generic [ref=e87]: GI High 73
                - generic [ref=e88]:
                  - generic [ref=e89]:
                    - button "Decrease portion" [ref=e90] [cursor=pointer]:
                      - img [ref=e91]
                    - generic [ref=e92]: 1.5x
                    - button "Increase portion" [ref=e93] [cursor=pointer]:
                      - img [ref=e94]
                  - button "Remove Plain Rice (Sada Bhat)" [ref=e95] [cursor=pointer]:
                    - img [ref=e96]
              - generic [ref=e99]:
                - generic [ref=e100]:
                  - paragraph [ref=e101]: Masoor Dal (Red Lentil Curry)
                  - paragraph [ref=e102]:
                    - text: মসুর ডাল
                    - generic [ref=e103]: GI Low 25
                - generic [ref=e104]:
                  - generic [ref=e105]:
                    - button "Decrease portion" [ref=e106] [cursor=pointer]:
                      - img [ref=e107]
                    - generic [ref=e108]: 1x
                    - button "Increase portion" [ref=e109] [cursor=pointer]:
                      - img [ref=e110]
                  - button "Remove Masoor Dal (Red Lentil Curry)" [ref=e111] [cursor=pointer]:
                    - img [ref=e112]
              - generic [ref=e115]:
                - generic [ref=e116]:
                  - paragraph [ref=e117]: Shorshe Ilish (Mustard Hilsa)
                  - paragraph [ref=e118]:
                    - text: সর্ষে ইলিশ
                    - generic [ref=e119]: GI Low 5
                - generic [ref=e120]:
                  - generic [ref=e121]:
                    - button "Decrease portion" [ref=e122] [cursor=pointer]:
                      - img [ref=e123]
                    - generic [ref=e124]: 1x
                    - button "Increase portion" [ref=e125] [cursor=pointer]:
                      - img [ref=e126]
                  - button "Remove Shorshe Ilish (Mustard Hilsa)" [ref=e127] [cursor=pointer]:
                    - img [ref=e128]
        - generic [ref=e131]:
          - heading "Log to Daily Tracker" [level=2] [ref=e132]
          - paragraph [ref=e133]: Add this plate's total macros and calories to your daily intake history.
          - generic [ref=e134]:
            - button "🍳 Breakfast" [ref=e135] [cursor=pointer]:
              - generic [ref=e136]: 🍳
              - generic [ref=e137]: Breakfast
            - button "🍲 Lunch" [ref=e138] [cursor=pointer]:
              - generic [ref=e139]: 🍲
              - generic [ref=e140]: Lunch
            - button "🍛 Dinner" [ref=e141] [cursor=pointer]:
              - generic [ref=e142]: 🍛
              - generic [ref=e143]: Dinner
            - button "☕ Snack" [ref=e144] [cursor=pointer]:
              - generic [ref=e145]: ☕
              - generic [ref=e146]: Snack
        - generic [ref=e147]:
          - generic [ref=e148]:
            - heading "Add food manually" [level=2] [ref=e149]
            - button "Close" [ref=e150] [cursor=pointer]
          - generic [ref=e151]:
            - combobox [ref=e152]:
              - option "Plain Rice (Sada Bhat) (সাদা ভাত)" [selected]
              - option "Atta Roti (Flatbread) (আটা রুটি)"
              - option "Masoor Dal (Red Lentil Curry) (মসুর ডাল)"
              - option "Shorshe Ilish (Mustard Hilsa) (সর্ষে ইলিশ)"
              - option "Beef Bhuna (Spicy Beef) (গরুর মাংস ভুনা)"
              - option "Chicken Curry (Murgir Jhol) (মুরগির ঝোল)"
              - option "Begun Bhaja (Fried Eggplant) (বেগুন ভাজা)"
              - option "Singara (Potato Pastry) (সিঙ্গারা)"
              - option "Roshogolla (Sweet Syrup Ball) (রসগোল্লা)"
              - option "Bhuna Khichuri (Spiced Rice & Lentils) (ভুনা খিচুড়ি)"
              - option "Luchi (Deep-fried Puffed Bread) (লুচি)"
              - option "Haleem (Spiced Lentil & Beef Stew) (হালিম)"
              - option "Fuchka (Spiced Chickpea Street Snack) (ফুচকা)"
              - option "Aloo Bhorta (Mashed Potatoes) (আলু ভর্তা)"
              - option "Lal Bhat (Red Rice) (লাল চালের ভাত)"
              - option "Rui Macher Jhol (Rui Fish Curry) (রুই মাছের ঝোল)"
              - option "Egg (Boiled/Poached) (ডিম (সিদ্ধ/পোচ))"
              - option "Lal Shak (Red Spinach) (লাল শাক)"
              - option "Kacchi Biryani / Tehari (কাচ্চি বিরিয়ানি / তেহারি)"
              - option "Salad (Cucumber & Onion) (সালাদ)"
              - option "Shosha (Cucumber) (শসা)"
              - option "Carrot (Gajor) (গাজর)"
              - option "Tomato (টমেটো)"
              - option "Watermelon (Tormuj) (তরমুজ)"
              - option "Fruit Juice (ফলের রস)"
              - option "Beguni (Fried Eggplant in Batter) (বেগুনি)"
              - option "Alur Chop (Potato Snack) (আলুর চপ)"
              - option "Peyaju (Onion Lentil Fritter) (পেঁয়াজু)"
              - option "Chola Boot (Chickpeas) (ছোলা ভুনা)"
            - button "Add item" [ref=e153] [cursor=pointer]:
              - img [ref=e154]
              - text: Add item
          - button "Can't find your food? Create custom item" [ref=e157] [cursor=pointer]
    - contentinfo [ref=e158]:
      - generic [ref=e159]: © 2026 NuLens.ai
  - button "Open Next.js Dev Tools" [ref=e165] [cursor=pointer]:
    - img [ref=e166]
  - alert [ref=e169]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('NuLens.ai E2E flows', () => {
  4  |   test('User can navigate from home to scan and see manual add', async ({ page }) => {
  5  |     // Navigate to Home
  6  |     await page.goto('/');
  7  |     await expect(page).toHaveTitle(/NuLens.ai/);
  8  |     
  9  |     // Click "Scan Meal" button
  10 |     await page.click('text=Scan a meal');
  11 |     
  12 |     // We should be on /scan
  13 |     await expect(page).toHaveURL(/\/scan/);
  14 |     
  15 |     // Wait for camera card to render
  16 |     const cameraCard = page.locator('#scan');
  17 |     await expect(cameraCard).toBeVisible();
  18 | 
  19 |     // Since we don't have camera perms in CI, click the "Try a sample plate instead"
  20 |     await page.click('text=Try a sample plate instead');
  21 |     
  22 |     // Click the first preset
  23 |     await page.click('button:has-text("Hilsa Meal")');
  24 |     
  25 |     // The scan overlay should trigger
  26 |     await expect(page.locator('text=Initializing AI model layers...')).toBeVisible();
  27 | 
  28 |     // Eventually it should navigate to results after scanning
  29 |     // We test this by waiting for the result card or Analyze button
  30 |     const analyzeBtn = page.locator('button:has-text("Analyze Plate & View Suggestions")');
  31 |     await expect(analyzeBtn).toBeVisible({ timeout: 10000 });
  32 |     
  33 |     await analyzeBtn.click();
  34 |     
  35 |     // Now we are on results, we should see the Hilsa meal items
  36 |     await expect(page).toHaveURL(/\/results/);
  37 |     await expect(page.locator('text=Shorshe Ilish (Mustard Hilsa)')).toBeVisible();
  38 |     await expect(page.locator('text=Plain Rice (Sada Bhat)')).toBeVisible();
  39 |     
  40 |     // We can interact with "Add manually"
  41 |     await page.click('button:has-text("Add another item manually")');
  42 |     const manualAddCard = page.locator('#manual-add');
  43 |     await expect(manualAddCard).toBeVisible();
  44 |     
  45 |     // Select something else like Egg
> 46 |     await page.selectOption('select', { label: 'Egg (Boiled/Poached)' });
     |                ^ Error: page.selectOption: Test timeout of 30000ms exceeded.
  47 |     await page.click('button:has-text("Add item")');
  48 |     
  49 |     // Expect the egg to be visible in the list now
  50 |     await expect(page.locator('h3:has-text("Egg (Boiled/Poached)")')).toBeVisible();
  51 |     
  52 |     // We can clear the plate
  53 |     await page.click('button:has-text("Clear plate")');
  54 |     
  55 |     // Verify it says "Your plate is empty"
  56 |     await expect(page.locator('text=Your plate is empty')).toBeVisible();
  57 |   });
  58 | });
  59 | 
```