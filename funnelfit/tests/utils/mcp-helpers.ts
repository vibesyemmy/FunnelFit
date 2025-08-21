import { Page, expect, Locator } from '@playwright/test';

/**
 * MCP-Enhanced Helper Functions for FunnelFit Testing
 * These utilities leverage Playwright MCP capabilities for intelligent testing
 */

export interface UserCredentials {
  email: string;
  password: string;
  type: 'SME' | 'CFO';
}

export interface TestContext {
  page: Page;
  user?: UserCredentials;
  startTime?: number;
}

// Default test credentials
export const TEST_USERS: Record<string, UserCredentials> = {
  SME: { email: 'sme@funnelfit.com', password: 'sme123', type: 'SME' },
  CFO: { email: 'cfo@funnelfit.com', password: 'cfo123', type: 'CFO' }
};

/**
 * Intelligent login function that adapts to different login form structures
 */
export async function loginUser(page: Page, userType: 'SME' | 'CFO' | UserCredentials): Promise<void> {
  const credentials = typeof userType === 'string' ? TEST_USERS[userType] : userType;
  
  if (!credentials) {
    throw new Error(`Invalid user type: ${userType}`);
  }

  // Navigate to login if not already there
  const currentUrl = page.url();
  if (!currentUrl.includes('sign-in') && !currentUrl.includes('login')) {
    await page.goto('/');
  }

  // Find email input using multiple possible selectors
  const emailSelectors = [
    'input[type="email"]',
    'input[name="email"]',
    'input[placeholder*="email" i]',
    'input[id*="email"]',
    '[data-testid="email-input"]'
  ];

  let emailInput: Locator | null = null;
  for (const selector of emailSelectors) {
    const element = page.locator(selector).first();
    if (await element.isVisible({ timeout: 1000 }).catch(() => false)) {
      emailInput = element;
      break;
    }
  }

  if (!emailInput) {
    throw new Error('Could not find email input field');
  }

  await emailInput.fill(credentials.email);

  // Find password input using multiple possible selectors
  const passwordSelectors = [
    'input[type="password"]',
    'input[name="password"]',
    'input[placeholder*="password" i]',
    'input[id*="password"]',
    '[data-testid="password-input"]'
  ];

  let passwordInput: Locator | null = null;
  for (const selector of passwordSelectors) {
    const element = page.locator(selector).first();
    if (await element.isVisible({ timeout: 1000 }).catch(() => false)) {
      passwordInput = element;
      break;
    }
  }

  if (!passwordInput) {
    throw new Error('Could not find password input field');
  }

  await passwordInput.fill(credentials.password);

  // Find and click submit button
  const submitSelectors = [
    'button[type="submit"]',
    'button:has-text("Sign In")',
    'button:has-text("Login")',
    'input[type="submit"]',
    '[data-testid="submit-button"]',
    '.login-button',
    '.sign-in-button'
  ];

  let submitButton: Locator | null = null;
  for (const selector of submitSelectors) {
    const element = page.locator(selector).first();
    if (await element.isVisible({ timeout: 1000 }).catch(() => false)) {
      submitButton = element;
      break;
    }
  }

  if (!submitButton) {
    throw new Error('Could not find submit button');
  }

  await submitButton.click();
  
  // Wait for successful login (dashboard load)
  await waitForDashboardLoad(page);
}

/**
 * Intelligent dashboard load detection
 */
export async function waitForDashboardLoad(page: Page): Promise<void> {
  // Wait for multiple possible indicators that dashboard has loaded
  const dashboardIndicators = [
    'h1:has-text("Welcome")',
    'h2:has-text("Overview")',
    'h1:has-text("Dashboard")',
    '[data-testid="dashboard"]',
    '.dashboard-container',
    'nav:has-text("Overview")',
    '.sidebar',
    '[class*="sidebar"]'
  ];

  await page.waitForFunction((selectors) => {
    return selectors.some(selector => {
      const element = document.querySelector(selector);
      return element && element.offsetParent !== null; // Visible check
    });
  }, dashboardIndicators, { timeout: 10000 });

  // Wait for network to be idle to ensure all data is loaded
  await page.waitForLoadState('networkidle', { timeout: 5000 });
}

/**
 * Find navigation items intelligently
 */
