import { test, expect } from '@playwright/test';

//set USER_NAME=me&& set PASSWORD=secret&&npx playwright test /tests/testenvdata.spec.ts

test('Verify base URL is loaded correctly', async ({ page,baseURL }) => {
  //console.log('Running on environment:', process.env.USER_NAME);
  //console.log('Base URL:', process.env.PASSWORD);
  console.log('Base URL:', baseURL);
  page.goto('/');
  page.waitForTimeout(10000);
});
