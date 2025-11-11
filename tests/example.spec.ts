import { test, expect } from '@playwright/test';
import { time } from 'console';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { loadEnvFile } from 'process';

/*test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});*/


test(
  "TC1", async ()=>{

     // 1️⃣ Launch a new browser instance
      const browser: Browser = await chromium.launch({ headless: false });
      // headless: false => browser window will be visible
    
      // 2️⃣ Create a new context (like a fresh browser profile)
      const context: BrowserContext = await browser.newContext();
    
      // 3️⃣ Create a new page (tab) inside the context
      const page: Page = await context.newPage();
    
      // 4️⃣ Perform actions on the page
      await page.goto('https://playwright.dev/docs/intro');

      await page.goto('https://playwright.dev/docs/intro',{timeout:50000,waitUntil:"networkidle"});



      //console.log('Page title:', await page.title());
      await page.waitForTimeout(5000)
      let title = await page.title()

      await page.screenshot({
        path: 'demo/screenshot/example1.png',
        fullPage: false,
        type: 'png',
        omitBackground: true
    });

      expect(title).toBe("Installation | Playwright");
      //expect(await page.title()).toBe("Installation | Playwright");

      await expect(page).toHaveTitle("Installation | Playwright",{timeout:50000});
      await expect(page).toHaveURL("https://www.cypress.io/");
    


     
    
      // 5️⃣ Close everything
      await context.close();  // closes the context (all tabs inside it)
      await browser.close();  // closes the entire browser


        await page.goto('amazon.com')
        //await page.waitForTimeout(2000)

        await page.getByLabel('Hello, Sign in Account & Lists').click();
        await page.getByLabel("Hello, Sign in Account & Lists").click({timeout:50000});
        await page.getByLabel("Hello, Sign in Account & Lists").fill('prabhu',{timeout:50000});


})


