import { expect, Locator } from '@playwright/test';
import type { Page } from 'playwright';
import { BasePage } from './base_page';
import { information } from '../utils/testdata';

export class PracticeFormPage extends BasePage {
    // Page elements as Locator properties
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly userEmail: Locator;
    private readonly mobileNumber: Locator;
    private readonly currentAddress: Locator;
    private readonly uploadPicture: Locator;
    private readonly stateDropdown: Locator;
    private readonly cityDropdown: Locator;
    private readonly submitButton: Locator;
    private readonly successHeader: Locator;
    private readonly registrationFormHeader: Locator;

    constructor(page: Page) {
        super(page);
        // Initialize all locators in constructor
        this.firstName = page.locator("xpath=//input[@id='firstName']");
        this.lastName = page.locator("xpath=//input[@id='lastName']");
        this.userEmail = page.locator("xpath=//input[@id='userEmail']");
        this.mobileNumber = page.locator("xpath=//input[@id='userNumber']");
        this.currentAddress = page.locator("xpath=//textarea[@id='currentAddress']");
        this.uploadPicture = page.locator("xpath=//input[@id='uploadPicture']");
        this.stateDropdown = page.locator("xpath=//div[text()='Select State']");
        this.cityDropdown = page.locator("xpath=//div[text()='Select City']");
        this.submitButton = page.locator("xpath=//button[@id='submit']");
        this.successHeader = page.locator("xpath=//div[@id='example-modal-sizes-title-lg']");
        this.registrationFormHeader = page.locator("xpath=//h5[text()='Student Registration Form']");
    }

    async fillPracticeForm(mobileNumber: number) {
        // Use helper methods from BasePage
        await this.fillText(this.firstName, information.firstName);
        await this.fillText(this.lastName, information.lastName);
        await this.fillText(this.userEmail, information.email);
        
        // Handle mobile number based on test case
        await this.fillText(this.mobileNumber, mobileNumber === 1 ? information.mobileNumber : "");

        // Select gender
        await this.click(this.page.locator(`xpath=//label[normalize-space()='${information.gender[0]}']`));
        
        // Select hobbies
        await this.click(this.page.locator(`xpath=//label[normalize-space()='${information.hobbies[0]}']`));
        
        // Fill address
        await this.fillText(this.currentAddress, information.currentAddress);

        // Handle file upload
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent("filechooser"),
            await this.click(this.uploadPicture)
        ]);
        await fileChooser.setFiles(["utils/img_test/test1.png"]);

        // Select state and city using helper method
        await this.selectDropdownOption(this.stateDropdown, information.state[0]);
        await this.selectDropdownOption(this.cityDropdown, information.city[0]);
        
        // Submit form
        await this.click(this.submitButton);
    }

    private async getTableCellText(label: string): Promise<string> {
        const cell = this.page.locator(`xpath=//td[normalize-space()='${label}']/following-sibling::td`);
        await cell.waitFor({ state: 'visible' });
        const text = await cell.textContent();
        return text || '';
    }

    async getCurrentDateFormatted(): Promise<string> {
        const today: Date = new Date();
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };
        return today.toLocaleDateString('en-GB', options).replace(/ (\d{4})$/, ',$1');
    }

    async verifySubmitPracticeFormSuccess() {
        await expect(this.successHeader).toBeVisible();
        const expectedData = {
            "Student Name": "Luis Van",
            "Gender": "Male",
            "Mobile": "0912345678",
            "Date of Birth": await this.getCurrentDateFormatted(),
            "Hobbies": "Sports",
            "Picture": "test1.png",
            "Address": "123 Nguyen Van Cu, Hanoi",
            "State and City": "NCR Delhi"
        };
        
        for (const [label, expectedValue] of Object.entries(expectedData)) {
            const actualValue = await this.getTableCellText(label);
            await expect(actualValue).toBe(expectedValue);
        }
    }

    async verifySubmitPracticeFormUnSuccess() {
        await expect(this.mobileNumber).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(this.registrationFormHeader).toBeVisible();
    }
}