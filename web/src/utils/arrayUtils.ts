/** Random order via sort keys (not Fisher–Yates). */
export const shuffleArray = <T,>(array: T[]): T[] =>
  array
    .map((value) => ({ value, k: Math.random() }))
    .sort((a, b) => a.k - b.k)
    .map(({ value }) => value)

