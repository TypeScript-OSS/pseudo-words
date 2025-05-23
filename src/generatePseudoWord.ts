const vowels = ['a', 'e', 'i', 'o', 'u'];
const consonants = [
  'b',
  'c',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'm',
  'n',
  'p',
  'qu',
  'r',
  's',
  't',
  'v',
  'w',
  'x',
  'y',
  'z',
  'ch',
  'sh',
  'th',
  'wh',
  'st',
  'gr',
  'tr',
  'br',
  'cl'
];

export const generatePseudoWord = (minSyllables = 2, maxSyllables = 4, capitalizeFirstLetter = true): string => {
  const syllableCount = minSyllables + Math.floor(Math.random() * (maxSyllables - minSyllables + 1));

  const syllables: string[] = [];
  for (let i = 0; i < syllableCount; i += 1) {
    syllables.push(getRandomSyllable());
  }

  if (capitalizeFirstLetter) {
    syllables[0] = `${syllables[0].charAt(0).toUpperCase()}${syllables[0].slice(1)}`;
  }

  return syllables.join('');
};

// Helpers

const getRandomValueFromArray = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomSyllable = (): string => {
  const structure = Math.random();
  if (structure < 0.3) {
    // Consonant-Vowel
    return `${getRandomValueFromArray(consonants)}${getRandomValueFromArray(vowels)}`;
  } else if (structure < 0.6) {
    // Consonant-Vowel-Consonant
    return `${getRandomValueFromArray(consonants)}${getRandomValueFromArray(vowels)}${getRandomValueFromArray(consonants)}`;
  } else {
    // Vowel-Consonant
    return `${getRandomValueFromArray(vowels)}${getRandomValueFromArray(consonants)}`;
  }
};
