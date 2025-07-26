import { expect, test } from '@playwright/test';

test.describe('Post Creation Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Mock board data
    await page.route('/api/boards/test-post-token', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            board: {
              id: 'test-board-id',
              title: 'Test Board',
              recipientName: 'John Doe',
              postToken: 'test-post-token',
            },
          },
        }),
      });
    });

    // Navigate to post creation page
    await page.goto('/boards/post/test-post-token');
  });

  test('should create a new post successfully', async ({ page }) => {
    // Mock successful post creation
    await page.route('/api/posts', (route) => {
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            id: 'test-post-id',
            content: { type: 'doc', content: [] },
            mediaUrls: [],
          },
        }),
      });
    });

    // Should show board title
    await expect(page.locator('h1')).toContainText('Test Board');
    await expect(page.locator('text=for John Doe')).toBeVisible();

    // Fill in the rich text editor
    await page
      .locator('[data-testid="editor-content"]')
      .fill('This is my appreciation message!');

    // Submit the post
    await page.click('button:has-text("Post Message")');

    // Should show success message
    await expect(
      page.locator('text=Message posted successfully')
    ).toBeVisible();

    // Should clear the form
    await expect(page.locator('[data-testid="editor-content"]')).toBeEmpty();
  });

  test('should upload media with post', async ({ page }) => {
    // Mock successful upload
    await page.route('/api/upload', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: { url: 'https://example.com/uploaded-image.jpg' },
        }),
      });
    });

    // Mock successful post creation with media
    await page.route('/api/posts', (route) => {
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            id: 'test-post-id',
            content: { type: 'doc', content: [] },
            mediaUrls: ['https://example.com/uploaded-image.jpg'],
          },
        }),
      });
    });

    // Upload a file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake image content'),
    });

    // Should show uploaded file
    await expect(page.locator('text=test-image.jpg')).toBeVisible();

    // Add some text content
    await page
      .locator('[data-testid="editor-content"]')
      .fill('Check out this image!');

    // Submit the post
    await page.click('button:has-text("Post Message")');

    // Should show success message
    await expect(
      page.locator('text=Message posted successfully')
    ).toBeVisible();
  });

  test('should prevent submission with empty content', async ({ page }) => {
    // Try to submit without content
    await page.click('button:has-text("Post Message")');

    // Should show validation error
    await expect(page.locator('text=Please add some content')).toBeVisible();
  });

  test('should handle upload errors', async ({ page }) => {
    // Mock upload error
    await page.route('/api/upload', (route) => {
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: 'File too large',
        }),
      });
    });

    // Try to upload a file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'large-file.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake large file content'),
    });

    // Should show error message
    await expect(page.locator('text=File too large')).toBeVisible();
  });

  test('should handle post creation errors', async ({ page }) => {
    // Mock post creation error
    await page.route('/api/posts', (route) => {
      route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: 'Failed to create post',
        }),
      });
    });

    // Add content and submit
    await page.locator('[data-testid="editor-content"]').fill('Test message');
    await page.click('button:has-text("Post Message")');

    // Should show error message
    await expect(page.locator('text=Failed to create post')).toBeVisible();
  });

  test('should show loading state during submission', async ({ page }) => {
    // Mock delayed response
    await page.route('/api/posts', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: { id: 'test-post-id' },
        }),
      });
    });

    // Add content and submit
    await page.locator('[data-testid="editor-content"]').fill('Test message');
    await page.click('button:has-text("Post Message")');

    // Should show loading state
    await expect(page.locator('text=Posting')).toBeVisible();
    await expect(
      page.locator('button:has-text("Post Message")')
    ).toBeDisabled();
  });
});
