import { chromium, Browser, BrowserContext, Page } from 'playwright';

async function tc1() {
  // 1️⃣ Launch a new browser instance
  const browser: Browser = await chromium.launch({ headless: false });
  // headless: false => browser window will be visible

  // 2️⃣ Create a new context (like a fresh browser profile)
  const context: BrowserContext = await browser.newContext();

  // 3️⃣ Create a new page (tab) inside the context
  const page: Page = await context.newPage();
await page.setViewportSize({ width:500, height: 500 });
  // 4️⃣ Perform actions on the page
  await page.goto('https://playwright.dev/docs/intro');
  console.log('Page title:', await page.title());
  await page.setDefaultNavigationTimeout(100);
  await page.waitForTimeout(5000)
  await page.screenshot({
    path: 'demo/screenshot/example1.png',
    fullPage: false,
    type: 'png',
    omitBackground: true
  });
  await page.close(); 
  // 5️⃣ Close everything
  await context.close();  // closes the context (all tabs inside it)
  await browser.close();  // closes the entire browser
}

async function tc2() {
  // 1️⃣ Launch a new browser instance
  const browser: Browser = await chromium.launch({ headless: false });
  // headless: false => browser window will be visible

  // 2️⃣ Create a new context (like a fresh browser profile)
  const context: BrowserContext = await browser.newContext();

  // 3️⃣ Create a new page (tab) inside the context
  const page: Page = await context.newPage();

  // 4️⃣ Perform actions on the page
  await page.goto('https://playwright.dev/docs/intro');
  console.log('Page title:', await page.title());

  await page.waitForTimeout(5000)


  // 5️⃣ Close everything
  await context.close();  // closes the context (all tabs inside it)
  await browser.close();  // closes the entire browser
}

async function tc3() {
  // 1️⃣ Launch a new browser instance
  const browser: Browser = await chromium.launch({ headless: false });
  // headless: false => browser window will be visible

  // 2️⃣ Create a new context (like a fresh browser profile)
  const context: BrowserContext = await browser.newContext();

  // 3️⃣ Create a new page (tab) inside the context
  const page1: Page = await context.newPage();
  const page2: Page = await context.newPage();

  // 4️⃣ Perform actions on the page
  await page1.goto('https://playwright.dev/docs/intro');
  console.log('Page title:', await page1.title());

  //await page2.goto('https://pladffywright.dev/docs/intro');
  //console.log('Page title:', await page2.title());

  await page1.waitForTimeout(5000)

  await page1.close()


  // 5️⃣ Close everything
  //await context.close();  // closes the context (all tabs inside it)
 // await browser.close();  // closes the entire browser
}



tc1();