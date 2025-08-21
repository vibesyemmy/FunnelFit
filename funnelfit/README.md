# FunnelFit Design System

A professional SaaS platform design system built with React, TypeScript, and Tailwind CSS, following Untitled UI design patterns.

## 🎨 Design Philosophy

This design system prioritizes:
- **Clean & Professional**: Modern, business-focused aesthetics
- **Accessibility**: WCAG compliant components
- **Consistency**: Unified design tokens and patterns
- **Scalability**: Modular component architecture
- **Developer Experience**: TypeScript support and clear APIs

## 🚀 Quick Start

### Installation

```bash
cd funnelfit
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the design system showcase.

### Build

```bash
npm run build
```

## 🎯 Design Tokens

### Colors

**Primary Palette**
- Primary 500: `#9E7B64` (Main brand color)
- Primary 600: `#8f6a55` (Hover states)
- Primary 400: `#d2bab0` (Light variants)

**Neutral Grays**
- Gray 25: `#fcfcfd` (Background)
- Gray 100: `#f2f4f7` (Borders)
- Gray 500: `#667085` (Text secondary)
- Gray 900: `#101828` (Text primary)

**Semantic Colors**
- Success: Green variants for positive states
- Warning: Yellow variants for caution states
- Error: Red variants for error states

### Typography

**Font Family**: Inter (Google Fonts)

**Scale**:
- `text-xs`: 12px
- `text-sm`: 14px
- `text-base`: 16px
- `text-lg`: 18px
- `text-xl`: 20px
- `text-2xl`: 24px
- `text-3xl`: 30px
- `text-4xl`: 36px
- `text-5xl`: 48px
- `text-6xl`: 60px

### Spacing

Consistent 4px base unit:
- `4px` (0.25rem)
- `8px` (0.5rem)
- `16px` (1rem)
- `24px` (1.5rem)
- `32px` (2rem)
- `48px` (3rem)
- `64px` (4rem)

### Shadows

Untitled UI shadow system:
- `shadow-xs`: Subtle elevation
- `shadow-sm`: Light elevation
- `shadow-md`: Medium elevation
- `shadow-lg`: High elevation
- `shadow-xl`: Very high elevation
- `shadow-2xl`: Maximum elevation

## 🧩 Components

### Core Components

- **Button**: Multiple variants and sizes
- **Input**: Form input fields
- **Select**: Dropdown selection
- **Card**: Content containers
- **Badge**: Status indicators
- **Avatar**: User profile images

### Component Usage

```tsx
import { Button, Input, Card, Badge } from '@/components/ui'

// Button with variants
<Button variant="default" size="lg">Primary Action</Button>
<Button variant="outline" size="sm">Secondary Action</Button>

// Input field
<Input placeholder="Enter your email" size="default" />

// Card with content
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>

// Badge for status
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
```

## 📁 Project Structure

```
funnelfit/
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── select.tsx
│   │   │   ├── avatar.tsx
│   │   │   └── index.ts
│   │   └── design-system-showcase.tsx
│   ├── lib/
│   │   └── utils.ts              # Utility functions
│   ├── styles/
│   │   └── globals.css           # Global styles
│   └── main.tsx                  # App entry point
├── tailwind.config.js            # Tailwind configuration
├── package.json
└── README.md
```

## 🛠 Tech Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Headless UI**: Accessible components
- **Lucide React**: Icon library
- **Vite**: Build tool

## 🎨 Design System Principles

### 1. Consistency
All components follow the same design patterns and use consistent spacing, typography, and colors.

### 2. Accessibility
Components are built with accessibility in mind, including proper ARIA labels, keyboard navigation, and screen reader support.

### 3. Flexibility
Components are designed to be flexible and composable, allowing for various use cases while maintaining consistency.

### 4. Performance
Optimized for performance with minimal bundle size and efficient rendering.

## 🔧 Customization

### Adding New Colors

Update `tailwind.config.js`:

```js
colors: {
  primary: {
    500: '#9E7B64',
    // Add more shades as needed
  },
  // Add new color palettes
}
```

### Creating New Components

1. Create component file in `src/components/ui/`
2. Follow the existing pattern with TypeScript interfaces
3. Use the `cn()` utility for class merging
4. Export from `src/components/ui/index.ts`

### Modifying Design Tokens

Update the design tokens in `src/lib/utils.ts` and `tailwind.config.js` to maintain consistency across the system.

## 📚 Resources

- [Untitled UI](https://www.untitledui.com/) - Design inspiration
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Headless UI](https://headlessui.com/) - Accessible UI components
- [Inter Font](https://rsms.me/inter/) - Typography

## 🤝 Contributing

1. Follow the existing code patterns
2. Maintain TypeScript types
3. Ensure accessibility compliance
4. Update documentation as needed
5. Test components across different screen sizes

## 📄 License

This design system is part of the FunnelFit project.
