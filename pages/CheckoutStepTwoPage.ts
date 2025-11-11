import { expect, Locator, Page } from '@playwright/test';

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly summaryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.summaryItems = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  /**
   * ✅ Verify that expected items are present in the summary
   * @param expectedItems - Array of item names
   */
  async verifyItemsInSummary(expectedItems: string[]) {
    const cartNames = await this.itemNames.allTextContents();
    console.log('Checkout Step 2 Items:', cartNames);
    for (const item of expectedItems) {
      expect(cartNames).toContain(item);
    }
  }

  /**
   * ✅ Verify total price calculation
   * @param expectedSubtotal - Expected subtotal value (number)
   * @param expectedTax - Expected tax value (number)
   * @param expectedTotal - Expected total value (number)
   */
  async verifyPriceSummary(expectedSubtotal: number, expectedTax: number, expectedTotal: number) {
    const subtotalText = await this.subtotalLabel.textContent(); // e.g. "Item total: $39.98"
    const taxText = await this.taxLabel.textContent();           // e.g. "Tax: $3.20"
    const totalText = await this.totalLabel.textContent();       // e.g. "Total: $43.18"

    const parsePrice = (text: string | null) => parseFloat(text?.replace(/[^0-9.]/g, '') || '0');

    expect(parsePrice(subtotalText)).toBeCloseTo(expectedSubtotal, 2);
    expect(parsePrice(taxText)).toBeCloseTo(expectedTax, 2);
    expect(parsePrice(totalText)).toBeCloseTo(expectedTotal, 2);
  }

  /**
   * ✅ Finish checkout
   */
  async clickFinish() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  }

  /**
   * ✅ Cancel checkout and return to cart page
   */
  async clickCancel() {
    await this.cancelButton.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
  }
}
