import { test, expect } from '@playwright/test';




[
  { name: 'Alice', expected: 'Hello, Alice!' },
  { name: 'Bob', expected: 'Hello, Bob!' },
  { name: 'Charlie', expected: 'Hello, Charlie!' },
].forEach   (({ name, expected }) => {
 
    console.log(`Creating test for ${name}`);
    console.log(`Creating test for ${expected}`);

    test(`TC1-testing with ${name}`, async ({ page }) => {
    await page.goto(`https://example.com/greet?name=${name}`);
    await expect(page.getByRole('heading')).toHaveText(expected);
  });

} )



