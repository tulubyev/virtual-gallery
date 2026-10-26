#!/usr/bin/env node
// Проверка ссылок реестра источников (docs/art-sources/sources.tsv) с того места, где запущен скрипт.
// Нужна для строк, которые не открывались из облачной среды: запускать с VPS или другого российского IP.
//
//   node scripts/check-art-sources.mjs --unreachable            # только строки с пометкой «недоступно из облачной среды»
//   node scripts/check-art-sources.mjs --ids rus-001,rus-002    # выбранные строки
//   node scripts/check-art-sources.mjs --all                    # весь реестр
//
// Что делает: для каждого домена читает robots.txt, для каждой строки открывает ТОЛЬКО страницу из колонки url,
// и только если robots.txt её не запрещает. Пауза между запросами к одному домену не короче 3 секунд
// (или Crawl-delay, если он больше), до 3 доменов одновременно. На 403/429/5xx домен останавливается.
// Капчи, защиту и запреты не обходит. Реестр не изменяет: результат пишет в отдельный TSV.
// Дополнительно сохраняет «улики» для аннотаций (art-sources-evidence-*.json): правила robots.txt для нашего агента и ИИ-ботов,
// ссылки на условия и лицензии, ленты, формы поиска и короткие фрагменты условий. --no-terms отключает чтение страниц условий.
// Зависимостей нет (Node 18+).

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pageEvidence, robotsEvidence, termsSnippets } from './art-sources-evidence.mjs';

const UA = 'VirtualGalleryResearchBot/1.0 (+https://virtgal.ru; research of public art sources)';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY = path.join(ROOT, 'docs/art-sources/sources.tsv');
const TIMEOUT_MS = 20000;
const MAX_BYTES = 200 * 1024;
const MIN_DELAY_S = 3;
const DOMAIN_PARALLEL = 3;

// ---------- разбор TSV ----------

export function parseTsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else quoted = false;
      } else field += c;
    } else if (c === '"' && field === '') quoted = true;
    else if (c === '\t') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  const [head, ...body] = rows;
  return body.filter((r) => r.length > 1).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])));
}

const tsvCell = (v) => String(v ?? '').replace(/[\t\r\n]+/g, ' ').trim();

// ---------- robots.txt ----------

// Возвращает { allows(pathAndQuery), crawlDelay, sitemaps } для нашего агента.
export function parseRobots(text) {
  const groups = [];
  let cur = null;
  let lastWasAgent = false;
  const sitemaps = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    if (!line) continue;
    const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const val = m[2].trim();
    if (key === 'user-agent') {
      if (!cur || !lastWasAgent) { cur = { agents: [], rules: [], delay: null }; groups.push(cur); }
      cur.agents.push(val.toLowerCase());
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (key === 'sitemap') sitemaps.push(val);
    else if (!cur) continue;
    else if (key === 'allow' || key === 'disallow') cur.rules.push({ allow: key === 'allow', pattern: val });
    else if (key === 'crawl-delay') { const d = parseFloat(val); if (!Number.isNaN(d)) cur.delay = d; }
  }
  const mine = groups.filter((g) => g.agents.some((a) => a !== '*' && UA.toLowerCase().includes(a)));
  const chosen = mine.length ? mine : groups.filter((g) => g.agents.includes('*'));
  const rules = chosen.flatMap((g) => g.rules);
  const delay = chosen.reduce((d, g) => (g.delay != null ? Math.max(d ?? 0, g.delay) : d), null);

  const toRe = (p) => new RegExp('^' + p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$'));
  const compiled = rules.filter((r) => r.pattern !== '').map((r) => ({ ...r, re: toRe(r.pattern), len: r.pattern.length }));
  return {
    crawlDelay: delay,
    sitemaps,
    groups,
    rulesForUs: rules.map((r) => `${r.allow ? 'Allow' : 'Disallow'}: ${r.pattern}`),
    allows(pathAndQuery) {
      let best = null;
      for (const r of compiled) {
        if (!r.re.test(pathAndQuery)) continue;
        if (!best || r.len > best.len || (r.len === best.len && r.allow)) best = r;
      }
      return best ? best.allow : true;
    },
  };
}

// ---------- сеть ----------

async function get(url, { maxBytes = MAX_BYTES } = {}) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  const t0 = Date.now();
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: ctl.signal,
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.5', 'accept-language': 'ru,en;q=0.7' },
    });
    const reader = res.body?.getReader();
    const chunks = [];
    let got = 0;
    while (reader && got < maxBytes) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      got += value.length;
    }
    try { await reader?.cancel(); } catch { /* ignore */ }
    const buf = Buffer.concat(chunks.map((c) => Buffer.from(c)));
    const type = res.headers.get('content-type') || '';
    const charset = /charset=([\w-]+)/i.exec(type)?.[1]?.toLowerCase();
    let body;
    try { body = new TextDecoder(charset && charset !== 'utf8' ? charset : 'utf-8').decode(buf); }
    catch { body = buf.toString('utf8'); }
    return { status: res.status, finalUrl: res.url, type, body, bytes: got, ms: Date.now() - t0, error: '' };
  } catch (e) {
    const cause = e?.cause?.code || e?.cause?.message || e?.name || String(e);
    return { status: 0, finalUrl: '', type: '', body: '', bytes: 0, ms: Date.now() - t0, error: String(cause).slice(0, 80) };
  } finally {
    clearTimeout(timer);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function pageInfo(body) {
  const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(body)?.[1]?.replace(/\s+/g, ' ').trim().slice(0, 120) ?? '';
  const flags = [];
  // Слова про капчу встречаются в скриптах обычных страниц: смотрим только заголовок и начало короткой страницы.
  const probe = title + ' ' + (body.length < 30000 ? body : body.slice(0, 2000));
  if (/captcha|checking your browser|just a moment|attention required|проверка браузера|проверка безопасности|проверка на автоматические|ddos-guard/i.test(probe)) flags.push('защита/капча');
  if (/vpn/i.test(probe) && /отключ|выключ|disable/i.test(probe)) flags.push('просит отключить VPN');
  return { title, flags };
}

// ---------- запуск ----------

function parseArgs(argv) {
  const a = { mode: 'unreachable', ids: null, out: null, delay: MIN_DELAY_S, terms: true, evidence: null };
  for (let i = 0; i < argv.length; i++) {
    const x = argv[i];
    if (x === '--all') a.mode = 'all';
    else if (x === '--unreachable') a.mode = 'unreachable';
    else if (x === '--ids') { a.mode = 'ids'; a.ids = new Set(argv[++i].split(',').map((s) => s.trim())); }
    else if (x === '--out') a.out = argv[++i];
    else if (x === '--evidence') a.evidence = argv[++i];
    else if (x === '--no-terms') a.terms = false;
    else if (x === '--delay') a.delay = Math.max(MIN_DELAY_S, Number(argv[++i]) || MIN_DELAY_S);
    else if (x === '-h' || x === '--help') { console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 14).join('\n').replace(/^\/\/ ?/gm, '')); process.exit(0); }
    else { console.error('неизвестный аргумент: ' + x); process.exit(2); }
  }
  return a;
}

