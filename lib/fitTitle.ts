/**
 * Font size that keeps a title on one line: as large as `max`, but small
 * enough that the whole title fits in `available` (a CSS length).
 * Assumes the display font is about 0.64em wide per character.
 */
export function fitTitle(title: string, max: string, available: string) {
    const ems = Math.max(title.length, 4) * 0.64;
    return { fontSize: `min(${max}, calc((${available}) / ${ems.toFixed(2)}))` };
}