export async function getNavigationItems(page: Page): Promise<string[]> {
  const navSelectors = [
    'nav button',
    'nav a',
    '.sidebar button',
    '.sidebar a',
    '[class*="nav"] button',
    '[class*="nav"] a',
    '[role="navigation"] button',
    '[role="navigation"] a'
  ];

  const items: string[] = [];

  for (const selector of navSelectors) {
    const elements = await page.locator(selector).all();
    
    for (const element of elements) {
      const text = await element.textContent();
      if (text && text.trim()) {
        items.push(text.trim());
      }
    }

    if (items.length > 0) break; // Found navigation items
  }

  // Remove duplicates and filter common navigation items
  const uniqueItems = [...new Set(items)];
  const validNavItems = uniqueItems.filter(item => 
    item.length > 1 && 
    !item.toLowerCase().includes('logo') &&
    !item.toLowerCase().includes('menu') &&
    item.length < 30 // Reasonable length for nav items
  );

  return validNavItems;
}

/**
 * Click navigation item by text content
 */
export async function clickNavigationItem(page: Page, itemText: string): Promise<void> {
  const navSelectors = [
    `nav button:has-text("${itemText}")`,
    `nav a:has-text("${itemText}")`,
    `.sidebar button:has-text("${itemText}")`,
    `.sidebar a:has-text("${itemText}")`,
    `[class*="nav"] button:has-text("${itemText}")`,
    `[class*="nav"] a:has-text("${itemText}")`,
    `[role="navigation"] button:has-text("${itemText}")`,
    `[role="navigation"] a:has-text("${itemText}")`
  ];

  for (const selector of navSelectors) {
    const element = page.locator(selector).first();
    if (await element.isVisible({ timeout: 1000 }).catch(() => false)) {
      await element.click();
      return;
    }
  }

  throw new Error(`Could not find navigation item: ${itemText}`);
}

/**
 * Verify page has loaded for a specific section
 */
export async function verifyPageLoaded(page: Page, sectionName: string): Promise<void> {
  // Wait for content indicators
  const contentSelectors = [
    `h1:has-text("${sectionName}")`,
    `h2:has-text("${sectionName}")`,
    `h3:has-text("${sectionName}")`,
    `[data-testid="${sectionName.toLowerCase()}"]`,
    `[data-testid="${sectionName.toLowerCase()}-section"]`,
    `.${sectionName.toLowerCase()}-section`,
    `.${sectionName.toLowerCase()}-page`
  ];

  await page.waitForFunction((selectors) => {
    return selectors.some(selector => {
      const element = document.querySelector(selector);
      return element && element.offsetParent !== null;
    });
  }, contentSelectors, { timeout: 8000 });
}

/**
 * Find and validate metric cards
 */
export async function findMetricCards(page: Page): Promise<Locator[]> {
  const cardSelectors = [
    '.card',
    '[class*="card"]',
    '.metric',
    '[class*="metric"]',
    '.bg-white',
    '.stat',
    '[class*="stat"]',
    '[data-testid*="metric"]',
    '[data-testid*="card"]'
  ];

  const allCards: Locator[] = [];

  for (const selector of cardSelectors) {
    const cards = await page.locator(selector).all();
    
    for (const card of cards) {
      const text = await card.textContent();
      
      // Check if card contains metric-like content
      if (text && (
        text.match(/\d+/) || // Contains numbers
        text.includes('$') || // Contains currency
        text.includes('%') || // Contains percentage
        text.match(/\d+[KMB]/) // Contains abbreviated numbers
      )) {
        allCards.push(card);
      }
    }

    if (allCards.length > 0) break; // Found metric cards
  }

  return allCards;
}

/**
 * Enhanced screenshot with stability waiting
 */
export async function takeEnhancedScreenshot(
  page: Page, 
  name: string, 
  options: {
    fullPage?: boolean;
    waitForFonts?: boolean;
    waitForImages?: boolean;
    excludeSelectors?: string[];
  } = {}
): Promise<Buffer> {
  // Wait for page stability
  await waitForPageStability(page);

  // Wait for fonts to load if requested
  if (options.waitForFonts) {
    await page.waitForFunction(() => document.fonts.ready);
  }

  // Wait for images to load if requested
  if (options.waitForImages) {
    await page.waitForFunction(() => {
      const images = Array.from(document.images);
      return images.every(img => img.complete);
    });
  }

  // Hide elements if specified
  if (options.excludeSelectors) {
    for (const selector of options.excludeSelectors) {
      await page.addStyleTag({
        content: `${selector} { visibility: hidden !important; }`
      });
    }
  }

  return page.screenshot({
    path: `test-results/mcp-${name}.png`,
    fullPage: options.fullPage || false,
    animations: 'disabled'
  });
}

