// Alien alphabet mapping
const alienAlphabet: Record<string, string> = {
  A: '⏃', B: '⏚', C: '☊', D: '⎅', E: '⟒', F: '⎎', G: '☌',
  H: '⊑', I: '⟟', J: '⟊', K: '☍', L: '⌰', M: '⋔', N: '⋏',
  O: '⍜', P: '⌿', Q: '⍾', R: '⍀', S: '⌇', T: '⏁', U: '⎍',
  V: '⎐', W: '⍙', X: '⌖', Y: '⊬', Z: '⋉'
};

// Create reverse mapping for alien to english
const englishAlphabet: Record<string, string> = Object.fromEntries(
  Object.entries(alienAlphabet).map(([key, value]) => [value, key])
);

export function translateText(text: string, direction: 'toAlien' | 'toEnglish'): string {
  if (!text) return '';

  const mapping = direction === 'toAlien' ? alienAlphabet : englishAlphabet;
  
  return text
    .split('')
    .map(char => {
      // Convert to uppercase for mapping lookup
      const upperChar = char.toUpperCase();
      
      // If character exists in mapping, translate it
      if (mapping[upperChar]) {
        return mapping[upperChar];
      }
      
      // Otherwise, preserve the character (spaces, punctuation, numbers, etc.)
      return char;
    })
    .join('');
}
