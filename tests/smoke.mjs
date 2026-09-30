import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
const base = process.env.TEST_URL || "http://localhost:3097";
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await mkdir("test-results", { recursive: true });
try {
  assert.equal((await page.request.get(`${base}/api/device`)).status(), 401);
  assert.equal(
    (
      await page.request.post(`${base}/api/login`, {
        data: { email: "bad", password: "" },
      })
    ).status(),
    400,
  );
  await page.goto(`${base}/guardian`);
  await page.waitForURL("**/login");
  await page.goto(base);
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page.getByRole("link", { name: "Guardian Login", exact: true }).click();
  await page.getByLabel("Email address").fill("demo@medalert.test");
  await page.getByLabel("Password", { exact: true }).fill("wrong");
  await page.getByRole("button", { name: "Sign in to Guardian" }).click();
  await page.getByRole("alert").filter({ hasText: "isn't right" }).waitFor();
  await page.screenshot({
    path: "test-results/login-error.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: /Use demo credentials/ }).click();
  await page.getByRole("button", { name: "Sign in to Guardian" }).click();
  await page.waitForURL("**/guardian");
  await page.getByText("72%", { exact: true }).waitFor();
  assert.equal((await page.request.get(`${base}/api/device`)).status(), 200);
  await page.getByRole("button", { name: "Refresh status" }).click();
  await page.getByRole("button", { name: "Refresh status" }).waitFor();
  await page.screenshot({
    path: "test-results/dashboard-desktop.png",
    fullPage: true,
  });
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ["/guardian", "/login", "/"]) {
      await page.goto(`${base}${route}`);
      await page.waitForLoadState("networkidle");
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${route} overflows at ${width}`,
      );
      await page.screenshot({
        path: `test-results/${route.replace("/", "") || "home"}-${width}.png`,
        fullPage: true,
      });
    }
  }
  await page.goto(`${base}/guardian`);
  await page.getByRole("button", { name: "Sign out" }).click();
  await page.waitForURL("**/login");
  assert.equal((await page.request.get(`${base}/api/device`)).status(), 401);
  assert.deepEqual(errors, []);
  console.log(
    "PASS: API authorization, validation, failed/successful login, refresh, logout, desktop/mobile, zero browser errors.",
  );
} finally {
  await browser.close();
}