/**
 * Wait for page to be stable (no ongoing animations, network idle)
 */
export async function waitForPageStability(page: Page): Promise<void> {
  // Wait for network to be idle
  await page.waitForLoadState('networkidle', { timeout: 5000 });

  // Wait for CSS animations to complete
  await page.waitForFunction(() => {
    const animatedElements = document.querySelectorAll('*');
    return Array.from(animatedElements).every(el => {
      const style = window.getComputedStyle(el);
      return style.animationPlayState !== 'running' && 
             style.transitionDuration === '0s';
    });
  }, { timeout: 3000 }).catch(() => {
    // Continue if animation check times out
  });

  // Additional small delay for stability
  await page.waitForTimeout(500);
}

/**
 * Fill form intelligently based on field types
 */
export async function fillFormIntelligently(page: Page, testData: Record<string, any>): Promise<void> {
  const inputs = await page.locator('input, select, textarea').all();

  for (const input of inputs) {
    const inputType = await input.getAttribute('type');
    const inputName = await input.getAttribute('name');
    const placeholder = await input.getAttribute('placeholder');
    const tagName = await input.evaluate(el => el.tagName.toLowerCase());

    // Determine field purpose
    let fieldPurpose = '';
    
    if (inputType === 'email' || inputName?.includes('email') || placeholder?.toLowerCase().includes('email')) {
      fieldPurpose = 'email';
    } else if (inputType === 'password' || inputName?.includes('password')) {
      fieldPurpose = 'password';
    } else if (inputName?.includes('name') || placeholder?.toLowerCase().includes('name')) {
      fieldPurpose = 'name';
    } else if (inputName?.includes('company') || placeholder?.toLowerCase().includes('company')) {
      fieldPurpose = 'company';
    } else if (inputType === 'tel' || inputName?.includes('phone') || placeholder?.toLowerCase().includes('phone')) {
      fieldPurpose = 'phone';
    } else if (tagName === 'select') {
      fieldPurpose = 'select';
    }

    // Fill based on purpose
    if (testData[fieldPurpose]) {
      if (tagName === 'select') {
        await input.selectOption({ label: testData[fieldPurpose] });
      } else {
        await input.fill(testData[fieldPurpose]);
      }
    }
  }
}

/**
 * Generate test data for forms
 */
export function generateTestData(): Record<string, any> {
  return {
    email: 'test@funnelfit.com',
    password: 'TestPassword123!',
    name: 'Test User',
    firstName: 'Test',
    lastName: 'User',
    company: 'Test Company Inc.',
    phone: '+1-555-123-4567',
    address: '123 Test Street',
    city: 'Test City',
    state: 'California',
    zip: '12345',
    country: 'United States'
  };
}

/**
 * Validate form submission results
 */
export async function validateFormSubmission(page: Page, expectedOutcome: 'success' | 'error'): Promise<void> {
  if (expectedOutcome === 'success') {
    // Look for success indicators
    const successSelectors = [
      '.success',
      '.alert-success',
      '[class*="success"]',
      'text="Success"',
      'text="Thank you"',
      'text="Submitted"',
      '[data-testid="success"]'
    ];

    let found = false;
    for (const selector of successSelectors) {
      if (await page.locator(selector).isVisible({ timeout: 2000 }).catch(() => false)) {
        found = true;
        break;
      }
    }

    expect(found).toBe(true);
  } else {
    // Look for error indicators
    const errorSelectors = [
      '.error',
      '.alert-error',
      '.alert-danger',
      '[class*="error"]',
      'text="Error"',
      'text="Invalid"',
      'text="Required"',
      '[data-testid="error"]'
    ];

    let found = false;
    for (const selector of errorSelectors) {
      if (await page.locator(selector).isVisible({ timeout: 2000 }).catch(() => false)) {
        found = true;
        break;
      }
    }

    expect(found).toBe(true);
  }
}
