# 🎭 FunnelFit Visual Testing with Playwright

This document outlines how to use Playwright for visual testing and design decision making in the FunnelFit project.

## 🚀 Quick Start

### Run Visual Tests
```bash
# Run all visual tests
npm run test:visual

# Run tests in interactive UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# View test reports
npm run test:report
```

## 📸 What Gets Tested

### 1. **Dashboard Screenshots**
- SME Dashboard (full page + viewport)
- CFO Dashboard (full page + viewport)
- Individual navigation sections
- Component-level screenshots

### 2. **Design Consistency**
- Sidebar styling comparison (SME vs CFO)
- Navigation pattern consistency
- Color scheme validation
- Typography consistency

### 3. **Responsive Design**
- Mobile viewport (375x667)
- Tablet viewport (768x1024)
- Desktop viewport (1920x1080)

### 4. **Cross-Browser Testing**
- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)

## 🎯 Benefits for Design Decisions

### **Visual Regression Detection**
- Automatically catch when UI changes break design consistency
- Compare before/after screenshots for design changes
- Ensure both dashboards maintain the same visual language

### **Component Documentation**
- Generate screenshots of individual components
- Create visual documentation for design system
- Track component evolution over time

### **User Flow Validation**
- Test complete login-to-dashboard flow
- Verify navigation between different sections
- Ensure consistent user experience

## 📁 Generated Files

Visual tests generate the following files in `test-results/`:

```
test-results/
├── sme-dashboard-full.png      # SME dashboard full page
├── cfo-dashboard-full.png      # CFO dashboard full page
├── sme-dashboard-viewport.png  # SME dashboard viewport
├── cfo-dashboard-viewport.png  # CFO dashboard viewport
├── sme-sidebar.png            # SME sidebar component
├── cfo-sidebar.png            # CFO sidebar component
├── sme-documents-section.png  # SME documents section
├── sme-financials-section.png # SME financials section
├── cfo-client-management.png  # CFO client management
├── cfo-analytics.png          # CFO analytics section
├── sme-mobile.png             # Mobile view
├── sme-tablet.png             # Tablet view
├── sme-desktop.png            # Desktop view
├── header-component.png       # Header component
├── metric-card.png            # Metric card component
└── navigation.png             # Navigation component
```

## 🔧 Usage for Design Improvements

### 1. **Before Making Design Changes**
```bash
# Take baseline screenshots
npm run test:visual
```

### 2. **After Making Design Changes**
```bash
# Run tests to see differences
npm run test:visual

# View side-by-side comparison
npm run test:report
```

### 3. **Interactive Design Testing**
```bash
# Use UI mode for real-time testing
npm run test:ui
```

## 📊 Test Configuration

Tests are configured in `playwright.config.ts`:
- **Base URL**: `http://localhost:5173`
- **Auto-start dev server**: Yes
- **Screenshot on failure**: Yes
- **Video recording**: On failure
- **Trace collection**: On retry

## 🎨 Visual Testing Commands

| Command | Description |
|---------|-------------|
| `npm run test:visual` | Run all visual tests and generate screenshots |
| `npm run test:ui` | Open Playwright UI for interactive testing |
| `npm run test:debug` | Run tests in debug mode with step-by-step execution |
| `npm run test:report` | View HTML report with screenshots and videos |
| `npx playwright codegen` | Record new tests by interacting with the UI |

## 🔍 Advanced Usage

### Generate Test from User Interactions
```bash
# Record interactions and generate test code
npx playwright codegen http://localhost:5173
```

### Run Specific Test File
```bash
npx playwright test dashboard-visual.spec.ts
```

### Run Tests on Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests with Specific Viewport
```bash
npx playwright test --config=playwright.config.ts --project="Mobile Chrome"
```

## 🎯 Design Decision Benefits

1. **Consistency Validation**: Ensure SME and CFO dashboards maintain identical styling
2. **Responsive Design**: Validate layouts across different screen sizes
3. **Component Evolution**: Track how individual components change over time
4. **Cross-Browser Compatibility**: Ensure consistent experience across browsers
5. **Regression Prevention**: Catch unintended design changes automatically
6. **Design System Documentation**: Generate visual documentation automatically

This setup provides comprehensive visual testing capabilities that will help make informed design decisions and maintain high-quality UI consistency across the FunnelFit platform.

