
//import { test, expect } from '@playwright/test';
import { test, expect, Browser, BrowserContext, Page, chromium } from '@playwright/test';

//test.use({ viewport: { width: 200, height: 100 } });

test.describe.configure({ mode: 'serial' });

test('TC1', async ({ page }) => {

 /* const { FOO, BAR } = process.env;
  console.log('FOO:', FOO);
  console.log('BAR:', BAR);
  console.log('FOO1:', process.env.FOO);
  console.log('BAR1:', process.env.BAR);

  // FOO and BAR properties are populated.
  expect(FOO).toEqual('some data');

  //const complexData = JSON.parse(BAR);
  expect(BAR).toEqual({ some: 'data' });*/

  //page1:Page = context.newPage();

  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  console.log('✅ Page title verified.');
  await expect(page,"Validating the page Title").toHaveURL('https://www.saucedemo.com/');
  console.log('✅ Login page URL verified.');
    let form =  page.locator('//form');
 await form.locator('#user-name').fill('standard_user');
 await form.locator('#password').fill('secret_sauce');
 await form.locator('#login-button').click({force:true}) 
  // 5️⃣ Assert Navigation to Inventory Page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  console.log('✅ Successfully navigated to Inventory page.');

  // 6️⃣ Assert Page Title remains same
  await expect(page).toHaveTitle('Swag Labs');
  console.log('✅ Title remains "Swag Labs" after login.');
  await page.waitForTimeout(5000); // just to visually confirm the login during demo

 
});


test('TC2', async ({ page }) => {

 /* const { FOO, BAR } = process.env;
  console.log('FOO:', FOO);
  console.log('BAR:', BAR);
  console.log('FOO1:', process.env.FOO);
  console.log('BAR1:', process.env.BAR);

  // FOO and BAR properties are populated.
  expect(FOO).toEqual('some data');

  //const complexData = JSON.parse(BAR);
  expect(BAR).toEqual({ some: 'data' });*/

  //page1:Page = context.newPage();

  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  console.log('✅ Page title verified.');
  await expect(page,"Validating the page Title").toHaveURL('https://www.saucedemo.com/');
  console.log('✅ Login page URL verified.');
    let form =  page.locator('//form');
 await form.locator('#user-name').fill('standard_user');
 await form.locator('#password').fill('secret_sauce');
 await form.locator('#login-button').click({force:true}) 
  // 5️⃣ Assert Navigation to Inventory Page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  console.log('✅ Successfully navigated to Inventory page.');

  // 6️⃣ Assert Page Title remains same
  await expect(page).toHaveTitle('Swag Labs');
  console.log('✅ Title remains "Swag Labs" after login.');
  await page.waitForTimeout(5000); // just to visually confirm the login during demo

 
});


test('TC3', async ({ page }) => {

 /* const { FOO, BAR } = process.env;
  console.log('FOO:', FOO);
  console.log('BAR:', BAR);
  console.log('FOO1:', process.env.FOO);
  console.log('BAR1:', process.env.BAR);

  // FOO and BAR properties are populated.
  expect(FOO).toEqual('some data');

  //const complexData = JSON.parse(BAR);
  expect(BAR).toEqual({ some: 'data' });*/

  //page1:Page = context.newPage();

  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  console.log('✅ Page title verified.');
  await expect(page,"Validating the page Title").toHaveURL('https://www.saucedemo.com/');
  console.log('✅ Login page URL verified.');
    let form =  page.locator('//form');
 await form.locator('#user-name').fill('standard_user');
 await form.locator('#password').fill('secret_sauce');
 await form.locator('#login-button').click({force:true}) 
  // 5️⃣ Assert Navigation to Inventory Page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  console.log('✅ Successfully navigated to Inventory page.');

  // 6️⃣ Assert Page Title remains same
  await expect(page).toHaveTitle('Swag Labs');
  console.log('✅ Title remains "Swag Labs" after login.');
  await page.waitForTimeout(5000); // just to visually confirm the login during demo

 
});


test('TC4', async ({ page }) => {

 /* const { FOO, BAR } = process.env;
  console.log('FOO:', FOO);
  console.log('BAR:', BAR);
  console.log('FOO1:', process.env.FOO);
  console.log('BAR1:', process.env.BAR);

  // FOO and BAR properties are populated.
  expect(FOO).toEqual('some data');

  //const complexData = JSON.parse(BAR);
  expect(BAR).toEqual({ some: 'data' });*/

  //page1:Page = context.newPage();

  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  console.log('✅ Page title verified.');
  await expect(page,"Validating the page Title").toHaveURL('https://www.saucedemo.com/');
  console.log('✅ Login page URL verified.');
    let form =  page.locator('//form');
 await form.locator('#user-name').fill('standard_user');
 await form.locator('#password').fill('secret_sauce');
 await form.locator('#login-button').click({force:true}) 
  // 5️⃣ Assert Navigation to Inventory Page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  console.log('✅ Successfully navigated to Inventory page.');

  // 6️⃣ Assert Page Title remains same
  await expect(page).toHaveTitle('Swag Labs');
  console.log('✅ Title remains "Swag Labs" after login.');
  await page.waitForTimeout(5000); // just to visually confirm the login during demo

 
});

test('TC5', async ({ page }) => {

 /* const { FOO, BAR } = process.env;
  console.log('FOO:', FOO);
  console.log('BAR:', BAR);
  console.log('FOO1:', process.env.FOO);
  console.log('BAR1:', process.env.BAR);

  // FOO and BAR properties are populated.
  expect(FOO).toEqual('some data');

  //const complexData = JSON.parse(BAR);
  expect(BAR).toEqual({ some: 'data' });*/

  //page1:Page = context.newPage();

  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  console.log('✅ Page title verified.');
  await expect(page,"Validating the page Title").toHaveURL('https://www.saucedemo.com/');
  console.log('✅ Login page URL verified.');
    let form =  page.locator('//form');
 await form.locator('#user-name').fill('standard_user');
 await form.locator('#password').fill('secret_sauce');
 await form.locator('#login-button').click({force:true}) 
  // 5️⃣ Assert Navigation to Inventory Page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  console.log('✅ Successfully navigated to Inventory page.');

  // 6️⃣ Assert Page Title remains same
  await expect(page).toHaveTitle('Swag Labs');
  console.log('✅ Title remains "Swag Labs" after login.');
  await page.waitForTimeout(5000); // just to visually confirm the login during demo

 
});

