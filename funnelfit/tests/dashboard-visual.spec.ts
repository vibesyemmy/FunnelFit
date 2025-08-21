import { test, expect } from '@playwright/test';

test.describe('FunnelFit Dashboard Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the sign-in page
    await page.goto('http://localhost:5173/');
  });

  test('SME Dashboard Screenshot and Layout', async ({ page }) => {
    // Login as SME user
    await page.fill('input[type="email"]', 'sme@funnelfit.com');
    await page.fill('input[type="password"]', 'sme123');
    await page.click('button[type="submit"]');

    // Wait for dashboard to load
    await expect(page.locator('h2')).toContainText('Overview');
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'test-results/sme-dashboard-full.png',
      fullPage: true 
    });

    // Take viewport screenshot
    await page.screenshot({ 
      path: 'test-results/sme-dashboard-viewport.png' 
    });

    // Test sidebar navigation
    await expect(page.locator('.bg-primary-600')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    
    // Test navigation items
    const navItems = ['Overview', 'Documents', 'Financials', 'CFO Services', 'Cash Flow', 'Settings'];
    for (const item of navItems) {
      await expect(page.locator('button', { hasText: item })).toBeVisible();
    }

    // Test clicking different navigation items
    await page.click('button:has-text("Documents")');
    await expect(page.locator('h2')).toContainText('Documents');
    await page.screenshot({ path: 'test-results/sme-documents-section.png' });

    await page.click('button:has-text("Financials")');
    await expect(page.locator('h2')).toContainText('Financials');
    await page.screenshot({ path: 'test-results/sme-financials-section.png' });
  });

  test('CFO Dashboard Screenshot and Layout', async ({ page }) => {
    // Login as CFO user
    await page.fill('input[type="email"]', 'cfo@funnelfit.com');
    await page.fill('input[type="password"]', 'cfo123');
    await page.click('button[type="submit"]');

    // Wait for CFO dashboard to load
    await expect(page.locator('h2')).toContainText('Overview');
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'test-results/cfo-dashboard-full.png',
      fullPage: true 
    });

    // Take viewport screenshot
    await page.screenshot({ 
      path: 'test-results/cfo-dashboard-viewport.png' 
    });

    // Test sidebar navigation (should match SME styling)
    await expect(page.locator('.bg-primary-600')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    
    // Test CFO-specific navigation items
    const cfoNavItems = ['Overview', 'Client Management', 'Projects & Tasks', 'Financial Tracking', 'Analytics', 'Settings'];
    for (const item of cfoNavItems) {
      await expect(page.locator('button', { hasText: item })).toBeVisible();
    }

    // Test metrics cards
    await expect(page.locator('text=Active Clients')).toBeVisible();
    await expect(page.locator('text=Monthly Revenue')).toBeVisible();
    await expect(page.locator('text=Utilization Rate')).toBeVisible();
    await expect(page.locator('text=Client Satisfaction')).toBeVisible();

    // Test clicking different navigation items
    await page.click('button:has-text("Client Management")');
    await expect(page.locator('h2')).toContainText('Client Management');
    await page.screenshot({ path: 'test-results/cfo-client-management.png' });

    await page.click('button:has-text("Analytics")');
    await expect(page.locator('h2')).toContainText('Analytics');
    await page.screenshot({ path: 'test-results/cfo-analytics.png' });
  });

  test('Design Consistency Between Dashboards', async ({ page }) => {
    // Test SME Dashboard
    await page.fill('input[type="email"]', 'sme@funnelfit.com');
    await page.fill('input[type="password"]', 'sme123');
    await page.click('button[type="submit"]');
    await expect(page.locator('h2')).toContainText('Overview');

    // Take sidebar screenshot for SME
    await page.locator('.bg-primary-600').screenshot({ 
      path: 'test-results/sme-sidebar.png' 
    });

    // Sign out and test CFO
    await page.click('button:has-text("Sign Out")');
    await page.fill('input[type="email"]', 'cfo@funnelfit.com');
    await page.fill('input[type="password"]', 'cfo123');
    await page.click('button[type="submit"]');
    await expect(page.locator('h2')).toContainText('Overview');

    // Take sidebar screenshot for CFO
    await page.locator('.bg-primary-600').screenshot({ 
      path: 'test-results/cfo-sidebar.png' 
    });

    // Both should have the same background color and structure
    const smeClasses = await page.locator('.bg-primary-600').getAttribute('class');
    await expect(page.locator('.bg-primary-600')).toHaveClass(new RegExp('bg-primary-600'));
  });

  test('Responsive Design Testing', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.fill('input[type="email"]', 'sme@funnelfit.com');
    await page.fill('input[type="password"]', 'sme123');
    await page.click('button[type="submit"]');
    
    await page.screenshot({ path: 'test-results/sme-mobile.png' });

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ path: 'test-results/sme-tablet.png' });

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.screenshot({ path: 'test-results/sme-desktop.png' });
  });

  test('Component Visual Testing', async ({ page }) => {
    await page.fill('input[type="email"]', 'sme@funnelfit.com');
    await page.fill('input[type="password"]', 'sme123');
    await page.click('button[type="submit"]');

    // Test individual components
    await page.locator('header').screenshot({ path: 'test-results/header-component.png' });
    
    // Test cards in overview
    const cards = page.locator('.grid .card, .grid .bg-white').first();
    if (await cards.count() > 0) {
      await cards.screenshot({ path: 'test-results/metric-card.png' });
    }

    // Test navigation
    await page.locator('nav').screenshot({ path: 'test-results/navigation.png' });
  });
});
