import { test, expect } from '@playwright/test';

test.describe('NuLens.ai E2E flows', () => {
  test('User can navigate from home to scan and see manual add', async ({ page }) => {
    // Navigate to Home
    await page.goto('/');
    await expect(page).toHaveTitle(/NuLens.ai/);
    
    // Click "Scan Meal" button
    await page.click('text=Scan a meal');
    
    // We should be on /scan
    await expect(page).toHaveURL(/\/scan/);
    
    // Wait for camera card to render
    const cameraCard = page.locator('#scan');
    await expect(cameraCard).toBeVisible();

    // Since we don't have camera perms in CI, click the "Try a sample plate instead"
    await page.click('text=Try a sample plate instead');
    
    // Click the first preset
    await page.click('button:has-text("Hilsa Meal")');
    
    // The scan overlay should trigger
    await expect(page.locator('text=Initializing AI model layers...')).toBeVisible();

    // Eventually it should navigate to results after scanning
    // We test this by waiting for the result card or Analyze button
    const analyzeBtn = page.locator('button:has-text("Analyze Plate & View Suggestions")');
    await expect(analyzeBtn).toBeVisible({ timeout: 10000 });
    
    await analyzeBtn.click();
    
    // Now we are on results, we should see the Hilsa meal items
    await expect(page).toHaveURL(/\/results/);
    await expect(page.locator('text=Shorshe Ilish (Mustard Hilsa)')).toBeVisible();
    await expect(page.locator('text=Plain Rice (Sada Bhat)')).toBeVisible();
    
    // We can interact with "Add manually"
    await page.click('button:has-text("Add another item manually")');
    const manualAddCard = page.locator('#manual-add');
    await expect(manualAddCard).toBeVisible();
    
    // Select something else like Roti
    await page.locator('select').nth(1).selectOption({ label: 'Atta Roti (Flatbread)' });
    await page.click('button:has-text("Add item")');
    
    // Expect the roti to be visible in the list now
    await expect(page.locator('h3:has-text("Atta Roti (Flatbread)")')).toBeVisible();
    
    // We can clear the plate
    await page.click('button:has-text("Clear plate")');
    
    // Verify it says "Your plate is empty"
    await expect(page.locator('text=Your plate is empty')).toBeVisible();
  });
});
