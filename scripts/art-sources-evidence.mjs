// Разбор страниц и robots.txt для scripts/check-art-sources.mjs: собирает «улики» для аннотации реестра.
// Сохраняются только адреса, заголовки, правила robots.txt и короткие фрагменты условий (до ~220 знаков).
// Тексты страниц целиком не сохраняются.

const AI_AGENTS = [
  'gptbot', 'chatgpt-user', 'oai-searchbot', 'claudebot', 'claude-web', 'anthropic-ai', 'ccbot', 'google-extended',
  'perplexitybot', 'bytespider', 'amazonbot', 'applebot-extended', 'cohere-ai', 'meta-externalagent', 'facebookbot',
];

const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&nbsp;': ' ', '&#8212;': '—', '&#8211;': '–' };

export function decodeEntities(s) {
  return s
    .replace(/&(amp|lt|gt|quot|nbsp|#39|#x27|#8212|#8211);/g, (m) => ENTITIES[m] ?? m)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

export function stripHtml(html) {
  return decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<(script|style|noscript|svg|template)[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ').trim();
}

const attr = (tag, name) => new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i').exec(tag)?.slice(2).find((x) => x !== undefined);

export function extractLinks(html, baseUrl) {
  const out = [];
  const seen = new Set();
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href = attr(m[1], 'href');
    if (!href || /^(#|mailto:|tel:|javascript:)/i.test(href)) continue;
    let abs;
    try { abs = new URL(decodeEntities(href), baseUrl).href; } catch { continue; }
    const text = stripHtml(m[2]).slice(0, 80);
    const key = abs + '|' + text;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ href: abs, text });
  }
  return out;
}

const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };

const TERMS_STRONG_TEXT = /(условия\s+(использования|пользования|сайта)|пользовательск\S*\s+соглашен|\bсоглашение\b|правила\s+(использования|пользования)|terms(\s+of\s+(use|service))?\b|licen[cs]e|лицензи[яи]\b|правообладател|авторские\s+права|об\s+использовании\s+материалов|использование\s+материалов|copyright)/i;
const TERMS_STRONG_PATH = /(terms|licen[cs]e|agreement|soglash|usloviy|uslovi|pravila|copyright|usage-rules)/i;
const TERMS_WEAK = /(политик|privacy|конфиденц|оферт|открыт\S*\s+данн|open.?data|\bapi\b|разработчик|о сайте|о проекте|контакты для|реклама)/i;

export function termsCandidates(links, baseHost) {
  const host = hostOf(`https://${baseHost}`);
  const scored = [];
  for (const l of links) {
    let path = '';
    try { const u = new URL(l.href); path = decodeURI(u.pathname + u.search); } catch { /* skip */ }
    const strong = TERMS_STRONG_TEXT.test(l.text) || TERMS_STRONG_PATH.test(path);
    const weak = !strong && TERMS_WEAK.test(`${l.text} ${path}`);
    if (!strong && !weak) continue;
    scored.push({ ...l, same_host: hostOf(l.href) === host, score: strong ? 2 : 1 });
  }
  scored.sort((a, b) => b.score - a.score || Number(b.same_host) - Number(a.same_host));
  return scored.slice(0, 12).map(({ href, text, same_host, score }) => ({ href, text, same_host, kind: score === 2 ? 'terms' : 'other' }));
}

const KW = /(запрещ|не допускается|без (письменного )?(согласи|разрешени)|разрешен|копирован|воспроизвед|автоматическ|робот|парсинг|скрейп|краул|нейросет|искусственн|машинн\S* обучени|crawl|scrap|robot|\bbots?\b|automated|data mining|creative commons|\bCC[ -]?(BY|0)|public domain|все права защищены|all rights reserved|некоммерческ|non-?commercial|attribution|гиперссылк|активн\S* ссылк)/i;

// Предложения с ключевыми словами про права и автоматический доступ: до 12 штук по 220 знаков.
export function termsSnippets(html, { max = 12, width = 220 } = {}) {
  const text = stripHtml(html);
  const out = [];
  const seen = new Set();
  for (const s of text.split(/(?<=[.!?;])\s+/)) {
    if (s.length < 25 || !KW.test(s)) continue;
    const t = s.length > width ? s.slice(0, width - 1) + '…' : s;
    const k = t.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(t);
    if (out.length >= max) break;
  }
  return out;
}

const LICENSE_HINT = /(creative commons|\bCC[ -]?(BY|0)[\w-]*|public domain|все права защищены|all rights reserved|использование материалов[^.]{0,120}|копирование[^.]{0,120}запрещ[^.]{0,40}|при использовании материалов[^.]{0,120})/gi;
const AI_DIRECTED = /(ignore (all )?(previous|prior|above) (instructions|prompts)|disregard (all )?(previous|prior)|as an ai\b|ai (agents?|assistants?|crawlers?)\b|large language model|\bllms?\b|chatgpt|claude\b|игнорируй\S* (все )?(предыдущ|прежн)|для (ии|нейросет\S*|ai)[- ]?(агент|бот|краулер))/i;

export function pageEvidence(html, baseUrl) {
  const title = decodeEntities(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '').replace(/\s+/g, ' ').trim().slice(0, 160);
  const meta = (name) => {
    for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
      if (new RegExp(`(name|property)\\s*=\\s*["']${name}["']`, 'i').test(m[0])) return decodeEntities(attr(m[0], 'content') ?? '').slice(0, 240);
    }
    return '';
  };
  const text = stripHtml(html);
  const scriptChars = (html.match(/<script[\s\S]*?<\/script>/gi) ?? []).reduce((n, s) => n + s.length, 0);
  const links = extractLinks(html, baseUrl);
  const feeds = [];
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    if (/rel\s*=\s*["']?alternate/i.test(m[0]) && /(rss|atom)/i.test(m[0])) {
      const href = attr(m[0], 'href');
      if (href) { try { feeds.push(new URL(decodeEntities(href), baseUrl).href); } catch { /* skip */ } }
    }
  }
  const searchForms = [];
  for (const m of html.matchAll(/<form\b([^>]*)>([\s\S]*?)<\/form>/gi)) {
    const input = [...m[2].matchAll(/<input\b[^>]*>/gi)].map((i) => attr(i[0], 'name')).find((n) => n && /^(q|s|search|query|searchword|text|keyword|k|poisk)$/i.test(n));
    if (!input && !/search|poisk|поиск/i.test(m[1])) continue;
    let action = attr(m[1], 'action') ?? '';
    try { action = new URL(decodeEntities(action), baseUrl).href; } catch { /* leave */ }
    searchForms.push({ action, method: (attr(m[1], 'method') ?? 'get').toLowerCase(), field: input ?? '' });
  }
  const lic = [...new Set([...text.matchAll(LICENSE_HINT)].map((m) => m[0].slice(0, 160)))].slice(0, 6);
  const copyright = /(©|&copy;|copyright)[^.]{0,120}/i.exec(text)?.[0]?.slice(0, 160) ?? '';
  const aiText = [];
  for (const src of [text, ...(html.match(/<!--[\s\S]*?-->/g) ?? [])]) {
    const m = AI_DIRECTED.exec(src);
    if (m) aiText.push(src.slice(Math.max(0, m.index - 60), m.index + 100).replace(/\s+/g, ' '));
  }
  return {
    title,
    description: meta('description'),
    lang: attr(/<html\b[^>]*>/i.exec(html)?.[0] ?? '', 'lang') ?? '',
    generator: meta('generator'),
    text_chars: text.length,
    js_heavy: text.length < 1500 && scriptChars > 20000,
    feeds: [...new Set(feeds)].slice(0, 4),
    search_forms: searchForms.slice(0, 3),
    terms_candidates: termsCandidates(links, hostOf(baseUrl)),
    license_hints: lic,
    copyright_line: copyright,
    ai_directed_text: aiText.slice(0, 3),
  };
}

// Сводка robots.txt: правила для нашего агента и отношение к ИИ-ботам.
export function robotsEvidence(parsed, rawText) {
  const ai = {};
  for (const g of parsed?.groups ?? []) {
    for (const a of g.agents) {
      if (!AI_AGENTS.includes(a)) continue;
      const root = g.rules.find((r) => r.pattern === '/' && !r.allow);
      ai[a] = root ? 'disallow_all' : g.rules.some((r) => !r.allow && r.pattern) ? 'partial' : 'allow';
    }
  }
  const llms = /llms?\.txt[^\s]*/i.exec(rawText ?? '')?.[0] ?? '';
  const aiComment = /\b(ai|llm|нейросет)\S*[^\n]{0,100}/i.exec((rawText ?? '').split('\n').filter((l) => l.trim().startsWith('#')).join('\n'))?.[0]?.slice(0, 160) ?? '';
  return {
    crawl_delay: parsed?.crawlDelay ?? null,
    sitemaps: (parsed?.sitemaps ?? []).slice(0, 4),
    rules_for_us: (parsed?.rulesForUs ?? []).slice(0, 60),
    ai_agents: ai,
    llms_txt_hint: llms,
    ai_comment: aiComment,
  };
}
