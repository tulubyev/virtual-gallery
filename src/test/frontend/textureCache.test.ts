import { TieredTextureCache } from '../../frontend/src/lib/gallery/textureCache';
import type { TexLevel } from '../../frontend/src/lib/gallery/imageUrls';

interface Job { id: string; level: TexLevel; resolve(t: string): void; reject(e: Error): void }

function setup(caps = { thumb: Infinity, detail: 2, zoom: 1 }, maxConcurrent = 2) {
  const jobs: Job[] = [];
  const log = { ready: [] as string[], evict: [] as string[], disposed: [] as string[] };
  let t = 0;
  const cache = new TieredTextureCache<string>({
    caps, maxConcurrent, retryAfterMs: 1000, now: () => t,
    load: (id, level) => new Promise((resolve, reject) => jobs.push({ id, level, resolve, reject })),
    dispose: tex => log.disposed.push(tex),
    onReady: (id, level) => log.ready.push(`${level}:${id}`),
    onEvict: (id, level) => log.evict.push(`${level}:${id}`),
  });
  const finish = async (j: Job) => { j.resolve(`${j.level}:${j.id}`); await Promise.resolve(); await Promise.resolve(); };
  return { cache, jobs, log, finish, advance: (ms: number) => { t += ms; } };
}

describe('TieredTextureCache', () => {
  it('не запускает больше maxConcurrent загрузок', () => {
    const { cache, jobs } = setup();
    cache.setWanted('thumb', ['a', 'b', 'c', 'd']);
    expect(jobs).toHaveLength(2);
  });

  it('миниатюры грузятся раньше детальных уровней', async () => {
    const { cache, jobs, finish } = setup(undefined, 1);
    cache.setWanted('detail', ['a']);
    cache.setWanted('thumb', ['a', 'b']);
    // detail уже ушёл в загрузку первым (свободный слот), следующим берётся thumb, а не ещё detail
    await finish(jobs[0]);
    expect(jobs[1].level).toBe('thumb');
  });

  it('ограничивает число текстур уровня и освобождает лишние', async () => {
    const { cache, jobs, log, finish } = setup({ thumb: Infinity, detail: 2, zoom: 1 }, 10);
    cache.setWanted('detail', ['a', 'b', 'c', 'd']); // cap=2 → нужны только a, b
    expect(jobs.map(j => j.id)).toEqual(['a', 'b']);
    await finish(jobs[0]); await finish(jobs[1]);
    expect(cache.count('detail')).toBe(2);

    cache.setWanted('detail', ['c', 'd']); // игрок ушёл: a, b больше не нужны
    expect(log.evict.sort()).toEqual(['detail:a', 'detail:b']);
    expect(log.disposed.sort()).toEqual(['detail:a', 'detail:b']);
    expect(cache.count('detail')).toBe(0);
  });

  it('при смене набора не освобождает то, что нужно и сейчас', async () => {
    const { cache, jobs, log, finish } = setup({ thumb: Infinity, detail: 2, zoom: 1 }, 10);
    cache.setWanted('detail', ['a', 'b']);
    await finish(jobs[0]); await finish(jobs[1]);
    cache.setWanted('detail', ['b', 'c']);
    expect(log.evict).toEqual(['detail:a']);
    expect(cache.has('b', 'detail')).toBe(true);
  });

  it('результат, пришедший после потери актуальности при полном кэше, освобождается', async () => {
    const { cache, jobs, log, finish } = setup({ thumb: Infinity, detail: 1, zoom: 1 }, 10);
    cache.setWanted('detail', ['a']);
    cache.setWanted('detail', ['b']);              // a ушла из нужных, пока грузилась
    await finish(jobs[0]);                          // a пришла: кэш (cap=1) занят ожиданием b → выбрасываем
    expect(log.ready).toEqual([]);
    expect(log.disposed).toEqual(['detail:a']);
  });

  it('миниатюры не ограничены', async () => {
    const { cache, jobs, finish } = setup({ thumb: Infinity, detail: 1, zoom: 1 }, 100);
    const ids = Array.from({ length: 50 }, (_, i) => `id${i}`);
    cache.setWanted('thumb', ids);
    for (const j of [...jobs]) await finish(j);
    expect(cache.count('thumb')).toBe(50);
  });

  it('ошибка загрузки: повтор только через retryAfterMs', async () => {
    const { cache, jobs, advance } = setup();
    cache.setWanted('thumb', ['a']);
    jobs[0].reject(new Error('404')); await Promise.resolve(); await Promise.resolve();
    cache.setWanted('thumb', ['a']);
    expect(jobs).toHaveLength(1);        // рано
    advance(1500);
    cache.setWanted('thumb', ['a']);
    expect(jobs).toHaveLength(2);        // повтор
  });

  it('повторный setWanted того же набора ничего не запускает заново', () => {
    const { cache, jobs } = setup();
    cache.setWanted('thumb', ['a', 'b']);
    cache.setWanted('thumb', ['a', 'b']);
    cache.setWanted('thumb', ['a', 'b']);
    expect(jobs).toHaveLength(2);
  });

  it('dispose освобождает всё, в том числе загрузки, завершившиеся позже', async () => {
    const { cache, jobs, log, finish } = setup({ thumb: Infinity, detail: 5, zoom: 1 }, 10);
    cache.setWanted('thumb', ['a', 'b']);
    await finish(jobs[0]);
    cache.dispose();
    await finish(jobs[1]);
    expect(log.disposed.sort()).toEqual(['thumb:a', 'thumb:b']);
    cache.setWanted('thumb', ['c']);
    expect(jobs).toHaveLength(2);        // после dispose новых загрузок нет
  });
});
