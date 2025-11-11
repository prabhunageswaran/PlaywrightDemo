import { expect, Locator, Page } from '@playwright/test';

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  /**
   * ✅ Fill all checkout details and proceed to step two
   * @param firstName - User's first name
   * @param lastName - User's last name
   * @param postalCode - Postal/Zip code
   */
  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);

    await this.continueButton.click();

    // Verify navigation to next page (checkout-step-two)
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  }
}   
export default CheckoutStepOnePage;
