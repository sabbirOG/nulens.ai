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
        - button "Open menu" [ref=e8]:
          - img [ref=e9]
    - dialog [ref=e10]:
      - generic [ref=e11]:
        - generic [ref=e12]: Menu
        - button [ref=e13]:
          - img [ref=e14]
      - navigation [ref=e17]:
        - list [ref=e18]:
          - listitem [ref=e19]:
            - button [ref=e20]:
              - img [ref=e21]
              - generic [ref=e24]: Home
          - listitem [ref=e25]:
            - button [ref=e26]:
              - img [ref=e27]
              - generic [ref=e30]: Scan plate
          - listitem [ref=e31]:
            - button [ref=e32]:
              - img [ref=e33]
              - generic [ref=e38]: My plate
          - listitem [ref=e39]:
            - button [ref=e40]:
              - img [ref=e41]
              - generic [ref=e43]: Health profile
          - listitem [ref=e44]:
            - button [ref=e45]:
              - img [ref=e46]
              - generic [ref=e48]: Add item manually
        - generic [ref=e49]:
          - button [ref=e50]:
            - img [ref=e51]
            - generic [ref=e53]: Privacy
          - button [ref=e54]:
            - img [ref=e55]
            - generic [ref=e58]: Terms
      - paragraph [ref=e60]: © 2026 NuLens.ai
    - main [ref=e61]:
      - generic [ref=e62]:
        - generic [ref=e63]:
          - generic [ref=e64]:
            - heading "Meal analysis" [level=1] [ref=e65]
            - paragraph [ref=e66]: Tailored insights based on your selected profile.
          - button "Clear plate" [ref=e67] [cursor=pointer]:
            - img [ref=e68]
            - text: Clear plate
        - generic [ref=e71]:
          - generic [ref=e72]:
            - heading "Nutrition summary" [level=2] [ref=e73]
            - generic [ref=e74]: General
          - generic [ref=e75]:
            - generic [ref=e76]:
              - img [ref=e77]
              - generic [ref=e80]:
                - img [ref=e81]
                - generic [ref=e83]: "700"
                - generic [ref=e84]: kcal
            - generic [ref=e85]:
              - generic [ref=e87]:
                - generic [ref=e88]:
                  - img [ref=e89]
                  - text: Carbs
                - generic [ref=e98]: 89g / 300g
              - generic [ref=e102]:
                - generic [ref=e103]:
                  - img [ref=e104]
                  - text: Protein
                - generic [ref=e106]: 36g / 80g
              - generic [ref=e110]:
                - generic [ref=e111]:
                  - img [ref=e112]
                  - text: Fat
                - generic [ref=e115]: 23g / 70g
        - generic [ref=e118]:
          - generic [ref=e120]:
            - img [ref=e121]
            - generic [ref=e124]:
              - paragraph [ref=e125]: Excellent plate balance! You have combined staples, proteins, and fiber perfectly.
              - list [ref=e126]:
                - listitem [ref=e127]: • Great job combining a protein, vegetable/dal, and grain!
          - generic [ref=e128]:
            - heading "Your plate (3 items)" [level=2] [ref=e129]
            - generic [ref=e130]:
              - generic [ref=e131]:
                - generic [ref=e132]:
                  - paragraph [ref=e133]: Plain Rice (Sada Bhat)
                  - paragraph [ref=e134]:
                    - text: সাদা ভাত
                    - generic [ref=e135]: GI High 73
                - generic [ref=e136]:
                  - generic [ref=e137]:
                    - button "Decrease portion" [ref=e138] [cursor=pointer]:
                      - img [ref=e139]
                    - generic [ref=e140]: 1.5x
                    - button "Increase portion" [ref=e141] [cursor=pointer]:
                      - img [ref=e142]
                  - button "Remove Plain Rice (Sada Bhat)" [ref=e143] [cursor=pointer]:
                    - img [ref=e144]
              - generic [ref=e147]:
                - generic [ref=e148]:
                  - paragraph [ref=e149]: Masoor Dal (Red Lentil Curry)
                  - paragraph [ref=e150]:
                    - text: মসুর ডাল
                    - generic [ref=e151]: GI Low 25
                - generic [ref=e152]:
                  - generic [ref=e153]:
                    - button "Decrease portion" [ref=e154] [cursor=pointer]:
                      - img [ref=e155]
                    - generic [ref=e156]: 1x
                    - button "Increase portion" [ref=e157] [cursor=pointer]:
                      - img [ref=e158]
                  - button "Remove Masoor Dal (Red Lentil Curry)" [ref=e159] [cursor=pointer]:
                    - img [ref=e160]
              - generic [ref=e163]:
                - generic [ref=e164]:
                  - paragraph [ref=e165]: Shorshe Ilish (Mustard Hilsa)
                  - paragraph [ref=e166]:
                    - text: সর্ষে ইলিশ
                    - generic [ref=e167]: GI Low 5
                - generic [ref=e168]:
                  - generic [ref=e169]:
                    - button "Decrease portion" [ref=e170] [cursor=pointer]:
                      - img [ref=e171]
                    - generic [ref=e172]: 1x
                    - button "Increase portion" [ref=e173] [cursor=pointer]:
                      - img [ref=e174]
                  - button "Remove Shorshe Ilish (Mustard Hilsa)" [ref=e175] [cursor=pointer]:
                    - img [ref=e176]
        - generic [ref=e179]:
          - heading "Log to Daily Tracker" [level=2] [ref=e180]
          - paragraph [ref=e181]: Add this plate's total macros and calories to your daily intake history.
          - generic [ref=e182]:
            - button "🍳 Breakfast" [ref=e183] [cursor=pointer]:
              - generic [ref=e184]: 🍳
              - generic [ref=e185]: Breakfast
            - button "🍲 Lunch" [ref=e186] [cursor=pointer]:
              - generic [ref=e187]: 🍲
              - generic [ref=e188]: Lunch
            - button "🍛 Dinner" [ref=e189] [cursor=pointer]:
              - generic [ref=e190]: 🍛
              - generic [ref=e191]: Dinner
            - button "☕ Snack" [ref=e192] [cursor=pointer]:
              - generic [ref=e193]: ☕
              - generic [ref=e194]: Snack
        - generic [ref=e195]:
          - generic [ref=e196]:
            - heading "Add food manually" [level=2] [ref=e197]
            - button "Close" [ref=e198] [cursor=pointer]
          - generic [ref=e199]:
            - combobox [ref=e200]:
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
            - button "Add item" [ref=e201] [cursor=pointer]:
              - img [ref=e202]
              - text: Add item
          - button "Can't find your food? Create custom item" [ref=e205] [cursor=pointer]
    - navigation "Main navigation" [ref=e206]:
      - generic [ref=e207]:
        - link "Home" [ref=e208] [cursor=pointer]:
          - /url: /
          - img [ref=e209]
          - generic [ref=e212]: Home
        - link "Scan" [ref=e213] [cursor=pointer]:
          - /url: /scan
          - img [ref=e214]
          - generic [ref=e217]: Scan
        - link "Plate" [ref=e218] [cursor=pointer]:
          - /url: /results
          - img [ref=e219]
          - generic [ref=e224]: Plate
        - link "Profile" [ref=e225] [cursor=pointer]:
          - /url: /profile
          - img [ref=e226]
          - generic [ref=e228]: Profile
  - button "Open Next.js Dev Tools" [ref=e234] [cursor=pointer]:
    - img [ref=e235]
  - alert [ref=e238]
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