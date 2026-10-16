// services/columns.ts
// Имена колонок в динамических UPDATE подставляются в SQL, поэтому берём только разрешённые.
export function pickColumns(data: Record<string, any>, allowed: readonly string[]): [string, any][] {
  return Object.entries(data).filter(([key, value]) => allowed.includes(key) && value !== undefined);
}
