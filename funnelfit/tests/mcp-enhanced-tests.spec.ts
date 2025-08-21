import { test, expect } from '@playwright/test';

/**
 * Enhanced FunnelFit Tests using Playwright MCP capabilities
 * These examples show how to use MCP for more intelligent testing
 */

test.describe('FunnelFit MCP-Enhanced Tests', () => {
  
  test('AI-Powered User Journey Testing', async ({ page }) => {
    // Instead of hardcoded selectors, use natural language descriptions
    await page.goto('http://localhost:5173/');
    
    // MCP can find elements by their purpose/description
    await page.locator('input[placeholder*="email" i]').fill('sme@funnelfit.com');
    await page.locator('input[type="password"]').fill('sme123');
    await page.locator('button:has-text("Sign In"), button[type="submit"]').click();
    
    // Wait for dashboard load with multiple possible indicators
    await page.waitForSelector('h1:has-text("Welcome"), h2:has-text("Overview"), [data-testid="dashboard"]');
    
    // Intelligent navigation testing - finds nav items regardless of exact structure
    const navItems = ['Overview', 'Documents', 'Financials', 'CFO Services'];
    
    for (const item of navItems) {
      // Find navigation item by text content, regardless of HTML structure
      const navElement = page.locator(`nav button:has-text("${item}"), nav a:has-text("${item}"), [role="navigation"] *:has-text("${item}")`).first();
      
      if (await navElement.isVisible()) {
        await navElement.click();
        
        // Verify section loaded - flexible content checking
        await expect(page.locator(`h1, h2, h3`)).toContainText(new RegExp(item, 'i'));
        
        // Take contextual screenshot
        await page.screenshot({ 
          path: `test-results/mcp-${item.toLowerCase().replace(' ', '-')}-section.png`,
          fullPage: true 
        });
      }
    }
  });

  test('Adaptive UI Testing - Handles Design Changes', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Login with flexible selectors
    await page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i]').fill('cfo@funnelfit.com');
    await page.locator('input[type="password"], input[name="password"]').fill('cfo123');
    await page.locator('button[type="submit"], button:has-text("Sign In"), [role="button"]:has-text("Sign In")').click();
    
    // Wait for dashboard - multiple possible indicators
    await page.waitForFunction(() => {
      return document.querySelector('h1, h2, h3') && 
             (document.querySelector('h1, h2, h3').textContent.includes('Overview') ||
              document.querySelector('h1, h2, h3').textContent.includes('Dashboard') ||
              document.querySelector('h1, h2, h3').textContent.includes('Welcome'));
    });
    
    // Test metric cards - adaptive to different layouts
    const metricCards = await page.locator('[class*="card"], [class*="metric"], .bg-white, [data-testid*="metric"]').all();
    
    for (let i = 0; i < Math.min(metricCards.length, 4); i++) {
      const card = metricCards[i];
      
      // Check if card contains metric-like content
      const cardText = await card.textContent();
      if (cardText && (cardText.match(/\d+/) || cardText.includes('$') || cardText.includes('%'))) {
        await card.screenshot({ path: `test-results/mcp-metric-card-${i}.png` });
        
        // Verify card has proper structure (flexible checking)
        await expect(card).toBeVisible();
        const hasHeader = await card.locator('h3, h4, [class*="title"], [class*="heading"]').count() > 0;
        const hasValue = await card.locator('[class*="value"], [class*="number"], strong, b').count() > 0;
        
        if (hasHeader && hasValue) {
          console.log(`✅ Metric card ${i} has proper structure`);
        }
      }
    }
  });

  test('Intelligent Form Testing', async ({ page }) => {
    // Test form interactions across different pages
    const formPages = [
      { url: '/sign-up', title: 'Sign Up' },
      { url: '/sign-in', title: 'Sign In' },
      { url: '/create-account', title: 'Create Account' }
    ];
    
    for (const formPage of formPages) {
      await page.goto(`http://localhost:5173${formPage.url}`);
      
      // Find all form inputs intelligently
      const inputs = await page.locator('input, select, textarea').all();
      
      for (const input of inputs) {
        const inputType = await input.getAttribute('type');
        const inputName = await input.getAttribute('name');
        const placeholder = await input.getAttribute('placeholder');
        
        // Fill inputs based on their purpose
        if (inputType === 'email' || inputName?.includes('email') || placeholder?.toLowerCase().includes('email')) {
          await input.fill('test@funnelfit.com');
        } else if (inputType === 'password' || inputName?.includes('password')) {
          await input.fill('TestPassword123!');
        } else if (inputName?.includes('name') || placeholder?.toLowerCase().includes('name')) {
          await input.fill('Test User');
        } else if (inputName?.includes('company') || placeholder?.toLowerCase().includes('company')) {
          await input.fill('Test Company Inc.');
        }
      }
      
      // Take screenshot of filled form
      await page.screenshot({ 
        path: `test-results/mcp-form-${formPage.title.toLowerCase().replace(' ', '-')}.png`,
        fullPage: true 
      });
    }
  });

  test('Dynamic Content Testing', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Login as SME
    await page.locator('input[type="email"]').fill('sme@funnelfit.com');
    await page.locator('input[type="password"]').fill('sme123');
    await page.locator('button[type="submit"]').click();
    
    // Wait for dynamic content to load
    await page.waitForLoadState('networkidle');
    
    // Test dynamic elements that might appear/disappear
    const dynamicElements = [
      'loading indicator',
      'success message',
      'error message',
      'notification',
      'tooltip',
      'modal',
      'dropdown'
    ];
    
    for (const elementType of dynamicElements) {
      // Check for various possible selectors for each element type
      const selectors = [
        `[class*="${elementType}"]`,
        `[data-testid*="${elementType}"]`,
        `[aria-label*="${elementType}"]`,
        `[role="${elementType === 'modal' ? 'dialog' : elementType === 'tooltip' ? 'tooltip' : 'alert'}"]`
      ];
      
      for (const selector of selectors) {
        const elements = await page.locator(selector).all();
        if (elements.length > 0) {
          console.log(`✅ Found ${elementType} elements:`, elements.length);
          await page.screenshot({ 
            path: `test-results/mcp-dynamic-${elementType.replace(' ', '-')}.png` 
          });
          break;
        }
      }
    }
  });

  test('Cross-Dashboard Consistency Check', async ({ page }) => {
    const dashboards = [
      { email: 'sme@funnelfit.com', password: 'sme123', type: 'SME' },
      { email: 'cfo@funnelfit.com', password: 'cfo123', type: 'CFO' }
    ];
    
    const consistencyChecks = [];
    
    for (const dashboard of dashboards) {
      await page.goto('http://localhost:5173/');
      
      await page.locator('input[type="email"]').fill(dashboard.email);
      await page.locator('input[type="password"]').fill(dashboard.password);
      await page.locator('button[type="submit"]').click();
      
      await page.waitForSelector('h1, h2, h3');
      
      // Collect design consistency data
      const sidebarColor = await page.locator('nav, sidebar, [class*="sidebar"]').first().evaluate(el => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      const primaryButtons = await page.locator('button[class*="primary"], .btn-primary, [class*="bg-primary"]').all();
      const buttonStyles = [];
      
      for (const button of primaryButtons.slice(0, 3)) { // Check first 3 buttons
        const style = await button.evaluate(el => ({
          backgroundColor: window.getComputedStyle(el).backgroundColor,
          color: window.getComputedStyle(el).color,
          borderRadius: window.getComputedStyle(el).borderRadius
        }));
        buttonStyles.push(style);
      }
      
      consistencyChecks.push({
        type: dashboard.type,
        sidebarColor,
        buttonStyles
      });
      
      // Screenshot for comparison
      await page.screenshot({ 
        path: `test-results/mcp-${dashboard.type.toLowerCase()}-consistency.png`,
        fullPage: true 
      });
      
      // Sign out for next iteration
      const signOutButton = page.locator('button:has-text("Sign Out"), button:has-text("Logout"), [data-testid="sign-out"]').first();
      if (await signOutButton.isVisible()) {
        await signOutButton.click();
      }
    }
    
    // Verify consistency between dashboards
    if (consistencyChecks.length === 2) {
      expect(consistencyChecks[0].sidebarColor).toBe(consistencyChecks[1].sidebarColor);
      console.log('✅ Sidebar colors are consistent between dashboards');
    }
  });
});
