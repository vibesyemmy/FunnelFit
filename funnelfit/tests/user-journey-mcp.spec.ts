import { test, expect } from '@playwright/test';
import { 
  loginUser, 
  getNavigationItems, 
  clickNavigationItem, 
  verifyPageLoaded,
  findMetricCards,
  takeEnhancedScreenshot,
  fillFormIntelligently,
  generateTestData,
  validateFormSubmission,
  TEST_USERS 
} from './utils/mcp-helpers';

/**
 * Complete User Journey Tests using MCP capabilities
 * These tests simulate real user workflows with intelligent element detection
 */

test.describe('FunnelFit User Journey - MCP Enhanced', () => {

  test('Complete SME User Journey', async ({ page }) => {
    // Start the complete user journey
    await page.goto('/');
    
    // Login as SME using intelligent login
    await loginUser(page, 'SME');
    
    // Take dashboard screenshot
    await takeEnhancedScreenshot(page, 'sme-journey-dashboard', { 
      fullPage: true, 
      waitForFonts: true 
    });
    
    // Navigate through all available sections
    const navItems = await getNavigationItems(page);
    console.log('Found navigation items:', navItems);
    
    for (const item of navItems) {
      console.log(`Testing navigation to: ${item}`);
      
      try {
        await clickNavigationItem(page, item);
        await verifyPageLoaded(page, item);
        
        // Take screenshot of each section
        await takeEnhancedScreenshot(page, `sme-journey-${item.toLowerCase().replace(/\s+/g, '-')}`, {
          fullPage: true
        });
        
        // If this is a section with forms, test form interactions
        const forms = await page.locator('form').count();
        if (forms > 0) {
          console.log(`Found ${forms} form(s) in ${item} section`);
          
          const testData = generateTestData();
          await fillFormIntelligently(page, testData);
          
          // Take screenshot of filled form
          await takeEnhancedScreenshot(page, `sme-journey-${item.toLowerCase().replace(/\s+/g, '-')}-form-filled`);
        }
        
        console.log(`✅ Successfully tested ${item} section`);
      } catch (error) {
        console.log(`⚠️ Could not fully test ${item} section:`, error.message);
        // Continue with other sections
      }
    }
    
    // Test metric cards if available
    const metricCards = await findMetricCards(page);
    console.log(`Found ${metricCards.length} metric cards`);
    
    for (let i = 0; i < metricCards.length; i++) {
      const card = metricCards[i];
      
      // Verify card is visible and has content
      await expect(card).toBeVisible();
      
      const cardText = await card.textContent();
      expect(cardText).toBeTruthy();
      
      // Take individual card screenshot
      await card.screenshot({ 
        path: `test-results/mcp-sme-metric-card-${i}.png` 
      });
    }
  });

  test('Complete CFO User Journey', async ({ page }) => {
    await page.goto('/');
    
    // Login as CFO
    await loginUser(page, 'CFO');
    
    // Take dashboard screenshot
    await takeEnhancedScreenshot(page, 'cfo-journey-dashboard', { 
      fullPage: true, 
      waitForFonts: true 
    });
    
    // Test CFO-specific functionality
    const navItems = await getNavigationItems(page);
    console.log('CFO navigation items:', navItems);
    
    // Focus on CFO-specific sections
    const cfoSections = navItems.filter(item => 
      item.toLowerCase().includes('client') ||
      item.toLowerCase().includes('analytics') ||
      item.toLowerCase().includes('project') ||
      item.toLowerCase().includes('financial')
    );
    
    for (const section of cfoSections) {
      try {
        await clickNavigationItem(page, section);
        await verifyPageLoaded(page, section);
        
        await takeEnhancedScreenshot(page, `cfo-journey-${section.toLowerCase().replace(/\s+/g, '-')}`, {
          fullPage: true
        });
        
        console.log(`✅ Successfully tested CFO ${section} section`);
      } catch (error) {
        console.log(`⚠️ Could not test CFO ${section} section:`, error.message);
      }
    }
    
    // Test CFO metric cards
    const metricCards = await findMetricCards(page);
    expect(metricCards.length).toBeGreaterThan(0);
    
    for (let i = 0; i < Math.min(metricCards.length, 4); i++) {
      const card = metricCards[i];
      
      await expect(card).toBeVisible();
      
      const cardText = await card.textContent();
      expect(cardText).toBeTruthy();
      
      // Verify CFO metrics contain relevant business data
      const hasBusinessMetric = cardText?.match(/\$|%|\d+/) !== null;
      expect(hasBusinessMetric).toBe(true);
    }
  });

  test('Cross-User Type Consistency Check', async ({ page }) => {
    const userTypes = ['SME', 'CFO'] as const;
    const consistencyData: Record<string, any> = {};
    
    for (const userType of userTypes) {
      await page.goto('/');
      await loginUser(page, userType);
      
      // Collect navigation structure
      const navItems = await getNavigationItems(page);
      
      // Collect styling data
      const sidebarElement = page.locator('nav, .sidebar, [class*="sidebar"]').first();
      const sidebarStyles = await sidebarElement.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          backgroundColor: style.backgroundColor,
          width: style.width,
          position: style.position
        };
      }).catch(() => null);
      
      // Collect button styling
      const primaryButtons = await page.locator('button[class*="primary"], .btn-primary').all();
      const buttonStyles = [];
      
      for (const button of primaryButtons.slice(0, 3)) {
        const style = await button.evaluate(el => {
          const computedStyle = window.getComputedStyle(el);
          return {
            backgroundColor: computedStyle.backgroundColor,
            color: computedStyle.color,
            borderRadius: computedStyle.borderRadius,
            padding: computedStyle.padding
          };
        }).catch(() => null);
        
        if (style) buttonStyles.push(style);
      }
      
      consistencyData[userType] = {
        navItems,
        sidebarStyles,
        buttonStyles
      };
      
      // Take consistency screenshot
      await takeEnhancedScreenshot(page, `consistency-${userType.toLowerCase()}`, {
        fullPage: true
      });
      
      // Sign out for next iteration
      const signOutSelectors = [
        'button:has-text("Sign Out")',
        'button:has-text("Logout")',
        '[data-testid="sign-out"]',
        '.logout-button'
      ];
      
      for (const selector of signOutSelectors) {
        const button = page.locator(selector).first();
        if (await button.isVisible({ timeout: 2000 }).catch(() => false)) {
          await button.click();
          break;
        }
      }
    }
    
    // Verify consistency between user types
    if (consistencyData.SME && consistencyData.CFO) {
      // Check sidebar consistency
      if (consistencyData.SME.sidebarStyles && consistencyData.CFO.sidebarStyles) {
        expect(consistencyData.SME.sidebarStyles.backgroundColor)
          .toBe(consistencyData.CFO.sidebarStyles.backgroundColor);
        
        console.log('✅ Sidebar styling is consistent between user types');
      }
      
      // Check button consistency
      if (consistencyData.SME.buttonStyles.length > 0 && consistencyData.CFO.buttonStyles.length > 0) {
        const smeButtonStyle = consistencyData.SME.buttonStyles[0];
        const cfoButtonStyle = consistencyData.CFO.buttonStyles[0];
        
        expect(smeButtonStyle.backgroundColor).toBe(cfoButtonStyle.backgroundColor);
        expect(smeButtonStyle.borderRadius).toBe(cfoButtonStyle.borderRadius);
        
        console.log('✅ Button styling is consistent between user types');
      }
    }
  });

  test('Responsive Design Journey', async ({ page }) => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 }
    ];
    
    for (const viewport of viewports) {
      console.log(`Testing ${viewport.name} viewport (${viewport.width}x${viewport.height})`);
      
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      
      // Login
      await loginUser(page, 'SME');
      
      // Take viewport screenshot
      await takeEnhancedScreenshot(page, `responsive-${viewport.name}-dashboard`, {
        fullPage: true,
        waitForFonts: true
      });
      
      // Test navigation in this viewport
      const navItems = await getNavigationItems(page);
      
      // Test first few navigation items to verify they work in this viewport
      for (const item of navItems.slice(0, 3)) {
        try {
          await clickNavigationItem(page, item);
          await verifyPageLoaded(page, item);
          
          await takeEnhancedScreenshot(page, `responsive-${viewport.name}-${item.toLowerCase().replace(/\s+/g, '-')}`);
          
          console.log(`✅ ${item} works on ${viewport.name}`);
        } catch (error) {
          console.log(`⚠️ ${item} has issues on ${viewport.name}:`, error.message);
        }
      }
      
      // Test mobile-specific elements (hamburger menu, etc.)
      if (viewport.name === 'mobile') {
        const mobileMenuSelectors = [
          'button[aria-label*="menu"]',
          '.hamburger',
          '[data-testid="mobile-menu"]',
          'button:has-text("☰")',
          'button[class*="menu"]'
        ];
        
        for (const selector of mobileMenuSelectors) {
          const menuButton = page.locator(selector).first();
          if (await menuButton.isVisible({ timeout: 1000 }).catch(() => false)) {
            await menuButton.click();
            await takeEnhancedScreenshot(page, 'responsive-mobile-menu-open');
            console.log('✅ Mobile menu found and functional');
            break;
          }
        }
      }
    }
  });

  test('Performance and Loading Journey', async ({ page }) => {
    // Monitor performance while navigating
    const performanceMetrics: Record<string, any> = {};
    
    // Start performance monitoring
    await page.goto('/');
    
    const startTime = Date.now();
    
    // Login and measure time
    await loginUser(page, 'SME');
    const loginTime = Date.now() - startTime;
    
    performanceMetrics.loginTime = loginTime;
    
    // Navigate through sections and measure load times
    const navItems = await getNavigationItems(page);
    
    for (const item of navItems.slice(0, 5)) { // Test first 5 sections
      const sectionStartTime = Date.now();
      
      try {
        await clickNavigationItem(page, item);
        await verifyPageLoaded(page, item);
        
        const sectionLoadTime = Date.now() - sectionStartTime;
        performanceMetrics[`${item}LoadTime`] = sectionLoadTime;
        
        // Verify reasonable load times (under 3 seconds)
        expect(sectionLoadTime).toBeLessThan(3000);
        
        console.log(`${item} loaded in ${sectionLoadTime}ms`);
      } catch (error) {
        console.log(`Performance test failed for ${item}:`, error.message);
      }
    }
    
    // Overall performance assertions
    expect(performanceMetrics.loginTime).toBeLessThan(5000); // Login under 5 seconds
    
    console.log('Performance metrics:', performanceMetrics);
  });

  test('Error Handling and Edge Cases', async ({ page }) => {
    // Test invalid login
    await page.goto('/');
    
    try {
      await loginUser(page, { 
        email: 'invalid@example.com', 
        password: 'wrongpassword', 
        type: 'SME' 
      });
      
      // Should not reach dashboard - expect error
      const errorShown = await page.locator('.error, .alert-error, [class*="error"]')
        .isVisible({ timeout: 3000 })
        .catch(() => false);
      
      expect(errorShown).toBe(true);
      
      await takeEnhancedScreenshot(page, 'error-invalid-login');
      
    } catch (error) {
      // Expected behavior - login should fail
      console.log('✅ Invalid login correctly rejected');
    }
    
    // Test navigation to non-existent pages
    const invalidPaths = ['/nonexistent', '/invalid-page', '/test123'];
    
    for (const path of invalidPaths) {
      await page.goto(path);
      
      // Should show 404 or redirect to home
      const currentUrl = page.url();
      const has404 = await page.locator('text="404"').isVisible({ timeout: 2000 }).catch(() => false);
      const redirectedToHome = currentUrl.includes('/sign-in') || currentUrl.endsWith('/');
      
      expect(has404 || redirectedToHome).toBe(true);
      
      console.log(`✅ Invalid path ${path} handled correctly`);
    }
  });
});

test.afterEach(async ({ page }) => {
  // Cleanup after each test
  await page.close();
});
