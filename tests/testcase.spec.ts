import { test } from '../tests/fixtures';
import { setup } from './testsetup';
import { PageManager } from '../pages/manager_page';

setup();

test('Verify successful form submission with all required fields filled (Happy flow)', async ({ page }) => {
  const manager = new PageManager(page);
  const practiceFormPage = manager.practiceFormPage;
  await practiceFormPage.fillPracticeForm(1);
  await practiceFormPage.verifySubmitPracticeFormSuccess();
});

test('Verify display error when Mobile Number is missing (Unhappy Flow)', async ({ page }) => {
  const manager = new PageManager(page);
  const practiceFormPage = manager.practiceFormPage;
  await practiceFormPage.fillPracticeForm(0);
  await practiceFormPage.verifySubmitPracticeFormUnSuccess();
});