// fixtures.ts
import { test as base } from '@playwright/test';
import { PracticeFormPage } from '../pages/practice_page';

type MyFixtures = {
  practiceFormPage: PracticeFormPage;
};

export const test = base.extend<MyFixtures>({
  practiceFormPage: async ({ page }, use) => {
    const formPage = new PracticeFormPage(page);
    await use(formPage);
  },
});
