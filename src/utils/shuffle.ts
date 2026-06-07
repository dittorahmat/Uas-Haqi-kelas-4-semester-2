/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Fisher-Yates shuffle algorithm to shuffle an array immutably.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Helper to get exactly N random unique elements from an array of questions.
 */
export function getRandomSlice<T>(array: T[], count: number): T[] {
  if (array.length <= count) {
    return shuffleArray(array); // return shuffled copy of all if there aren't enough
  }
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
}
