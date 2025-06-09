import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Wait and fill a text field
     * @param locator Element locator
     * @param text Text to fill
     */
    protected async fillText(locator: Locator, text: string) {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(text);
    }

    /**
     * Wait and click an element
     * @param locator Element locator
     */
    protected async click(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    /**
     * Select a value from a custom dropdown
     * @param dropdownTrigger Dropdown trigger element
     * @param optionValue Option value to select
     */
    protected async selectDropdownOption(dropdownTrigger: Locator, optionValue: string) {
        await this.click(dropdownTrigger);
        const option = this.page.locator(`xpath=//div[text()='${optionValue}']`);
        await this.click(option);
    }
}