async function checkDomain(host, rows, delayS, log, opts = {}) {
  const out = [];
  const evidence = [];
  const termsCache = new Map();
  let robots = null;
  let robotsStatus = '';
  const wait = async (extra) => sleep(Math.max(delayS, extra ?? 0) * 1000);

  const rr = await get(`https://${host}/robots.txt`, { maxBytes: 300 * 1024 });
  robotsStatus = rr.status ? String(rr.status) : rr.error;
  let stop = '';
  if (rr.status === 200 && !/<html/i.test(rr.body.slice(0, 500))) robots = parseRobots(rr.body);
  else if (rr.status === 404 || rr.status === 410) robots = parseRobots('');
  else if (rr.status === 403 || rr.status === 429 || rr.status >= 500) stop = `robots.txt: ${rr.status}`;
  else if (rr.status === 0) stop = `robots.txt: ${rr.error}`;
  else robots = parseRobots('');
  const eff = Math.max(delayS, robots?.crawlDelay ?? 0);
  const robotsEv = robots ? robotsEvidence(robots, rr.status === 200 ? rr.body : '') : null;

  for (const r of rows) {
    const rec = {
      id: r.id, domain: host, url: r.url, robots_status: robotsStatus,
      crawl_delay: robots?.crawlDelay ?? '', sitemap: robots?.sitemaps?.[0] ?? '',
      robots_allows: '', http_status: '', final_url: '', redirected: '', content_type: '', bytes: '', ms: '', title: '', flags: '', verdict: '', error: '',
    };
    if (stop) { rec.verdict = 'stopped'; rec.error = stop; out.push(rec); evidence.push({ id: r.id, domain: host, url: r.url, error: stop, robots: { status: robotsStatus } }); continue; }
    const u = new URL(r.url);
    const allowed = robots ? robots.allows(u.pathname + u.search) : true;
    rec.robots_allows = allowed ? 'yes' : 'no';
    if (!allowed) { rec.verdict = 'robots_disallow'; out.push(rec); evidence.push({ id: r.id, domain: host, url: r.url, robots: { status: robotsStatus, allows_page: false, ...robotsEv } }); continue; }

    await wait(eff);
    const g = await get(r.url);
    rec.http_status = g.status || '';
    rec.final_url = g.finalUrl;
    rec.redirected = g.finalUrl && g.finalUrl.replace(/\/$/, '') !== r.url.replace(/\/$/, '') ? 'yes' : 'no';
    rec.content_type = g.type.split(';')[0];
    rec.bytes = g.bytes;
    rec.ms = g.ms;
    rec.error = g.error;
    const info = pageInfo(g.body);
    rec.title = info.title;
    rec.flags = info.flags.join('; ');
    const ev = {
      id: r.id, domain: host, url: r.url, checked_at: new Date().toISOString().slice(0, 10),
      http_status: g.status, final_url: g.finalUrl, content_type: rec.content_type, error: g.error,
      robots: { status: robotsStatus, allows_page: allowed, ...robotsEv },
      page: null, terms: [],
    };
    if (g.status === 200 && /html/i.test(g.type || 'html')) ev.page = pageEvidence(g.body, g.finalUrl || r.url);
    if (g.status === 0) rec.verdict = 'unreachable';
    else if (g.status === 403 || g.status === 429 || g.status >= 500) { rec.verdict = `blocked_${g.status}`; stop = `${g.status} на ${r.id}`; }
    else if (g.status >= 400) rec.verdict = `error_${g.status}`;
    else if (info.flags.length) rec.verdict = 'protected';
    else if (g.bytes < 200) rec.verdict = 'empty';
    else rec.verdict = 'ok';
    // Условия использования: до двух страниц с того же домена, только если robots.txt их разрешает; сохраняются короткие фрагменты.
    if (opts.terms && ev.page && rec.verdict === 'ok') {
      const cands = ev.page.terms_candidates.filter((c) => c.same_host && c.kind === 'terms').slice(0, 2);
      for (const c of cands) {
        if (termsCache.has(c.href)) { ev.terms.push(termsCache.get(c.href)); continue; }
        const tu = new URL(c.href);
        let t;
        if (robots && !robots.allows(tu.pathname + tu.search)) t = { url: c.href, status: 0, skipped: 'robots.txt запрещает' };
        else {
          await wait(eff);
          const tg = await get(c.href);
          t = { url: c.href, status: tg.status, error: tg.error, title: pageInfo(tg.body).title, snippets: tg.status === 200 ? termsSnippets(tg.body) : [] };
          if (tg.status === 403 || tg.status === 429 || tg.status >= 500) stop = `${tg.status} на условиях ${r.id}`;
        }
        termsCache.set(c.href, t);
        ev.terms.push(t);
        if (stop) break;
      }
    }
    evidence.push(ev);
    log(`${rec.verdict.padEnd(15)} ${r.id}  ${r.url}`);
    out.push(rec);
  }
  return { out, evidence };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const rows = parseTsv(readFileSync(REGISTRY, 'utf8')).filter((r) => r.url);
  let pick = rows;
  if (args.mode === 'unreachable') pick = rows.filter((r) => /недоступно из облачной среды|\[повтор на VPS\]/.test(r.notes));
  if (args.mode === 'ids') pick = rows.filter((r) => args.ids.has(r.id));
  if (!pick.length) { console.error('нет строк для проверки'); process.exit(1); }

  const byHost = new Map();
  for (const r of pick) {
    const h = new URL(r.url).hostname;
    if (!byHost.has(h)) byHost.set(h, []);
    byHost.get(h).push(r);
  }
  console.log(`Строк: ${pick.length}, доменов: ${byHost.size}. Пауза на домен ≥ ${args.delay} с, одновременно доменов: ${DOMAIN_PARALLEL}.`);

  const queue = [...byHost.entries()];
  const results = [];
  const evidenceAll = [];
  const log = (s) => console.log(s);
  await Promise.all(Array.from({ length: DOMAIN_PARALLEL }, async () => {
    for (let item; (item = queue.shift());) {
      const r = await checkDomain(item[0], item[1], args.delay, log, { terms: args.terms });
      results.push(...r.out);
      evidenceAll.push(...r.evidence);
    }
  }));

  const order = new Map(pick.map((r, i) => [r.id, i]));
  results.sort((a, b) => order.get(a.id) - order.get(b.id));
  const cols = Object.keys(results[0]);
  const stamp = new Date().toISOString().slice(0, 10);
  const outFile = args.out ?? `art-sources-check-${stamp}.tsv`;
  writeFileSync(outFile, [cols.join('\t'), ...results.map((r) => cols.map((c) => tsvCell(r[c])).join('\t'))].join('\n') + '\n');

  evidenceAll.sort((a, b) => order.get(a.id) - order.get(b.id));
  const evFile = args.evidence ?? `art-sources-evidence-${new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-')}.json`;
  writeFileSync(evFile, JSON.stringify({ tool: 'check-art-sources', user_agent: UA, created_at: new Date().toISOString(), rows: evidenceAll }, null, 1) + '\n');
  console.log('Улики (robots, ссылки на условия, фрагменты):', evFile);

  const sum = {};
  for (const r of results) sum[r.verdict] = (sum[r.verdict] ?? 0) + 1;
  console.log('\nИтог:', sum);
  console.log('Файл:', outFile);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
