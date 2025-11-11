import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test('E2E flow: add one item and complete checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOne = new CheckoutStepOnePage(page);
  const checkoutStepTwo = new CheckoutStepTwoPage(page);
  const completePage = new CheckoutCompletePage(page);

  // 1️⃣ Login
  await page.goto("/");
  await loginPage.login('standard_user', 'secret_sauce');

  // 2️⃣ Add one item to cart
  const itemName = 'Sauce Labs Backpack';
  await inventoryPage.addToCart(itemName);

  // Navigate to Cart
  await inventoryPage.goToCart();

  // 3️⃣ Validate item is present in cart
  await cartPage.verifyItemsInCart([itemName]);

  // 4️⃣ Proceed to Checkout Step One
  await cartPage.clickCheckout();
  await checkoutStepOne.fillCheckoutInformation('John', 'Doe', '75001');

  // 5️⃣ Checkout Step Two validations
  await checkoutStepTwo.verifyItemsInSummary([itemName]);
  await checkoutStepTwo.verifyPriceSummary(29.99, 2.40, 32.39); // Example: adjust based on real pricing
  await checkoutStepTwo.clickFinish();

  // 6️⃣ Checkout Complete
  await completePage.verifyOrderComplete();
  await completePage.clickBackHome();


});
