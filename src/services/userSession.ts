// src/services/userSession.ts — мелкие помощники сессии, общие для middleware и маршрутов (без тяжёлых зависимостей).
import pool from '../config/database';

/** До применения миграции 007 столбцов ещё нет (код выкатывается раньше `npm run migrate`): вход и список работают по старому запросу. */
export async function queryWithFallback(newSql: string, oldSql: string, params: any[] = []) {
  try {
    return await pool.query(newSql, params);
  } catch (e: any) {
    if (e?.code === '42703') return pool.query(oldSql, params);
    throw e;
  }
}

/** Токен выдан до последней смены пароля (в том числе сброса администратором) — он больше не действует. Сравнение по целым секундам: iat в токене целый. */
export const issuedBeforePasswordChange = (iat: number | undefined, changedAt: Date | null | undefined): boolean =>
  !!changedAt && typeof iat === 'number' && iat < Math.floor(changedAt.getTime() / 1000);
