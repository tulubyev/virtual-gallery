// src/services/biddingWorker.ts — раз в секунду открывает наступившие торги и закрывает истёкшие лоты.
// Включается вместе с маршрутами (BIDDING_ENABLED=true). Если миграция ещё не применена, не шумит: проверяет раз в минуту.
import { tick } from './bidding';

const MISSING_OBJECT_CODES = new Set(['42P01', '42883']);       // нет таблицы / функции

export function startBiddingWorker(options: { intervalMs?: number; run?: typeof tick; log?: (m: string) => void } = {}) {
  const interval = options.intervalMs ?? 1000;
  const run = options.run ?? tick;
  const log = options.log ?? ((m: string) => console.log(`[bidding] ${m}`));
  let stopped = false;
  let timer: NodeJS.Timeout | undefined;
  let warnedMissing = false;

  const loop = async () => {
    let delay = interval;
    try {
      const { opened, closed } = await run();
      warnedMissing = false;
      if (opened.length) log(`торги открыты: аукционы ${opened.join(', ')}`);
      for (const lot of closed) log(`лот ${lot.lot_id} закрыт: ${lot.outcome}`);
    } catch (error: any) {
      if (MISSING_OBJECT_CODES.has(error?.code)) {
        if (!warnedMissing) log('таблицы торгов не найдены — примените миграции (npm run migrate); проверка раз в минуту');
        warnedMissing = true;
        delay = 60_000;
      } else {
        console.error('[bidding] сбой воркера:', error?.message);
        delay = Math.max(interval, 5000);
      }
    }
    if (!stopped) {
      timer = setTimeout(loop, delay);
      timer.unref?.();
    }
  };
  timer = setTimeout(loop, interval);
  timer.unref?.();
  return { stop() { stopped = true; if (timer) clearTimeout(timer); } };
}
