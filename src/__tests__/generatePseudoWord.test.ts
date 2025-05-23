import { type SpyInstance, spyOn } from 'jest-mock';

import { generatePseudoWord } from '../generatePseudoWord.js';

describe('generatePseudoWord', () => {
  // Mock random functions for deterministic tests
  let mathRandomSpy: SpyInstance;

  beforeEach(() => {
    // Reset the mock before each test
    mathRandomSpy = spyOn(Math, 'random');
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  test('should generate a word with default parameters', () => {
    const result = generatePseudoWord();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toMatch(/[A-Z]/); // First letter should be capitalized
  });

  test('should generate a word with min syllables', () => {
    // Mock random to always return 0 (will generate minimum number of syllables)
    mathRandomSpy.mockReturnValue(0);

    const result = generatePseudoWord(3, 5);
    // Each syllable has at least 2 characters
    expect(result.length).toBeGreaterThanOrEqual(6);
    expect(result[0]).toMatch(/[A-Z]/);
  });

  test('should generate a word with max syllables', () => {
    // Mock random to return values that will generate max syllables
    mathRandomSpy.mockReturnValue(0.99);

    const result = generatePseudoWord(2, 3);
    expect(result.length).toBeGreaterThanOrEqual(6);
    expect(result[0]).toMatch(/[A-Z]/);
  });

  test('should not capitalize first letter when specified', () => {
    const result = generatePseudoWord(2, 3, false);
    expect(result[0]).toMatch(/[a-z]/); // First letter should not be capitalized
  });

  test('should generate different words on multiple calls', () => {
    // Reset the mock to use actual random
    mathRandomSpy.mockRestore();

    const word1 = generatePseudoWord();
    const word2 = generatePseudoWord();
    expect(word1).not.toEqual(word2);
  });

  test('should handle single syllable case', () => {
    const result = generatePseudoWord(1, 1);
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result[0]).toMatch(/[A-Z]/);
  });

  test('should handle large syllable count', () => {
    const result = generatePseudoWord(10, 10);
    expect(result.length).toBeGreaterThanOrEqual(20);
    expect(result[0]).toMatch(/[A-Z]/);
  });

  test('should respect minSyllables and maxSyllables being equal', () => {
    mathRandomSpy.mockReturnValue(0.5);
    const result = generatePseudoWord(4, 4);
    expect(result[0]).toMatch(/[A-Z]/);
  });
});
