import { test, expect } from '@playwright/test';
//set key=prabhu && npx playwright test /tests/testenv.spec.ts
test('Verify base URL is loaded correctly', async ({ page }) => {
  console.log('Running on environment:', process.env.ENV);
  console.log('Base URL:', process.env.BASE_URL);
  console.log('APIKEY:', process.env.API_KEY);

 
});
