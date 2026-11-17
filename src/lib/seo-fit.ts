/**
 * Length rules for search snippets. Titles render in search results at roughly
 * 50-60 characters, and descriptions are capped at 155 so the whole description shows on mobile results.
 * Every page is held to these ranges, including the health pages still waiting for Dr. Panesar's review,
 * so publishing them never needs a copy change.
 */
export const TITLE_MIN = 50;
export const TITLE_MAX = 60;
export const DESCRIPTION_MIN = 150;
export const DESCRIPTION_MAX = 155;

/**
 * Returns the first candidate whose length falls in the title range. Throws when
 * none fits, so a build fails rather than shipping a title outside the rule.
 */
export function fitTitle(candidates: readonly string[]): string {
  const hit = candidates.find((c) => c.length >= TITLE_MIN && c.length <= TITLE_MAX);
  if (!hit) {
    throw new Error(`No title candidate is ${TITLE_MIN}-${TITLE_MAX} characters: ${candidates.join(' || ')}`);
  }
  return hit;
}

/** Same rule for meta descriptions. */
export function fitDescription(candidates: readonly string[]): string {
  const hit = candidates.find((c) => c.length >= DESCRIPTION_MIN && c.length <= DESCRIPTION_MAX);
  if (!hit) {
    throw new Error(
      `No description candidate is ${DESCRIPTION_MIN}-${DESCRIPTION_MAX} characters: ${candidates.join(' || ')}`,
    );
  }
  return hit;
}
