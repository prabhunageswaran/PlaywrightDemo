import { Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly itemLocator;
  readonly cartBadge;

  constructor(page: Page) {
    this.page = page;
    this.itemLocator = page.locator('.inventory_item'); // 🔹 Common locator for all items
    this.cartBadge = page.locator('.shopping_cart_badge'); // 🔹 Cart badge locator
  }

  /**
   * Navigate directly to the Inventory Page
   */
  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    await expect(this.page).toHaveURL(/.*inventory.html/); // ✅ Verify navigation success
  }

  /**
   * Get the number of items currently in the cart
   */
  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const count = await this.cartBadge.textContent();
      return Number(count);
    }
    return 0; // ✅ No badge means empty cart
  }

  /**
   * Add an item to cart by item name
   * Example: await addToCart('Sauce Labs Backpack')
   */
  async addToCart(itemName: string) {
    // ✅ Get current cart count before adding
    const beforeCount = await this.getCartCount();

    // 🔹 Find the item by name
    const item = this.itemLocator.filter({ hasText: itemName });
    const addButton = item.locator('button:has-text("Add to cart")');

    await expect(addButton).toBeVisible(); // ✅ Ensure Add button is visible
    await addButton.click();

    // ✅ Verify the Add button changed to "Remove"
    const removeButton = item.locator('button:has-text("Remove")');
    await expect(removeButton).toBeVisible(); // ✅ Item successfully added to cart

    // ✅ Verify cart count increased by 1
    const afterCount = await this.getCartCount();
    await expect(afterCount).toBe(beforeCount + 1);
  }

  /**
   * Remove an item from cart by item name
   * Example: await removeFromCart('Sauce Labs Bike Light')
   */
  async removeFromCart(itemName: string) {
    // ✅ Get current cart count before removing
    const beforeCount = await this.getCartCount();

    // 🔹 Find the item by name
    const item = this.itemLocator.filter({ hasText: itemName });
    const removeButton = item.locator('button:has-text("Remove")');

    await expect(removeButton).toBeVisible(); // ✅ Ensure Remove button is visible
    await removeButton.click();

    // ✅ Verify the Remove button changed back to "Add to cart"
    const addButton = item.locator('button:has-text("Add to cart")');
    await expect(addButton).toBeVisible(); // ✅ Item successfully removed from cart

    // ✅ Verify cart count decreased by 1
    const afterCount = await this.getCartCount();
    await expect(afterCount).toBe(beforeCount - 1);
  }
}
export default InventoryPage;