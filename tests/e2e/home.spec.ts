import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should render correctly and navigate to dashboard', async ({ page }) => {
    // Va à la page d'accueil
    await page.goto(process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000')

    // Screenshot global de la page d'accueil
    await page.screenshot({ path: 'tests/e2e/screenshots/homepage.png', fullPage: true });

    // Vérifie que le logo est visible
    const logo = page.locator('img[alt="EffiTask Logo"]');
    await expect(logo).toBeVisible();

    // Vérifie le titre
    await expect(page.getByRole('heading', { name: 'Your Task Manager' })).toBeVisible();

    // Vérifie le texte de description
    await expect(page.locator('text=Welcome to EffiTask!')).toBeVisible();

    // Vérifie le lien vers la page des tâches
    const dashboardLink = page.getByRole('link', { name: 'Go to Task Dashboard' });
    await expect(dashboardLink).toHaveAttribute('href', '/tasks');

    // Clique et vérifie la redirection
    await dashboardLink.click();
    await expect(page).toHaveURL(/\/tasks/);

    // Screenshot après redirection
    await page.screenshot({ path: 'tests/e2e/screenshots/tasks-page.png', fullPage: true });
  });
});
