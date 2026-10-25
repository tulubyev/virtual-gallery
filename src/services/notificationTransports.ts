// src/services/notificationTransports.ts — способы отправки уведомлений участникам торгов вовне.
//
// Какой канал и какого провайдера использовать (e-mail, SMS, мессенджер; хранение в РФ — ст. 18 ч. 5 152-ФЗ), решает владелец вместе с юристом
// (docs/AUCTION-DESIGN.md, раздел 8, вопрос 10). Пока здесь только заглушка для стенда: она ничего не отправляет и не пишет адресов в журнал.
// Настоящий провайдер добавляется как ещё один Transport и подключается в transportFromEnv.

export interface OutgoingMessage {
  notificationId: number;
  userId: number;
  to: string;
  subject: string;
  text: string;
}

export interface Transport {
  readonly name: string;
  send(message: OutgoingMessage): Promise<void>;
}

/** Заглушка для стенда: пишет в журнал только номер уведомления, пользователя и тему — без адреса и текста. */
export function logTransport(log: (line: string) => void = line => console.log(line)): Transport {
  return {
    name: 'log',
    async send(message) { log(`[notify] уведомление ${message.notificationId} для пользователя ${message.userId}: ${message.subject}`); },
  };
}

/** NOTIFY_TRANSPORT=log включает заглушку; пусто или none — внешняя отправка выключена (уведомления видны только в кабинете). */
export function transportFromEnv(env: NodeJS.ProcessEnv = process.env): Transport | null {
  const name = (env.NOTIFY_TRANSPORT ?? '').trim().toLowerCase();
  if (name === '' || name === 'none') return null;
  if (name === 'log') return logTransport();
  throw new Error(`NOTIFY_TRANSPORT=${name}: такого способа отправки нет (доступно: none, log)`);
}
