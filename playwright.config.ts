import { defineConfig, devices } from '@playwright/test';

import * as dotenv from 'dotenv';
import * as path from 'path';

// Read environment from command line
// Example: npx playwright test --project=chromium --env=qa
const envName = process.env.ENV || 'uat';
//const envName = process.env.ENV;

// Build path to env file
const envFile = path.resolve(__dirname, `data/${envName}.env`);

// Load environment variables
dotenv.config({ path: envFile });

console.log(`✅ Loaded environment: ${envName} from ${envFile}`);
console.log(`🌍 Base URL: ${process.env.BASE_URL}`);



export default defineConfig({
  //globalSetup: require.resolve('./tests/global-setup'),

  testDir: './tests',

 
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */


  //retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  //reporter: [['junit', { outputFile: 'result.xml' }]],
  timeout: 30 * 1000,
  expect: { timeout: 10_000 },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
     //baseURL: 'https://www.saucedemo.com',
     baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    video: 'on',
  },

  /* Configure projects for major browsers */
  projects: [

    /*{
      name: 'setup db',
      testMatch: /global\.setup\.ts/,
      teardown: 'cleanup db',
    },
    {
      name: 'cleanup db',
      testMatch: /global\.teardown\.ts/,
    },*/



    {
      name: 'chromium',
      //use: { ...devices['Desktop Chrome'] },
      use: { browserName: 'chromium', channel: 'chromium' },
      //dependencies: ['setup db'],
     

    },
    /*{
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 13'],
      },
      
    }*/

   /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },*/

   /* {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      
    },*/
    /*{
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 13'],
      },
    },*

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
