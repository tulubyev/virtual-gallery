// lib/legal.ts — юридические документы торгов (/api/legal) и простой безопасный разбор их разметки.
// Разметка превращается в дерево, которое React выводит как обычные элементы: HTML из текста документа не вставляется.

export interface LegalInfo { slug: string; title: string; version: string; status: 'draft' | 'approved'; effective_from: string | null; sha256: string; ref: string }
export interface LegalDoc extends LegalInfo { markdown: string }

export async function loadLegalDoc(slug: string): Promise<LegalDoc> {
  const res = await fetch(`/api/legal/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error(res.status === 404 ? 'Документ не найден.' : 'Не удалось загрузить документ.');
  return res.json();
}

export async function loadLegalList(): Promise<LegalInfo[]> {
  const res = await fetch('/api/legal');
  if (!res.ok) throw new Error('Не удалось загрузить документы.');
  return (await res.json()).documents;
}

// ── Разбор разметки ────────────────────────────────────────────────────────────────────────────

export type Inline = { kind: 'text'; text: string } | { kind: 'bold'; text: string } | { kind: 'em'; text: string } | { kind: 'todo'; text: string };
export type Block =
  | { kind: 'heading'; level: 1 | 2 | 3; inlines: Inline[] }
  | { kind: 'paragraph'; lines: Inline[][] }
  | { kind: 'quote'; lines: Inline[][] }
  | { kind: 'list'; ordered: boolean; items: Inline[][] }
  | { kind: 'table'; header: Inline[][]; rows: Inline[][][] };

/** «**жирный**», «*курсив*» и пометки юриста «[Юрист: …]». Остальное — обычный текст. */
export function parseInline(text: string): Inline[] {
  const result: Inline[] = [];
  const pattern = /\*\*([^*]+)\*\*|\*([^*\s][^*]*)\*|(\[Юрист[^\]]*\])/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) result.push({ kind: 'text', text: text.slice(last, index) });
    if (match[1] !== undefined) result.push({ kind: 'bold', text: match[1] });
    else if (match[2] !== undefined) result.push({ kind: 'em', text: match[2] });
    else result.push({ kind: 'todo', text: match[3] });
    last = index + match[0].length;
  }
  if (last < text.length) result.push({ kind: 'text', text: text.slice(last) });
  return result;
}

const splitRow = (line: string) => line.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());

export function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) { blocks.push({ kind: 'heading', level: heading[1].length as 1 | 2 | 3, inlines: parseInline(heading[2]) }); i++; continue; }

    if (line.startsWith('|') && /^\|?\s*:?-{3,}/.test(lines[i + 1]?.replace(/^\|/, '') ?? '')) {
      const header = splitRow(line).map(parseInline);
      const rows: Inline[][][] = [];
      i += 2;
      while (i < lines.length && lines[i].startsWith('|')) { rows.push(splitRow(lines[i]).map(parseInline)); i++; }
      blocks.push({ kind: 'table', header, rows });
      continue;
    }

    if (line.startsWith('>')) {
      const quote: Inline[][] = [];
      while (i < lines.length && lines[i].startsWith('>')) { quote.push(parseInline(lines[i].replace(/^>\s?/, ''))); i++; }
      blocks.push({ kind: 'quote', lines: quote });
      continue;
    }

    const listMatch = /^(\d+\.|-)\s+/.exec(line);
    if (listMatch) {
      const ordered = listMatch[1] !== '-';
      const items: Inline[][] = [];
      while (i < lines.length && /^(\d+\.|-)\s+/.test(lines[i]) && (lines[i].startsWith('-') !== ordered)) {
        items.push(parseInline(lines[i].replace(/^(\d+\.|-)\s+/, '')));
        i++;
      }
      blocks.push({ kind: 'list', ordered, items });
      continue;
    }

    const paragraph: Inline[][] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,3}\s|>|\||(\d+\.|-)\s)/.test(lines[i])) { paragraph.push(parseInline(lines[i])); i++; }
    if (paragraph.length === 0) { paragraph.push(parseInline(line)); i++; }
    blocks.push({ kind: 'paragraph', lines: paragraph });
  }
  return blocks;
}

/** Сколько мест в документе ждёт заполнения юристом. */
export const countTodos = (markdown: string): number => (markdown.match(/\[Юрист[^\]]*\]/g) ?? []).length;

export const LEGAL_LABEL: Record<string, string> = { 'auction-rules': 'Правила аукциона', 'privacy-policy': 'Политика обработки персональных данных', 'pd-consent': 'Согласие на обработку персональных данных' };
