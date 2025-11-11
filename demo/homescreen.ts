import { chromium, Browser, BrowserContext, Page } from 'playwright';

async function tc1() {
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

  let title = await page.title();
  if (title === "Introduction | Playwright") {
    console.log("Title matched");
  } else {
    console.log("Title not matched");
  }


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
  const page: Page = await context.newPage();

  // 4️⃣ Perform actions on the page
  await page.goto('https://playwright.dev/docs/intro');
  console.log('Page title:', await page.title());

  await page.waitForTimeout(5000)


  // 5️⃣ Close everything
  await context.close();  // closes the context (all tabs inside it)
  await browser.close();  // closes the entire browser
}

tc1()



