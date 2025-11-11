import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly removeButtons: Locator;
  readonly cartBadge: Locator;
  readonly emptyCartMessage: Locator; // Custom assertion for empty state

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.checkoutButton = page.locator('#checkout');
    this.removeButtons = page.locator('[data-test^="remove-"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.emptyCartMessage = page.locator('.cart_list:has-text("Your cart is empty")');
  }

  /**
   * ✅ Verify if all items from inventory are present in the cart
   * @param expectedItems - Array of item names added from inventory
   */
  async verifyItemsInCart(expectedItems: string[]) {
    const cartNames = await this.cartItemNames.allTextContents();
    console.log('Items in Cart:', cartNames);

    for (const item of expectedItems) {
      expect(cartNames).toContain(item);
    }
  }

  /**
   * ✅ Remove a specific item and validate count reduced
   * @param itemName - Name of the item to remove
   */
  async removeItemAndValidate(itemName: string) {
    const initialCount = await this.cartItems.count();
    const removeButton = this.page.locator(`button[data-test="remove-${itemName.toLowerCase().replaceAll(' ', '-')}"]`);

    await expect(removeButton).toBeVisible();
    await removeButton.click();

    const finalCount = await this.cartItems.count();
    expect(finalCount).toBeLessThan(initialCount);

    // Validate item is no longer in cart
    const cartNames = await this.cartItemNames.allTextContents();
    expect(cartNames).not.toContain(itemName);

    // Optional: verify cart badge updated
    if (await this.cartBadge.isVisible()) {
      const count = parseInt(await this.cartBadge.textContent() || '0');
      expect(count).toBe(finalCount);
    }
  }

  /**
   * ✅ Remove all items and check if cart is empty
   */
  async removeAllItemsAndValidateEmpty() {
    const itemCount = await this.cartItems.count();
    for (let i = 0; i < itemCount; i++) {
      await this.removeButtons.first().click();
    }

    await expect(this.cartItems).toHaveCount(0);
    await expect(this.cartBadge).toBeHidden();
  }

  /**
   * ✅ Click Continue Shopping and verify navigation to inventory page
   */
  async clickContinueShopping() {
    await this.continueShoppingButton.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }

  /**
   * ✅ Click Checkout and verify navigation to checkout step one page
   */
  async clickCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  }
}
export default CartPage;