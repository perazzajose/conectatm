// Saca portada.html a PNG de 1640 x 624 con el Chromium de Playwright.
// Uso, desde la raíz del repo: node reels/portada-facebook/sacar-png.cjs
const path = require("path");
const { chromium } = require("@playwright/test");
(async () => {
  const dir = __dirname;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1640, height: 624 }, deviceScaleFactor: 1 });
  await page.goto(require("url").pathToFileURL(path.join(dir, "portada.html")).href);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(dir, "portada-facebook.png") });
  // Vista de cómo se ve en el celular (solo el centro)
  await page.screenshot({ path: path.join(dir, "vista-celular.png"), clip: { x: 265, y: 0, width: 1109, height: 624 } });
  await browser.close();
})();
