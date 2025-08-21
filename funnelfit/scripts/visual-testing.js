#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎭 FunnelFit Visual Testing Suite');
console.log('=====================================\n');

// Ensure test-results directory exists
const testResultsDir = path.join(__dirname, '..', 'test-results');
if (!fs.existsSync(testResultsDir)) {
  fs.mkdirSync(testResultsDir, { recursive: true });
}

try {
  console.log('📸 Running visual tests...');
  
  // Run Playwright tests for visual comparison
  execSync('npx playwright test dashboard-visual.spec.ts', { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });

  console.log('\n✅ Visual tests completed!');
  console.log('\n📊 Generated Screenshots:');
  console.log('  • SME Dashboard (Full Page): test-results/sme-dashboard-full.png');
  console.log('  • CFO Dashboard (Full Page): test-results/cfo-dashboard-full.png');
  console.log('  • Sidebar Comparison: test-results/sme-sidebar.png & test-results/cfo-sidebar.png');
  console.log('  • Mobile/Tablet/Desktop views');
  console.log('  • Individual component screenshots');
  
  console.log('\n🔍 To view detailed test results:');
  console.log('  npx playwright show-report');
  
  console.log('\n🎨 For interactive UI mode:');
  console.log('  npx playwright test --ui');

} catch (error) {
  console.error('❌ Visual testing failed:', error.message);
  process.exit(1);
}
