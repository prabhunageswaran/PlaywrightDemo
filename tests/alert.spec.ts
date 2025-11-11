import { test, expect } from '@playwright/test';

test('Handle alert, confirm, and prompt dialogs', async ({ page }) => {
  // Option A: If you host the HTML, use goto
  // await page.goto('c:/dialog-demo.html');

  // Option B: Set the HTML content directly (for demo)
  await page.setContent(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Dialog Demo</title>
      <script>
        function showAlert() {
          alert("This is an alert popup!");
        }
        function showConfirm() {
          const result = confirm("Do you confirm this action?");
          document.getElementById('confirmResult').textContent = "Confirm result: " + result;
        }
        function showPrompt() {
          const name = prompt("Enter your name:", "John Doe");
          document.getElementById('promptResult').textContent = "Prompt result: " + name;
        }
      </script>
    </head>
    <body>
      <button id="alertBtn" onclick="showAlert()">Show Alert</button>
      <button id="confirmBtn" onclick="showConfirm()">Show Confirm</button>
      <button id="promptBtn" onclick="showPrompt()">Show Prompt</button>

      <p id="confirmResult">Confirm result: </p>
      <p id="promptResult">Prompt result: </p>
    </body>
    </html>
  `);

 // just to visually confirm the page load during demo

  // --- 1️⃣ Handle Alert ---
  page.once('dialog', async dialog => {
    console.log('Alert message:', dialog.message());
    expect(dialog.type()).toBe('alert');
    await dialog.accept();
  });
   await page.waitForTimeout(2000); 
  await page.click('#alertBtn');
   await page.waitForTimeout(5000);



  // --- 2️⃣ Handle Confirm (we choose to cancel / dismiss) ---
  page.once('dialog', async dialog => {
    console.log('Confirm message:', dialog.message());
    expect(dialog.type()).toBe('confirm');
    await dialog.dismiss();  // click "Cancel"
  });
  await page.click('#confirmBtn');
    //page.waitForTimeout(5000);
  // After dismiss, the page writes “Confirm result: false”
  await expect(page.locator('#confirmResult')).toHaveText('Confirm result: false');

  // --- 3️⃣ Handle Prompt (we provide input) ---
  const nameToEnter = 'Alice';
  page.once('dialog', async dialog => {
    console.log('Prompt message:', dialog.message());
    expect(dialog.type()).toBe('prompt');
    // Accept and provide “Alice”

    await dialog.accept(nameToEnter);
  });
  await page.click('#promptBtn');
  // After prompt, the page writes “Prompt result: Alice”
  await expect(page.locator('#promptResult')).toHaveText(`Prompt result: ${nameToEnter}`);
});
