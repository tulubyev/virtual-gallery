// Юридические документы торгов: разбор файлов, отпечаток версии, проверка принятия, маршруты /api/legal.
import fs from 'fs';
import os from 'os';
import path from 'path';
import express from 'express';
import request from 'supertest';
import { checkConsents, getLegalDoc, listLegalDocs, parseLegalDoc, LEGAL_DIR, LEGAL_SLUGS } from '../../services/legalDocs';
import legalRouter from '../../routes/legal';

const doc = (status: string, extra = '') => `---\ntitle: Тест\nversion: 1.0\nstatus: ${status}\n${extra}---\n\n# Текст\n`;

function tempDir(status = 'approved', effective = 'effective_from: 2026-12-01\n') {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'legal-'));
  for (const slug of LEGAL_SLUGS) fs.writeFileSync(path.join(dir, `${slug}.md`), doc(status, effective) + `\nДокумент ${slug}.\n`);   // тексты разные, значит, и отпечатки
  return dir;
}

describe('разбор документа', () => {
  it('свойства, статус, отпечаток и версия для записи в заявку', () => {
    const d = parseLegalDoc('auction-rules', doc('approved', 'effective_from: 2026-12-01\n'));
    expect(d).toMatchObject({ title: 'Тест', version: '1.0', status: 'approved', effective_from: '2026-12-01', markdown: '# Текст' });
    expect(d.sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(d.ref).toBe(`1.0#${d.sha256.slice(0, 8)}`);
  });

  it('любое изменение текста меняет отпечаток; перевод строк (CRLF) — нет', () => {
    const a = parseLegalDoc('auction-rules', doc('draft'));
    expect(parseLegalDoc('auction-rules', doc('draft').replace('Текст', 'Текст!')).sha256).not.toBe(a.sha256);
    expect(parseLegalDoc('auction-rules', doc('draft').replace(/\n/g, '\r\n')).sha256).toBe(a.sha256);
  });

  it('статус по умолчанию — черновик; ошибки: нет свойств, нет версии, утверждён без даты', () => {
    expect(parseLegalDoc('auction-rules', '---\ntitle: T\nversion: 1\n---\nтекст').status).toBe('draft');
    expect(parseLegalDoc('auction-rules', '---\ntitle: T\nversion: 1\nstatus: опечатка\n---\nx').status).toBe('draft');
    expect(() => parseLegalDoc('auction-rules', 'просто текст')).toThrow(/нет блока свойств/);
    expect(() => parseLegalDoc('auction-rules', '---\ntitle: T\n---\nx')).toThrow(/title и version/);
    expect(() => parseLegalDoc('auction-rules', doc('approved'))).toThrow(/effective_from/);
  });
});

describe('поставляемые документы', () => {
  it('все три документа есть, разбираются и пока имеют статус черновика (юрист не утвердил)', () => {
    const docs = listLegalDocs();
    expect(docs.map(d => d.slug)).toEqual([...LEGAL_SLUGS]);
    for (const d of docs) {
      expect(d.status).toBe('draft');
      expect(getLegalDoc(d.slug)!.markdown.length).toBeGreaterThan(200);
    }
  });

  it('правила описывают то, что делает движок: максимум, шаг, равные максимумы, один участник, продление', () => {
    const text = getLegalDoc('auction-rules')!.markdown;
    for (const phrase of ['максимум', 'побеждает участник, сделавший ставку раньше', 'ст. 447 п. 5', 'Приложение 1. Шаг ставки', '100 000 ₽']) expect(text).toContain(phrase);
  });

  it('согласие на обработку ПД — отдельный документ, не раздел правил', () => {
    expect(getLegalDoc('pd-consent')!.title).toMatch(/Согласие/);
    expect(getLegalDoc('auction-rules')!.markdown).not.toMatch(/Я, участник аукциона, свободно/);
  });
});

describe('getLegalDoc: безопасность имени и кэш', () => {
  it('имя вне списка и попытка выйти из каталога — null, файлы не читаются', () => {
    for (const bad of ['../package', '../../etc/passwd', 'auction-rules/../x', 'unknown', '', 'AUCTION-RULES', 'auction-rules.md']) expect(getLegalDoc(bad)).toBeNull();
  });

  it('правка файла подхватывается без перезапуска', () => {
    const file = path.join(LEGAL_DIR, 'pd-consent.md');
    const original = fs.readFileSync(file, 'utf8');
    const before = getLegalDoc('pd-consent')!.sha256;
    try {
      fs.writeFileSync(file, original + '\nДобавлено юристом.\n');
      fs.utimesSync(file, new Date(), new Date(Date.now() + 5000));
      expect(getLegalDoc('pd-consent')!.sha256).not.toBe(before);
    } finally {
      fs.writeFileSync(file, original);
      fs.utimesSync(file, new Date(), new Date(Date.now() + 10000));
    }
    expect(getLegalDoc('pd-consent')!.sha256).toBe(before);
  });
});

describe('checkConsents', () => {
  it('утверждённые и актуальные версии — можно', () => {
    const dir = tempDir();
    const rules = getLegalDoc('auction-rules', dir)!.ref, pd = getLegalDoc('pd-consent', dir)!.ref;
    expect(checkConsents(rules, pd, {}, dir)).toEqual({ ok: true });
  });

  it('черновик блокирует приём заявок, пока не задан флаг BIDDING_ALLOW_DRAFT_RULES', () => {
    const dir = tempDir('draft', '');
    const rules = getLegalDoc('auction-rules', dir)!.ref, pd = getLegalDoc('pd-consent', dir)!.ref;
    expect(checkConsents(rules, pd, {}, dir).code).toBe('rules_not_approved');
    expect(checkConsents(rules, pd, { BIDDING_ALLOW_DRAFT_RULES: 'false' }, dir).code).toBe('rules_not_approved');
    expect(checkConsents(rules, pd, { BIDDING_ALLOW_DRAFT_RULES: 'true' }, dir)).toEqual({ ok: true });
  });

  it('достаточно одного неутверждённого документа из трёх', () => {
    const dir = tempDir();
    fs.writeFileSync(path.join(dir, 'privacy-policy.md'), doc('draft') + '\nДокумент privacy-policy.\n');
    const rules = getLegalDoc('auction-rules', dir)!.ref, pd = getLegalDoc('pd-consent', dir)!.ref;
    expect(checkConsents(rules, pd, {}, dir).code).toBe('rules_not_approved');
  });

  it('устаревшая или чужая версия — отказ; нет файлов — недоступно', () => {
    const dir = tempDir();
    const rules = getLegalDoc('auction-rules', dir)!.ref, pd = getLegalDoc('pd-consent', dir)!.ref;
    expect(checkConsents('1.0#00000000', pd, {}, dir).code).toBe('rules_changed');
    expect(checkConsents(rules, '1.0#00000000', {}, dir).code).toBe('pd_changed');
    expect(checkConsents(undefined, undefined, {}, dir).code).toBe('rules_changed');
    expect(checkConsents(rules, rules, {}, dir).code).toBe('pd_changed');             // версия правил не годится как версия согласия
    expect(checkConsents(rules, pd, {}, fs.mkdtempSync(path.join(os.tmpdir(), 'empty-'))).code).toBe('docs_missing');
  });
});

describe('/api/legal', () => {
  const app = express().use('/api/legal', legalRouter);

  it('список без текста, документ с текстом; неизвестный — 404', async () => {
    const list = await request(app).get('/api/legal');
    expect(list.status).toBe(200);
    expect(list.body.documents.map((d: any) => d.slug)).toEqual([...LEGAL_SLUGS]);
    expect(JSON.stringify(list.body)).not.toContain('markdown');
    const one = await request(app).get('/api/legal/auction-rules');
    expect(one.body).toMatchObject({ slug: 'auction-rules', status: 'draft', title: 'Правила проведения аукционов' });
    expect(one.body.markdown).toContain('## 7. Порядок торгов');
    expect((await request(app).get('/api/legal/nope')).status).toBe(404);
    expect((await request(app).get('/api/legal/..%2Fpackage')).status).toBe(404);
  });
});
