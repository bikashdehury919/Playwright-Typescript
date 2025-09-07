# Playwright End-to-End Automation Framework (UI + API)

Welcome to an advanced, scalable, and maintainable **Playwright-based Test Automation Framework**, built to test both **UI and API** workflows. This setup follows **data-driven** test design using **Excel** and integrates industry best practices.

---


## Key Features

- End-to-end UI Automation with Playwright
- REST API Testing integrated in the same codebase
- Test data via JSON, Excel (xlsx), and database-ready design
- Fixtures and custom test lifecycle (`beforeEach`, `afterEach`)
- Test Reporting (HTML)
- Cookie & tracker blocker for clean test runs
- .env` support for dynamic config (UI & API URLs)
- Folder-level scalability: Easily extend to mobile, visual, or performance tests

---

## Folder Structure

```bash
.
├── data/                  # Test data (Excel, JSON)
│   ├── e2eData.xlsx       # Excel test data (Data-driven E2E)
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
## Getting Started

## Install Dependencies

npm install
Make sure the following packages are included:
- @playwright/test
- dotenv
- xlsx
### Run Tests

- **Run All Tests (UI + API)**
  - `npx playwright test`

- **Run Only UI Tests**
  - `npx playwright test tests/UI`

- **Run API Tests**
  - `npx playwright test tests/api`

- **View HTML Report**
  - `npx playwright show-report`


## Next Steps & Roadmap 

To evolve this framework into a cutting-edge, enterprise-grade automation solution, here are the prioritized enhancements planned:

- **Implement Database Integration**  
  Enable dynamic test data sourcing from relational databases such as **PostgreSQL** or **MySQL**, as well as NoSQL databases, to support complex data-driven scenarios and seamless test data management.

- **Advanced Logging & Monitoring**  
  Integrate structured logging (e.g., Winston, Pino) for comprehensive execution insights, error tracing, and audit trails.

- **Robust CI/CD Pipelines**  
  Configure GitHub Actions, Azure DevOps, or Jenkins pipelines for seamless automated testing on every commit with parallel execution and environment promotion.

- **Enhanced Reporting & Analytics**  
  Integrate Allure reports with artifact storage for rich, interactive test insights and historical trend analysis.

- **Multi-Environment Support**  
  Dynamic environment switching (dev, QA, staging) leveraging `.env` profiles and config management.

- **Cross-Browser & Cross-Platform Testing**  
  Expand coverage across Chromium, Firefox, WebKit, and mobile emulations to ensure consistent behavior everywhere.

- **Visual Regression Testing**  
  Use Playwright Snapshots and/or tools like Percy to catch UI regressions early and maintain pixel-perfect UI.

- **Accessibility (a11y) Testing**  
  Integrate automated accessibility checks (e.g., Axe-core, Pa11y) into CI to ensure compliance with WCAG standards and deliver inclusive experiences.

- **Behavior-Driven Development (BDD)**  
  Adopt Cucumber or Gherkin syntax for human-readable, business-focused test cases that improve collaboration between technical and non-technical stakeholders.

- **Self-Healing & AI-Powered Automation**  
  Introduce AI-driven element locator healing, flaky test detection, and smart retries to reduce maintenance overhead and boost reliability.

- **Synthetic & Fake Data Generation**  
  Integrate libraries like Faker.js or Mockaroo to create realistic, privacy-compliant synthetic test data for robust and scalable test coverage.

- **Cloud-Enabled & Scalable Test Execution**  
  Leverage Azure DevOps pipelines with parallel execution agents and cloud-hosted browser grids for scalable test runs.

- **Security & Performance Testing Integration**  
  Extend framework to include API security scanning and baseline performance metrics for holistic quality assurance.
