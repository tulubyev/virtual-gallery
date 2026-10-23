import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LEGAL_LABEL, countTodos, loadLegalDoc, parseMarkdown, type Block, type Inline, type LegalDoc } from '../lib/legal';
import { Notice, Shell } from '../components/torgi/Shell';

const Inlines: React.FC<{ items: Inline[] }> = ({ items }) => (
  <>
    {items.map((it, i) => it.kind === 'bold' ? <strong key={i}>{it.text}</strong>
      : it.kind === 'em' ? <em key={i}>{it.text}</em>
      : it.kind === 'todo' ? <mark key={i} className="bg-amber-100 text-amber-900 rounded px-1">{it.text}</mark>
      : <React.Fragment key={i}>{it.text}</React.Fragment>)}
  </>
);

const Lines: React.FC<{ lines: Inline[][] }> = ({ lines }) => (
  <>{lines.map((l, i) => <React.Fragment key={i}>{i > 0 && <br />}<Inlines items={l} /></React.Fragment>)}</>
);

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'heading': {
      const cls = block.level === 1 ? 'text-2xl font-bold mt-8' : block.level === 2 ? 'text-xl font-semibold mt-8 mb-2' : 'text-lg font-semibold mt-6';
      return React.createElement(`h${block.level + 1}`, { className: cls }, <Inlines items={block.inlines} />);
    }
    case 'paragraph': return <p className="my-3 leading-relaxed text-gray-800"><Lines lines={block.lines} /></p>;
    case 'quote': return <blockquote className="my-4 border-l-4 border-amber-400 bg-amber-50 text-amber-900 px-4 py-3 rounded-r-xl text-sm"><Lines lines={block.lines} /></blockquote>;
    case 'list': {
      const items = block.items.map((it, i) => <li key={i} className="my-1 leading-relaxed"><Inlines items={it} /></li>);
      return block.ordered ? <ol className="list-decimal pl-6 my-3 text-gray-800">{items}</ol> : <ul className="list-disc pl-6 my-3 text-gray-800">{items}</ul>;
    }
    case 'table': return (
      <div className="overflow-x-auto my-4">
        <table className="text-sm border border-gray-200 rounded-xl">
          <thead className="bg-gray-50"><tr>{block.header.map((h, i) => <th key={i} className="text-left px-4 py-2 font-semibold"><Inlines items={h} /></th>)}</tr></thead>
          <tbody>{block.rows.map((r, i) => <tr key={i} className="border-t border-gray-100">{r.map((c, j) => <td key={j} className="px-4 py-2"><Inlines items={c} /></td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  }
}

const LegalPage: React.FC = () => {
  const { slug = '' } = useParams();
  const [doc, setDoc] = useState<LegalDoc | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { setDoc(null); setError(null); loadLegalDoc(slug).then(setDoc).catch(e => setError(e.message)); }, [slug]);

  const back = <Link to="/torgi" className="text-indigo-700 hover:underline">← К торгам</Link>;
  if (error) return <Shell title={LEGAL_LABEL[slug] ?? 'Документ'} back={back}><Notice tone="error">{error}</Notice></Shell>;
  if (!doc) return <Shell title={LEGAL_LABEL[slug] ?? 'Документ'} back={back}><p className="text-sm text-gray-500">Загрузка…</p></Shell>;

  const todos = countTodos(doc.markdown);
  return (
    <Shell title={doc.title} back={back} subtitle={
      <span className="text-sm">Версия {doc.version}{doc.effective_from ? `, действует с ${doc.effective_from}` : ''} · контрольная сумма {doc.sha256.slice(0, 8)}</span>
    }>
      {doc.status === 'draft' && (
        <div className="mb-6"><Notice tone="warn">Документ не утверждён: это проект{todos > 0 ? `, в нём ${todos} мест для заполнения юристом` : ''}. Принимать его условия пока нельзя.</Notice></div>
      )}
      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4">
        {parseMarkdown(doc.markdown).map((b, i) => <BlockView key={i} block={b} />)}
      </article>
    </Shell>
  );
};

export default LegalPage;
