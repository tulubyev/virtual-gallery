// src/config/jwt.ts
// Секрет JWT обязателен: запасных значений нет, иначе токены можно подделать.
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  return secret;
}
