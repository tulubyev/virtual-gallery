export const isObjectBody = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

export const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const isEmail = (value: unknown): value is string =>
  isNonEmptyString(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const hasOnlyFields = (body: Record<string, unknown>, fields: string[]): boolean =>
  Object.keys(body).every(field => fields.includes(field));
