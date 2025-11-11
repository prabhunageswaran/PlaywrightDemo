import { expect, Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header'); // e.g., "THANK YOU FOR YOUR ORDER"
    this.completeText = page.locator('.complete-text');     // Additional info text
    this.backHomeButton = page.locator('[data-test="back-to-products"]'); // Button to go back to inventory
  }

  /**
   * ✅ Verify that order completion page is displayed
   */
  async verifyOrderComplete() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toBeVisible();
  }

  /**
   * ✅ Click Back Home to navigate to Inventory page
   */
  async clickBackHome() {
    await this.backHomeButton.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }
}
export default CheckoutCompletePage;