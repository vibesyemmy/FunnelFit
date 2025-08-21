# FunnelFit 🚀

**Connecting SMEs with Fractional CFOs for Strategic Financial Growth**

FunnelFit is a comprehensive platform that bridges the gap between Small and Medium Enterprises (SMEs) and experienced fractional CFOs, enabling businesses to access high-level financial expertise without the full-time commitment.

## 🎯 Project Overview

FunnelFit streamlines the process of matching SMEs with qualified fractional CFOs based on industry expertise, experience level, and specific business needs. The platform provides tools for onboarding, client management, project tracking, and financial collaboration.

## ✨ Features

### For SMEs
- **Easy Onboarding**: Streamlined registration and business profile setup
- **CFO Matching**: AI-powered matching based on industry, size, and needs
- **Project Management**: Track financial projects and milestones
- **Secure Communication**: Built-in messaging and document sharing
- **Dashboard Analytics**: Overview of financial metrics and progress

### For CFOs
- **Professional Profiles**: Showcase expertise, certifications, and experience
- **Client Management**: Comprehensive tools for managing multiple engagements
- **Availability Tracking**: Flexible scheduling and capacity management
- **Document Collaboration**: Secure file sharing and review systems
- **Performance Analytics**: Track client satisfaction and business metrics

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Playwright (Visual + E2E)
- **UI Components**: Custom design system with shadcn/ui inspiration
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vibesyemmy/FunnelFit.git
   cd FunnelFit/funnelfit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Testing

Run visual tests:
```bash
npm run test:visual
```

Run Playwright tests:
```bash
npm run test
```

Run MCP-enhanced tests:
```bash
npm run test:mcp
```

## 📁 Project Structure

```
funnelfit/
├── src/
│   ├── components/
│   │   └── ui/           # Reusable UI components
│   ├── pages/            # Main application pages
│   │   ├── onboarding.tsx    # Multi-step onboarding flow
│   │   ├── cfo-dashboard.tsx # CFO management dashboard
│   │   ├── sme-dashboard.tsx # SME client dashboard
│   │   └── ...
│   ├── lib/              # Utility functions
│   └── styles/           # Global styles
├── tests/                # Playwright tests
├── docs/                 # Documentation
└── public/               # Static assets
```

## 🎨 Key Components

### CFO Dashboard
- **Overview**: Real-time metrics and actionable insights
- **Client Management**: Track active engagements and opportunities
- **Profile Management**: Professional profile and certification tracking
- **Analytics**: Performance metrics and client satisfaction

### SME Dashboard  
- **Financial Overview**: Key business metrics and KPIs
- **CFO Collaboration**: Active projects and communication
- **Document Center**: Secure file sharing and management
- **Insights**: Financial recommendations and analysis

### Onboarding Flow
- **Multi-step Process**: Separate flows for SMEs and CFOs
- **Professional Background**: Certification verification and experience
- **Matching Preferences**: Industry focus and engagement types
- **Availability Management**: Flexible scheduling options

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run Playwright tests
- `npm run test:visual` - Run visual regression tests
- `npm run test:mcp` - Run MCP-enhanced tests
- `npm run lint` - Run ESLint

### Code Quality

- **ESLint**: Code linting and formatting
- **TypeScript**: Type safety and developer experience
- **Playwright**: Comprehensive testing strategy
- **Visual Testing**: Automated UI regression testing

## 🎯 Current Status

### ✅ Completed Features
- CFO onboarding flow with certification upload
- Enhanced CFO dashboard with actionable insights
- Professional profile management system
- Client relationship management tools
- Visual testing framework with Playwright MCP
- Currency localization (Nigerian Naira)
- Responsive design system

### 🚧 In Progress
- Engagement workspace for active projects
- Advanced matching algorithm
- Real-time notifications system

### 📋 Upcoming Features
- Payment processing integration
- Advanced analytics and reporting
- Mobile application
- API integration for financial data
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Built with React and modern web technologies
- UI inspiration from shadcn/ui component library
- Testing powered by Playwright MCP
- Icons by Lucide React

## 📞 Contact

For questions or support, please reach out through GitHub issues or contact the development team.

---

**FunnelFit** - Empowering SMEs with Expert Financial Leadership 💼📈
