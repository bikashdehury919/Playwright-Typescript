# Enterprise-Grade Playwright Framework with Azure CI & Allure Reporting

[![Playwright](https://img.shields.io/badge/Playwright-v1.54.1-brightgreen.svg)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-success.svg)](https://nodejs.org/)

## 🎭 About The Framework

A robust, scalable, and enterprise-ready End-to-End Testing Framework built with Playwright and TypeScript. Designed to support both UI and API testing with industry best practices and patterns.

### Author & Architect

**Bikash Dehury**  
*Automation Architect*  
[LinkedIn](https://www.linkedin.com/in/bikash-dehury-90a10577/) | [GitHub](https://github.com/bikashdehury919/Playwright-Typescript)

## 🌟 Key Features

- **Multi-Testing Paradigms**
  - End-to-End UI Testing
  - REST API Testing
  - Visual Testing capabilities
  - Performance metrics collection
  - Cross-browser testing support

- **Advanced Data Management**
  - Data-Driven Testing using Excel (XLSX)
  - JSON fixtures support
  - Dynamic test data generation
  - Database integration ready

- **Robust Architecture**
  - Page Object Model (POM)
  - Custom fixtures implementation
  - Reusable components
  - Type-safe locators
  - Modular test structure

- **CI/CD Integration**
  - Azure DevOps pipeline configuration
  - GitHub Actions ready
  - Docker support
  - Parallel execution capability

- **Comprehensive Reporting**
  - HTML reports with screenshots
  - Allure reporting integration
  - Test execution videos
  - Trace viewer support
  - Failure analysis tools

## 🏗 Project Structure

```bash
.
├── data/                   # Test data (Excel, JSON)
├── locators/              # UI element locators
├── pages/                 # Page Object Models
├── tests/                 # Test suites
│   ├── api/              # API tests
│   └── UI/               # UI tests
├── utils/                # Utility functions
├── playwright.config.ts  # Playwright configuration
└── fixtures.ts          # Custom test fixtures
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Visual Studio Code

### Installation

1. Clone the repository
```bash
git clone https://github.com/bikashdehury919/Playwright-Typescript.git
cd Playwright-Typescript
```

2. Install dependencies
```bash
npm install
npx playwright install
```

3. Set up environment variables
```bash
cp .env.example .env
# Update .env with your configuration
```

## 🎯 Running Tests

### UI Tests
```bash
# Run all UI tests
npm run test:ui

# Run specific test file
npm run test:ui tests/UI/test_main.spec.ts

# Run in headed mode
npm run test:ui:headed
```

### API Tests
```bash
# Run all API tests
npm run test:api

# Run specific API test
npm run test:api tests/api/get_product.spec.ts
```

## 📊 Test Reports

- **HTML Report**: Available at `playwright-report/index.html`
- **Allure Report**: Generated in `allure-report` directory
- **Trace Viewer**: Available for failed tests

## 🔧 Framework Components

### 1. Page Objects
- Implemented using TypeScript classes
- Encapsulated UI interactions
- Reusable methods and properties

### 2. Fixtures
- Custom test context
- Shared browser context
- API request context
- Data-driven test helpers

### 3. Utilities
- Excel data reader
- File operations
- API helpers
- Common functions

### 4. Configuration
- Environment-based settings
- Cross-browser configurations
- Parallel execution settings
- Reporter configurations

## 🔐 Security Features

- Environment variable protection
- Secure credential management
- Cookie handling
- Network request interception

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 Best Practices

- **Code Style**: Following TypeScript best practices
- **Naming Conventions**: Clear and consistent naming
- **Error Handling**: Robust error handling mechanisms
- **Comments**: JSDoc style documentation
- **Git Workflow**: Feature branch workflow

## 📚 Documentation

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Test Examples](https://github.com/bikashdehury919/Playwright-Typescript/blob/main/tests/UI/test_main.spec.ts)

---

## 🤖 Continuous Integration

### Azure DevOps Pipeline
- Automated test execution
- Cross-browser testing
- Test report generation
- Failure notifications

### GitHub Actions
- PR validation
- Scheduled test runs
- Environment deployment
- Security scanning

## 📈 Performance Considerations

- Parallel test execution
- Resource cleanup
- Memory management
- Network optimization

## 🔍 Debugging

- Trace viewer support
- Screenshot capture
- Video recording
- Console logging

## 🌐 Supported Browsers

- Chromium
- Firefox
- WebKit
- Mobile browsers (via device emulation)

---

*Developed and maintained by Bikash Dehury*
│   └── testdata.json      # Static test data
│
├── locators/              # All element locators per page
│   ├── home_locators.ts
│   ├── checkout_locators.ts
│   └── ...
│
├── pages/                 # Page Object Models (POMs)
│   ├── home_page.ts
│   ├── checkout_page.ts
│   ├── product_page.ts
│   └── api_base.ts        # API wrapper class
│
├── tests/
│   ├── api/               # API test cases
│   └── UI/                # UI test cases (E2E)
│       └── test_main.spec.ts
│
├── utils/                 # Utilities (Excel, file, DB, etc.)
│   ├── excelUtils.ts      # Excel reader utility
│   └── fileUtils.ts       # File helpers
│
├── fixtures.ts            # Custom test lifecycle & Playwright config extensions
├── .env                   # Base URLs (UI & API)
├── playwright.config.ts   # Global test config
└── README.md              # You're here!
```