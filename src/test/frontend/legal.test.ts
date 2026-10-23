import { countTodos, parseInline, parseMarkdown } from '../../frontend/src/lib/legal';

describe('разметка документов', () => {
  it('inline: жирный, курсив, пометки юриста, обычный текст; HTML остаётся текстом', () => {
    expect(parseInline('Обычный **важный** и *мягкий* текст [Юрист: уточнить] конец')).toEqual([
      { kind: 'text', text: 'Обычный ' }, { kind: 'bold', text: 'важный' }, { kind: 'text', text: ' и ' }, { kind: 'em', text: 'мягкий' },
      { kind: 'text', text: ' текст ' }, { kind: 'todo', text: '[Юрист: уточнить]' }, { kind: 'text', text: ' конец' },
    ]);
    expect(parseInline('<script>alert(1)</script>')).toEqual([{ kind: 'text', text: '<script>alert(1)</script>' }]);
    expect(parseInline('2 * 3 * 4')).toEqual([{ kind: 'text', text: '2 * 3 * 4' }]);          // не курсив
    expect(parseInline('')).toEqual([]);
  });

  it('блоки: заголовки, абзацы с переносами, цитата, списки, таблица', () => {
    const blocks = parseMarkdown([
      '> **Проект**', '', '## 1. Термины', 'Первая строка', 'вторая строка', '', '1. Раз', '2. Два', '', '- а', '- б', '',
      '| Цена | Шаг |', '|---|---|', '| до 10 000 ₽ | 500 ₽ |', '| от 10 000 ₽ | 1 000 ₽ |', '', 'Конец',
    ].join('\n'));
    expect(blocks.map(b => b.kind)).toEqual(['quote', 'heading', 'paragraph', 'list', 'list', 'table', 'paragraph']);
    expect(blocks[1]).toMatchObject({ kind: 'heading', level: 2 });
    expect((blocks[2] as any).lines).toHaveLength(2);
    expect(blocks[3]).toMatchObject({ kind: 'list', ordered: true });
    expect((blocks[3] as any).items).toHaveLength(2);
    expect(blocks[4]).toMatchObject({ kind: 'list', ordered: false });
    const table = blocks[5] as any;
    expect(table.header).toHaveLength(2);
    expect(table.rows).toHaveLength(2);
    expect(table.rows[1][1]).toEqual([{ kind: 'text', text: '1 000 ₽' }]);
  });

  it('пустой текст и «строка с чертой» не ломают разбор', () => {
    expect(parseMarkdown('')).toEqual([]);
    expect(parseMarkdown('| не таблица').map(b => b.kind)).toEqual(['paragraph']);
  });

  it('countTodos считает места для юриста', () => {
    expect(countTodos('[Юрист: а] и [Юрист: б], но не [Юристы]')).toBe(3);
    expect(countTodos('текст')).toBe(0);
  });

  it('поставляемые документы разбираются целиком, без пустых блоков', () => {
    const fs = require('fs');
    for (const slug of ['auction-rules', 'privacy-policy', 'pd-consent']) {
      const raw = fs.readFileSync(`${__dirname}/../../legal/${slug}.md`, 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '');
      const blocks = parseMarkdown(raw);
      expect(blocks.length).toBeGreaterThan(5);
      expect(blocks.some(b => b.kind === 'quote')).toBe(true);
      expect(countTodos(raw)).toBeGreaterThan(0);
    }
  });
});
