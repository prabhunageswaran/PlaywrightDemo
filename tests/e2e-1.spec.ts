import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import {readCsv} from '../utils/csvreader';
import { it } from 'node:test';

test('E2E flow: add one item and complete checkout', async ({ page }) => {

  const records: any[] = await readCsv('inputs.csv');
  const record = records.find((r: any) => r.test_case === "TC1");

  if (!record) {
    throw new Error("No record found for test_case = TC1");
  }
  console.log("record:",record);
// 3️⃣ Extract values
  const { item, subTotal, Tax, Total } = record;
  console.log("itemName:",item);
  console.log("item:",item);
  const itemName = item;

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOne = new CheckoutStepOnePage(page);
  const checkoutStepTwo = new CheckoutStepTwoPage(page);
  const completePage = new CheckoutCompletePage(page);

  // 1️⃣ Login
  await page.goto("/");
  //await loginPage.loginAsStandardUser
  await loginPage.login('standard_user', 'secret_sauce');

  // 2️⃣ Add one item to cart
  //const itemName = 'Sauce Labs Backpack';
  //const itemName1 = 'Sauce Labs dd';
  //const itemName = item;
  
  await inventoryPage.addToCart(itemName);
  //await inventoryPage.addToCart(itemName1);

  // Navigate to Cart
  await inventoryPage.goToCart();

  // 3️⃣ Validate item is present in cart
  await cartPage.verifyItemsInCart([itemName]);
  //await cartPage.verifyItemsInCart([itemName,itemName1]);

  // 4️⃣ Proceed to Checkout Step One
  await cartPage.clickCheckout();
  await checkoutStepOne.fillCheckoutInformation('John', 'Doe', '75001');

  // 5️⃣ Checkout Step Two validations
  await checkoutStepTwo.verifyItemsInSummary([itemName]);
  //await checkoutStepTwo.verifyPriceSummary(29.99, 2.40, 32.39); // Example: adjust based on real pricing
   await checkoutStepTwo.verifyPriceSummary(subTotal,Tax,Total); // Example: adjust based on real pricing
  await checkoutStepTwo.clickFinish();

  // 6️⃣ Checkout Complete
  await completePage.verifyOrderComplete();
  await completePage.clickBackHome();


});
