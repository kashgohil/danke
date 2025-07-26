import { expect, test } from '@playwright/test';

test.describe('Board Creation Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
  });

  test('should create a new board successfully', async ({ page }) => {
    // Click on create board button
    await page.click('text=Create Board');

    // Fill in the board creation form
    await page.fill('input[name="title"]', 'Test Appreciation Board');
    await page.fill('input[name="recipientName"]', 'John Doe');

    // Submit the form
    await page.click('button:has-text("Create Board")');

    // Should redirect to board management page
    await expect(page).toHaveURL(/\/boards\/.*\/manage/);

    // Should show board title and recipient
    await expect(page.locator('h1')).toContainText('Test Appreciation Board');
    await expect(page.locator('text=for John Doe')).toBeVisible();

    // Should show sharing links
    await expect(page.locator('text=View Link')).toBeVisible();
    await expect(page.locator('text=Post Link')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.click('text=Create Board');

    // Try to submit without filling fields
    await page.click('button:has-text("Create Board")');

    // Should show validation errors
    await expect(page.locator('text=Title is required')).toBeVisible();
    await expect(page.locator('text=Recipient name is required')).toBeVisible();
  });

  test('should require authentication for board creation', async ({ page }) => {
    // Mock unauthenticated state
    await page.route('/api/boards', (route) => {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, error: 'Unauthorized' }),
      });
    });

    await page.click('text=Create Board');
    await page.fill('input[name="title"]', 'Test Board');
    await page.fill('input[name="recipientName"]', 'Test Recipient');
    await page.click('button:has-text("Create Board")');

    // Should show authentication error
    await expect(page.locator('text=Unauthorized')).toBeVisible();
  });

  test('should handle server errors gracefully', async ({ page }) => {
    // Mock server error
    await page.route('/api/boards', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: 'Internal server error',
        }),
      });
    });

    await page.click('text=Create Board');
    await page.fill('input[name="title"]', 'Test Board');
    await page.fill('input[name="recipientName"]', 'Test Recipient');
    await page.click('button:has-text("Create Board")');

    // Should show error message
    await expect(page.locator('text=Internal server error')).toBeVisible();
  });
});
