import { PracticeFormPage } from './practice_page';
import type { Page } from '@playwright/test';

export class PageManager {
  private readonly page: Page;
  private _practiceFormPage: PracticeFormPage | undefined;

  constructor(page: Page) {
    this.page = page;
  }

  get practiceFormPage(): PracticeFormPage {
    if (!this._practiceFormPage) {
      this._practiceFormPage = new PracticeFormPage(this.page);
    }
    return this._practiceFormPage;
  }
}
