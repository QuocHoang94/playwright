# Technical Assessment Automation Framework

This repository contains a simple automation test framework written in TypeScript using Playwright, following the Page Object Model (POM) pattern.

## Environment Setup

1. **Install Node.js**
   - Download and install from the [official website](https://nodejs.org/en/download/).
2. **Install dependencies**
   - Run:
     ```bash
     npm install
     ```
3. **Install Playwright browsers**
   - Run:
     ```bash
     npx playwright install
     ```

## Project Structure

- `pages/` — Page Object Model classes (`base_page.ts`, `practiceform-page.ts`, `manager_page.ts`)
- `tests/` — Test specs, fixtures, and setup files
- `utils/` — Test data and utility files
- `playwright.config.ts` — Playwright configuration
- `playwright-report/` — HTML test reports (auto-generated)
- `test-results/` — Raw test results (auto-generated)

## How to Run Tests

- **Run all tests in all browsers (default):**
  ```bash
  npx playwright test
  ```
- **Run tests in headed mode (see browser UI):**
  ```bash
  npx playwright test --headed
  ```
- **Show the last HTML report:**
  ```bash
  npx playwright show-report
  ```
- **Run a specific test file:**
  ```bash
  npx playwright test tests/testcase.spec.ts
  ```

## Retries

- Test retries are configured in `playwright.config.ts`.
- Example (in config):
  ```js
  retries: 3,
  ```

## Reporting

- After running tests, an HTML report is generated in the `playwright-report/` folder.
- To open the last test run report:
  ```bash
  npx playwright show-report
  ```

## Notes

- You can also use the 'Playwright Test for VSCode' extension for a better developer experience.
- The framework is designed for easy extension and maintenance using the POM pattern.


