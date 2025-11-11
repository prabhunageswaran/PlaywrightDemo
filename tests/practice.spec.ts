import { test, expect } from '@playwright/test';

test('Locator Actions Complete Demo', async ({ page }) => {

  // Load local HTML file (adjust path as needed)
  await page.goto('file:///C:/users/ntani/Desktop/study/playwright_practice.html');

  // --- 1. allInnerTexts() and allTextContents() ---
  const texts = await page.locator('.menu li').allInnerTexts();
  console.log('Visible Texts:', texts);

  const allTexts = await page.locator('.menu li').allTextContents();
  console.log('All Texts (including hidden):', allTexts);

  // --- 2. filter(), first(), last(), nth() ---
  await page.locator('li').filter({ hasText: 'Contact' }).click();
  await page.locator('li').first();
  await page.locator('li').last();
  await page.locator('li').nth(1);

  // --- 3. getAttribute(), innerHTML(), innerText(), textContent() ---
  const placeholder = await page.locator('input[name="firstname"]').getAttribute('placeholder');
  console.log('Placeholder:', placeholder);

  const html = await page.locator('#form-section').innerHTML();
  console.log('Inner HTML length:', html.length);

  const headingText = await page.locator('#main-title').innerText();
  console.log('Heading Text:', headingText);

  const rawText = await page.locator('#main-title').textContent();
  console.log('Raw Text Content:', rawText);

  // --- 4. inputValue() ---
  await page.locator('input[name="firstname"]').fill('Prabhu');
  const val = await page.locator('input[name="firstname"]').inputValue();
  console.log('Input Value:', val);

  // --- 5. setChecked(), isChecked(), uncheck() ---
  await page.locator('#agree').setChecked(true);
  console.log('Is Checked:', await page.locator('#agree').isChecked());
  await page.locator('#agree').uncheck();

  // --- 6. selectOption() ---
  await page.locator('#country').selectOption('US');
  await page.locator('#country').selectOption({ label: 'India' });
  expect(await page.locator('#country').inputValue()).toBe('IN');

  // --- 7. selectText() ---
  await page.locator('input[name="lastname"]').selectText();

  // --- 8. setInputFiles() ---
  await page.locator('#upload').setInputFiles('tests/data/sample.txt'); // create file if missing

await page.waitForTimeout(10000); // just to visually confirm during demo


  // --- 9. isDisabled(), isEditable(), isEnabled(), isHidden(), isVisible() ---
  console.log('Is Disabled:', await page.locator('#disabled-btn').isDisabled());
  console.log('Is Editable:', await page.locator('#comments').isEditable());
  console.log('Is Enabled:', await page.locator('#submit').isEnabled());
  console.log('Is Hidden:', await page.locator('#hidden-section').isHidden());
  console.log('Is Visible:', await page.locator('#form-section').isVisible());



  // --- 10. frameLocator() ---
  const frame = page.frameLocator('#demo-frame');
  const insideValue = await frame.locator('#frame-input').inputValue();
  console.log('Iframe Value:', insideValue);

  // --- 11. locator() ---
  const form = page.locator('#demo-form');
  const submitBtn = form.locator('#submit');
  await expect(submitBtn).toBeVisible();

  // --- 12. or() ---
  const submitOrDisabled = page.locator('#submit').or(page.locator('#disabled-btn'));
  await expect(submitOrDisabled.first()).toBeVisible();

  // --- 13. tap() ---
 // await page.locator('#submit').tap(); // works like click for mobile

});
