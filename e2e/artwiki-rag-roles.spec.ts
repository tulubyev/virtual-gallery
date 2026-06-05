import { test, expect, Page } from '@playwright/test';

/**
 * E2E tests: ArtWiki and RAG pages — all authenticated roles
 *
 * Both /artwiki and /rag are PUBLIC routes in React Router (App.tsx).
 * All 5 roles (admin, curator, staff, tour_guide, auction_participant)
 * have these links in their roleNav (Header.tsx).
 *
 * Role simulation: App.tsx reads `currentUser` from localStorage on mount
 * (hydration implemented alongside these tests). Tests inject a fake user
 * via page.addInitScript() so the Header renders that role's nav before
 * the first paint.
 */

const ROLES = [
  'admin',
  'curator',
  'staff',
  'tour_guide',
  'auction_participant',
] as const;

type Role = typeof ROLES[number];

/**
 * Inject a fake authenticated user into localStorage BEFORE React mounts.
 * App.tsx reads `authToken` + `currentUser` from localStorage on mount and
 * calls setCurrentUser(), so Header receives the role and shows roleNav.
 */
async function injectUser(page: Page, role: Role) {
  await page.addInitScript((r) => {
    const fakeUser = {
      id: 'test-' + r,
      username: 'Test ' + r,
      email: r + '@test.example',
      role: r,
    };
    localStorage.setItem('authToken', 'fake-token-' + r);
    localStorage.setItem('currentUser', JSON.stringify(fakeUser));
  }, role);
}

// ─── ArtWiki page — page content ──────────────────────────────────────────

test.describe('ArtWiki page (/artwiki) — page content', () => {

  test('loads without errors for unauthenticated visitors', async ({ page }) => {
    await page.goto('/artwiki');
    await expect(page.locator('h1')).toContainText('ArtWiki');
    await expect(page.getByText('Энциклопедия искусства')).toBeVisible();
    await expect(page.getByText('AI Ассистент')).toBeVisible();
    await expect(page.getByPlaceholder('Спросите об искусстве...')).toBeVisible();
    await expect(page.getByText('Виды искусства')).toBeVisible();
  });

  test('does not redirect to /login (accessible to all roles)', async ({ page }) => {
    await page.goto('/artwiki');
    await expect(page).toHaveURL(/\/artwiki/);
    await expect(page.locator('h1')).toContainText('ArtWiki');
  });

  test('AI status indicator is rendered', async ({ page }) => {
    await page.goto('/artwiki');
    const status = page.locator('text=/Онлайн|Демо-режим|Проверка/');
    await expect(status.first()).toBeVisible({ timeout: 8000 });
  });

  test('museum cards section is visible', async ({ page }) => {
    await page.goto('/artwiki');
    await expect(page.getByText('Мировые музеи и коллекции').first()).toBeVisible();
  });

  test('quick question button sends message to chat', async ({ page }) => {
    await page.goto('/artwiki');
    await page.getByRole('button', { name: 'Что такое импрессионизм?' }).click();
    await expect(
      page.locator('text=Что такое импрессионизм?').first()
    ).toBeVisible({ timeout: 5000 });
  });

  test('topic card "Техники" sends correct question to chat', async ({ page }) => {
    await page.goto('/artwiki');
    await page.getByRole('button', { name: /Техники/ }).first().click();
    await expect(
      page.locator('text=Какие техники живописи существуют?').first()
    ).toBeVisible({ timeout: 5000 });
  });
});

// ─── ArtWiki page — per-role access ───────────────────────────────────────

test.describe('ArtWiki page (/artwiki) — per-role access', () => {
  for (const role of ROLES) {
    test(`role "${role}": /artwiki loads without errors`, async ({ page }) => {
      await injectUser(page, role);
      await page.goto('/artwiki');
      await expect(page.locator('h1')).toContainText('ArtWiki');
      await expect(page.getByText('AI Ассистент')).toBeVisible();
      await expect(page.getByPlaceholder('Спросите об искусстве...')).toBeVisible();
    });
  }
});

// ─── ArtWiki page — per-role nav link ─────────────────────────────────────

test.describe('ArtWiki page — "ArtWiki" nav link present for each role', () => {
  for (const role of ROLES) {
    test(`role "${role}": header shows "ArtWiki" nav link`, async ({ page }) => {
      await injectUser(page, role);
      await page.goto('/artwiki');
      // Allow React to re-render once localStorage user is hydrated
      await page.waitForTimeout(300);
      const navLink = page.locator('header').getByRole('link', { name: 'ArtWiki' });
      await expect(navLink).toBeVisible();
    });
  }

  for (const role of ROLES) {
    test(`role "${role}": header shows "RAG" nav link`, async ({ page }) => {
      await injectUser(page, role);
      await page.goto('/artwiki');
      await page.waitForTimeout(300);
      const navLink = page.locator('header').getByRole('link', { name: 'RAG' });
      await expect(navLink).toBeVisible();
    });
  }
});

