// lib/gallery/fit.ts
/** Вписывает прямоугольник с пропорцией aspect (ширина/высота) в max × max без искажений. */
export function fitInside(aspect: number, max: number): { w: number; h: number } {
  if (!Number.isFinite(aspect) || aspect <= 0) return { w: max, h: max };
  return aspect >= 1 ? { w: max, h: max / aspect } : { w: max * aspect, h: max };
}
