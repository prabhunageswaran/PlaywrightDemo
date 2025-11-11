
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { test } from "@playwright/test";

// 1️⃣ Read and parse the CSV
const records = parse(
fs.readFileSync(path.join(__dirname, "inputs.csv")), {
columns: true,
skip_empty_lines: true,
}
);

// 2️⃣ Find the single row with test_case = "TC1"


// 4️⃣ Use in your Playwright test
test(`TC1`, async ({ page }) => {
const record = records.find((r: any) => r.test_case === "TC1");

if (!record) {
throw new Error("No record found for test_case = TC1");
}

// 3️⃣ Extract values
const { item, subTotal, Tax, Total } = record;
console.log("Item:", item);
console.log("Subtotal:", subTotal);
console.log("Tax:", Tax);
console.log("Total:", Total);

// Example usage inside test:
// await page.goto('https://example.com');
// await page.fill('#item-input', item);
});


test.only(`TC2`, async ({ page }) => {
const record = records.find((r: any) => r.test_case === "TC2");

if (!record) {
throw new Error("No record found for test_case = TC2");
}

// 3️⃣ Extract values
const { item, subTotal, Tax, Total } = record;
console.log("Item:", item);
console.log("Subtotal:", subTotal);
console.log("Tax:", Tax);
console.log("Total:", Total);

// Example usage inside test:
// await page.goto('https://example.com');
// await page.fill('#item-input', item);
});