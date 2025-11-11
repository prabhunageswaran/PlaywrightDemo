import { test, expect } from '@playwright/test';

test('Mouse and Keyboard Demo', async ({ page }) => {
  await page.goto('http://localhost:3000/mouse-keyboard-demo.html');

  //  Keyboard typing
  await page.fill('#username', '');
  await page.keyboard.type('Prabhu Nageswaran', { delay: 100 });

  await page.click('#comments');
  await page.keyboard.insertText('Playwright test automation is fun!');
  await page.keyboard.press('Enter');
  await page.keyboard.type('Learning mouse and keyboard actions.');

  //  Drag and Drop using mouse
  const drag = await page.locator('#drag1').boundingBox();
  const drop = await page.locator('#dropzone').boundingBox();

  if (drag && drop) {
    await page.mouse.move(drag.x + drag.width / 2, drag.y + drag.height / 2);
    await page.mouse.down();
    await page.mouse.move(drop.x + drop.width / 2, drop.y + drop.height / 2);
    await page.mouse.up();
  }

  //  Verify drop result
  await expect(page.locator('#dropzone')).toHaveText('✅ Dropped!');
});
