import removeAccents from 'remove-accents';
import XRegExp from 'xregexp';

// Extended Unicode punctuation removal, including Japanese-style ones
const PUNCTUATION_REGEX = XRegExp(
  `[\\p{P}\\p{S}ー〜・「」、。『』（）［］【】《》〈〉｛｝！？”：；、｡｢｣…]`,
  'gu'
);

export function normalizeText(input: string): string {
  const noAccents = removeAccents(input);
  const stripped = noAccents.replace(PUNCTUATION_REGEX, '');
  return stripped.trim().toLowerCase();
}
