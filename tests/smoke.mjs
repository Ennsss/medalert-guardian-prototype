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
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.getByRole("heading", { level: 1 }).count(), 1);
  assert.equal(await page.locator(".faq-list details").count(), 5);
  await page.getByRole("button", { name: "Show pendant", exact: true }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "Show pendant", exact: true })
      .getAttribute("aria-pressed"),
    "true",
  );
  await page
    .getByRole("img", {
      name: "MedAlert PLUS with its pendant attachment",
      exact: true,
    })
    .waitFor();
  await page
    .getByRole("button", { name: "Show side view", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  assert.equal(
    await page
      .getByRole("button", { name: "Show side view", exact: true })
      .getAttribute("aria-pressed"),
    "true",
  );
  const question = page.locator(".faq-list summary").first();
  await question.focus();
  await page.keyboard.press("Enter");
  assert.equal(
    await page.locator(".faq-list details").first().getAttribute("open"),
    "",
  );
  await page.keyboard.press("Enter");
  for (const img of await page.locator("main img").all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((element) => element.decode());
  }
  for (const link of await page.locator(".home-desktop-nav a").all()) {
    const target = await link.getAttribute("href");
    assert.equal(await page.locator(target).count(), 1);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page.screenshot({ path: "test-results/home-hero.png" });
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
  await page.route("**/api/device", (route) =>
    route.fulfill({ status: 503, body: "Unavailable" }),
  );
  await page.getByRole("button", { name: "Refresh status" }).click();
  await page
    .getByRole("alert")
    .filter({ hasText: "couldn't be loaded" })
    .waitFor();
  await page.unroute("**/api/device");
  await page.getByRole("button", { name: "Refresh status" }).click();
  await page.locator(".form-error").waitFor({ state: "hidden" });
  await page.getByRole("button", { name: "Refresh status" }).waitFor();
  assert.equal(await page.locator(".form-error").count(), 0);
  await page.screenshot({
    path: "test-results/dashboard-desktop.png",
    fullPage: true,
  });
  for (const width of [820, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ["/guardian", "/login", "/"]) {
      await page.goto(`${base}${route}`);
      await page.waitForLoadState("networkidle");
      if (route === "/guardian" && width === 390) {
        await page.getByText("72%", { exact: true }).waitFor();
        await page.screenshot({
          path: "test-results/guardian-preview-mobile.png",
        });
      }
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${route} overflows at ${width}`,
      );
      if (route === "/") {
        const menu = page.getByRole("button", {
          name: "Open navigation",
          exact: true,
        });
        await menu.click();
        assert.equal(
          await page
            .getByRole("navigation", { name: "Mobile navigation" })
            .isVisible(),
          true,
        );
        await page.keyboard.press("Escape");
        assert.equal(
          await page
            .getByRole("navigation", { name: "Mobile navigation" })
            .isVisible(),
          false,
        );
        assert.equal(
          await menu.evaluate((element) => element === document.activeElement),
          true,
        );
        await menu.click();
        await page
          .getByRole("navigation", { name: "Mobile navigation" })
          .getByRole("link", { name: "Questions", exact: true })
          .click();
        assert.equal(
          await page
            .getByRole("navigation", { name: "Mobile navigation" })
            .isVisible(),
          false,
        );
        await page.waitForURL("**/#questions");
        for (const img of await page.locator("main img").all()) {
          await img.scrollIntoViewIfNeeded();
          await img.evaluate((element) => element.decode());
        }
        await page.evaluate(() =>
          window.scrollTo({ top: 0, behavior: "instant" }),
        );
        await page.screenshot({ path: `test-results/home-hero-${width}.png` });
      }
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
    "PASS: product gallery, keyboard FAQ, mobile navigation, image loading, API authorization, validation, failed/successful login, refresh, logout, desktop/tablet/mobile, zero browser errors.",
  );
} finally {
  await browser.close();
}