// ─── RAG page — page content ───────────────────────────────────────────────

test.describe('RAG page (/rag) — page content', () => {

  test('loads without errors for unauthenticated visitors', async ({ page }) => {
    await page.goto('/rag');
    await expect(page.locator('h1')).toContainText('RAG');
    await expect(page.getByText('Управление знаниями')).toBeVisible();
    await expect(page.getByText('Обработка документов')).toBeVisible();
    await expect(page.getByText('Перетащите PDF сюда')).toBeVisible();
  });

  test('does not redirect to /login (accessible to all roles)', async ({ page }) => {
    await page.goto('/rag');
    await expect(page).toHaveURL(/\/rag/);
    await expect(page.locator('h1')).toContainText('RAG');
  });

  test('category dropdown renders all 5 options', async ({ page }) => {
    await page.goto('/rag');
    const select = page.locator('select');
    await expect(select).toBeVisible();
    await expect(select.locator('option', { hasText: 'Автоопределение (AI)' })).toHaveCount(1);
    await expect(select.locator('option', { hasText: 'История искусства' })).toHaveCount(1);
    await expect(select.locator('option', { hasText: 'Техники и материалы' })).toHaveCount(1);
    await expect(select.locator('option', { hasText: 'Биографии художников' })).toHaveCount(1);
    await expect(select.locator('option', { hasText: 'Периоды и стили' })).toHaveCount(1);
  });

  test('category dropdown value can be changed', async ({ page }) => {
    await page.goto('/rag');
    await page.locator('select').selectOption('history');
    await expect(page.locator('select')).toHaveValue('history');
  });

  test('"Обработать документ" button is disabled when no file selected', async ({ page }) => {
    await page.goto('/rag');
    const btn = page.getByRole('button', { name: /Обработать документ/ });
    await expect(btn).toBeVisible();
    await expect(btn).toBeDisabled();
  });

  test('recent documents section shows initial entries', async ({ page }) => {
    await page.goto('/rag');
    await expect(page.getByText('Недавние документы')).toBeVisible();
    await expect(page.getByText(/Импрессионизм_история\.pdf/)).toBeVisible();
  });
});

// ─── RAG page — per-role access ───────────────────────────────────────────

test.describe('RAG page (/rag) — per-role access', () => {
  for (const role of ROLES) {
    test(`role "${role}": /rag loads without errors`, async ({ page }) => {
      await injectUser(page, role);
      await page.goto('/rag');
      await expect(page.locator('h1')).toContainText('RAG');
      await expect(page.getByText('Обработка документов')).toBeVisible();
      await expect(page.getByText('Перетащите PDF сюда')).toBeVisible();
    });
  }
});

// ─── RAG page — per-role nav link ─────────────────────────────────────────

test.describe('RAG page — nav links present for each role', () => {
  for (const role of ROLES) {
    test(`role "${role}": header shows "ArtWiki" and "RAG" nav links on /rag`, async ({ page }) => {
      await injectUser(page, role);
      await page.goto('/rag');
      await page.waitForTimeout(300);
      await expect(page.locator('header').getByRole('link', { name: 'ArtWiki' })).toBeVisible();
      await expect(page.locator('header').getByRole('link', { name: 'RAG' })).toBeVisible();
    });
  }
});

// ─── Cross-page navigation per role ───────────────────────────────────────

test.describe('Cross-page navigation — each role can navigate ArtWiki ↔ RAG', () => {
  for (const role of ROLES) {
    test(`role "${role}": clicking RAG nav link from /artwiki navigates to /rag`, async ({ page }) => {
      await injectUser(page, role);
      await page.goto('/artwiki');
      await page.waitForTimeout(300);
      await page.locator('header').getByRole('link', { name: 'RAG' }).click();
      await expect(page).toHaveURL(/\/rag/);
      await expect(page.locator('h1')).toContainText('RAG');
    });

    test(`role "${role}": clicking ArtWiki nav link from /rag navigates to /artwiki`, async ({ page }) => {
      await injectUser(page, role);
      await page.goto('/rag');
      await page.waitForTimeout(300);
      await page.locator('header').getByRole('link', { name: 'ArtWiki' }).click();
      await expect(page).toHaveURL(/\/artwiki/);
      await expect(page.locator('h1')).toContainText('ArtWiki');
    });
  }
});
