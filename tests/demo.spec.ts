import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';

test.describe.configure({ mode: 'serial' });

test.describe("Demo Test Suite1",async ()=>{

test("TC1",async ({page})=>{
  await page.goto('https://www.saucedemo.com/');
   await expect(page).toHaveTitle('Swag Labs');
});

test("TC2",{tag: '@Regression'},async ({page})=>{
  await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');
    const login = new LoginPage(page);
    await login.login('standard_user', 'secret_sauce');
});


test.only("TC3",async ({page})=>{
   await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');
    const login = new LoginPage(page);
    await login.login('standard_user', 'secret_sauce');
});


});


test.describe("Demo Test Suite2",async ()=>{
  
test("TC1",async ({page})=>{
  await page.goto('https://www.saucedemo.com/');
   await expect(page).toHaveTitle('Swag Labs');
});

test("TC2",async ({page})=>{
  await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');
});


test("TC3",async ({page})=>{
  await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');
});


});

test("TC1", {
  tag: '@smoke',
}, async ({page,browserName})=>{

   await page.goto('/');
   await expect(page).toHaveTitle('Swag Labs');
});

test("TC2",async ({page})=>{
  await page.goto('/');
    await expect(page).toHaveTitle('Swag Labs');
});


test("TC3",async ({page})=>{
  await page.goto('/');
    await expect(page).toHaveTitle('Swag Labs');
});


