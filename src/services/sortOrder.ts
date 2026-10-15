/**
 * SQL identifiers and keywords cannot be bound as query parameters.
 * Only allow exact column names and directions before interpolating them.
 */
export function buildOrderBy(
  allowedColumns: readonly string[],
  sortBy: unknown,
  sortOrder: unknown,
  defaultOrder: 'ASC' | 'DESC' = 'DESC'
): string {
  if (
    (sortBy !== undefined && (typeof sortBy !== 'string' || !allowedColumns.includes(sortBy))) ||
    (sortOrder !== undefined && sortOrder !== 'ASC' && sortOrder !== 'DESC')
  ) {
    return ' ORDER BY created_at DESC';
  }

  return ` ORDER BY ${sortBy === undefined ? 'created_at' : sortBy} ${sortOrder === undefined ? defaultOrder : sortOrder}`;
}
