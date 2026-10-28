import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  PublicCardError, TEXT, datingLine, getPublicCard, parseLang, safeUrl, sourceLine, visibleBlocks, type PublicCard, type PublicSource,
} from '../lib/publicCard';
import { Badge, Notice } from '../components/torgi/Shell';

const hostOf = (u: string) => { try { return new URL(u).host; } catch { return u; } };

const SourceItem: React.FC<{ source: PublicSource; lang: 'ru' | 'en' }> = ({ source, lang }) => {
  const url = safeUrl(source.url);
  const text = sourceLine(source, lang) || (url ? hostOf(url) : '');
  if (!text) return null;
  return <li className="text-sm text-gray-700">{url ? <a href={url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{text}</a> : text}</li>;
};

const ArtworkCardPage: React.FC = () => {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const lang = parseLang(params.get('lang'));
  const t = TEXT[lang];
  const artworkId = Number(id);
  const [card, setCard] = useState<PublicCard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isInteger(artworkId) || artworkId < 1) { setError(t.notFound); return; }
    let live = true;
    setError(null);
    getPublicCard(artworkId, lang)
      .then(c => { if (live) setCard(c); })
      .catch(e => { if (live) { setCard(null); setError(e instanceof PublicCardError ? e.message : t.failed); } });
    return () => { live = false; };
  }, [artworkId, lang, t.notFound, t.failed]);

  useEffect(() => { if (card?.passport.title) document.title = card.passport.title; }, [card]);

  const switcher = (
    <div className="flex items-center gap-2 text-sm" role="group" aria-label={t.language}>
      {(['ru', 'en'] as const).map(l => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setParams(l === 'ru' ? {} : { lang: l }, { replace: true })}
          className={`rounded-lg px-3 py-1 border ${lang === l ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}>{l.toUpperCase()}</button>
      ))}
    </div>
  );

  const back = <Link to={`/artworks/${artworkId}`} className="text-indigo-600 hover:underline">{t.back}</Link>;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 -m-4 md:-m-6"><div className="max-w-3xl mx-auto px-4 pt-8 pb-16 space-y-4">
        <div className="flex justify-between items-center text-sm">{back}{switcher}</div>
        <Notice tone="error">{error}</Notice>
        <Link to="/gallery-3d" className="text-indigo-600 hover:underline text-sm">{t.toGallery}</Link>
      </div></div>
    );
  }
  if (!card) return <div className="min-h-screen bg-gray-50 -m-4 md:-m-6 px-4 pt-8 text-gray-600">{t.loading}</div>;

  const p = card.passport;
  const dating = datingLine(card, lang);
  const blocks = visibleBlocks(card);
  const rows: Array<[string, string | null]> = [
    [t.artist, p.artist], [t.attribution, p.attribution_note], [t.dating, dating], [t.medium, p.medium], [t.dimensions, p.dimensions], [t.inventory, p.inventory_number],
  ];

  return (
    <article className="min-h-screen bg-gray-50 text-gray-900 -m-4 md:-m-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        <div className="mb-4 flex flex-wrap justify-between items-center gap-3 text-sm">{back}{switcher}</div>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">{p.title}</h1>
          {p.artist && <p className="text-lg text-gray-600 mt-2">{p.artist}</p>}
        </header>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-3">
            {card.image
              ? (
                <figure>
                  <img src={card.image.url} alt={[p.title, p.artist].filter(Boolean).join(', ')} loading="lazy" className="w-full rounded-xl bg-gray-100 object-contain" />
                  <figcaption className="text-xs text-gray-500 mt-2">{t.imageRights}: {card.image.rights_holder}{card.image.rights_note ? `. ${card.image.rights_note}` : ''}</figcaption>
                </figure>
              )
              : <p className="rounded-xl bg-gray-100 text-gray-500 text-sm text-center py-16">{t.noImage}</p>}

            <section aria-label={t.passport} className="rounded-2xl bg-white border border-gray-200 p-4">
              <h2 className="font-semibold mb-3">{t.passport}</h2>
              <dl className="space-y-2 text-sm">
                {rows.filter(([, v]) => v).map(([k, v]) => (
                  <div key={k}><dt className="text-gray-500">{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </section>
          </div>

          <div className="md:col-span-3 space-y-8">
            {blocks.length === 0 && <p className="text-gray-600">{t.noText}</p>}
            {blocks.map(({ block, fragments }) => (
              <section key={block}>
                <h2 className="text-xl font-semibold mb-3">{t.blocks[block]}</h2>
                <div className="space-y-3">
                  {fragments.map((f, i) => (
                    <div key={i}>
                      <p className="leading-relaxed whitespace-pre-line">{f.text}</p>
                      {(f.confidence === 'uncertain' || f.origin === 'image_description') && (
                        <p className="mt-1 flex gap-2">
                          {f.confidence === 'uncertain' && <Badge tone="amber">{t.uncertain}</Badge>}
                          {f.origin === 'image_description' && <Badge tone="gray">{t.imageDescription}</Badge>}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {(card.notes.has_image_description || card.notes.has_uncertain_fragments || card.translation.fallback_fields.length > 0) && (
              <div className="space-y-2">
                {card.notes.has_uncertain_fragments && <Notice tone="info">{t.uncertainNote}</Notice>}
                {card.notes.has_image_description && <Notice tone="info">{t.imageNote}</Notice>}
                {card.translation.fallback_fields.length > 0 && <Notice tone="info">{t.untranslated}</Notice>}
              </div>
            )}

            {card.bibliography.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-3">{t.bibliography}</h2>
                <ul className="list-disc pl-5 space-y-1">{card.bibliography.map((s, i) => <SourceItem key={i} source={s} lang={lang} />)}</ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArtworkCardPage;
