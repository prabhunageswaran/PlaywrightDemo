
import { Page, expect, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly itemLocator;
  readonly cartBadge;
  readonly sortDropdown;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemLocator = page.locator('.inventory_item'); // 🔹 Common locator for all items
    this.cartBadge = page.locator('.shopping_cart_badge'); // 🔹 Cart badge locator
    this.sortDropdown = page.locator('[data-test="product_sort_container"]'); // 🔹 Sort dropdown
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  /**
   * Navigate directly to the Inventory Page
   */


  async goToCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
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

async addToCartmultipe(itemName: string[]) {
   for (let i = 0; i < itemName.length; i++) {
      await this.addToCart(itemName[i]);
   }
}


  /**
   * Add an item to cart by item name ...Sauce Labs Backpack
   */
  async addToCart(itemName: string) {


    //const item1 = "//div[@class='inventory_item']//div[text()='" + itemName + "']/../../..//button"

    const beforeCount = await this.getCartCount(); // ✅ Get count before adding

    const item = this.itemLocator.filter({ hasText: itemName });
    const addButton = item.locator('button:has-text("Add to cart")');

    await expect(addButton).toBeVisible(); // ✅ Ensure Add button is visible
    await addButton.click();

    const removeButton = item.locator('button:has-text("Remove")');
    await expect(removeButton).toBeVisible(); // ✅ Button changed to Remove (added successfully)
    await expect(addButton).not.toBeVisible();

    const afterCount = await this.getCartCount();
    await expect(afterCount).toBe(beforeCount + 1); // ✅ Verify cart count incremented
  }

  /**
   * Remove an item from cart by item name
   */
  async removeFromCart(itemName: string) {
    const beforeCount = await this.getCartCount(); // ✅ Get count before removing

    const item = this.itemLocator.filter({ hasText: itemName });
    const removeButton = item.locator('button:has-text("Remove")');

    await expect(removeButton).toBeVisible(); // ✅ Ensure Remove button is visible
    await removeButton.click();

    const addButton = item.locator('button:has-text("Add to cart")');
    await expect(addButton).toBeVisible(); // ✅ Button changed to Add to cart (removed successfully)
     
    const afterCount = await this.getCartCount();
    await expect(afterCount).toBe(beforeCount - 1); // ✅ Verify cart count decremented
  }

  /**
   * Get all inventory items displayed on the page
   * Returns: Array of objects → { name, price, isAddedToCart }
   */
  async getAllItems() {
    const count = await this.itemLocator.count();
    const items = [];

    for (let i = 0; i < count; i++) {
      const item = this.itemLocator.nth(i);

      const name = await item.locator('.inventory_item_name').textContent();
      const price = await item.locator('.inventory_item_price').textContent();
      const buttonText = await item.locator('button').textContent();

      items.push({
        name: name?.trim(),
        price: Number(price?.replace('$', '').trim()),
        isAddedToCart: buttonText?.trim() === 'Remove',
      });
    }

    return items;
  }

  /**
   * Select sorting option from dropdown
   * @param value One of: az | za | lohi | hilo
   */
  async selectSortOption(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(value);
    await this.page.waitForTimeout(500); // small wait for UI update
  }

  /**
   * Validate sorting functionality using getAllItems()
   */
  async validateSorting(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.selectSortOption(option);
    const items = await this.getAllItems();

    if (option === 'az') {
      const sortedNames = [...items.map(i => i.name)].sort();
      expect(items.map(i => i.name)).toEqual(sortedNames); // ✅ Name ascending
    }

    if (option === 'za') {
      const sortedNames = [...items.map(i => i.name)].sort().reverse();
      expect(items.map(i => i.name)).toEqual(sortedNames); // ✅ Name descending
    }

    if (option === 'lohi') {
      const sortedPrices = [...items.map(i => i.price)].sort((a, b) => a - b);
      expect(items.map(i => i.price)).toEqual(sortedPrices); // ✅ Price low to high
    }

    if (option === 'hilo') {
      const sortedPrices = [...items.map(i => i.price)].sort((a, b) => b - a);
      expect(items.map(i => i.price)).toEqual(sortedPrices); // ✅ Price high to low
    }
  }
}



export default InventoryPage;