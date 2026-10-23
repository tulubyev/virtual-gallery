import { useEffect, useState } from 'react';
import { formatRemaining, remainingMs } from '../../lib/bidding';

/** Оставшееся время до `endsAt` по серверным часам; обновляется раз в секунду. */
export function useCountdown(endsAt: string | null, offsetMs: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!endsAt) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [endsAt]);
  const ms = remainingMs(endsAt, offsetMs, now);
  return { ms, text: formatRemaining(ms), urgent: ms !== null && ms > 0 && ms < 3 * 60 * 1000 };
}
