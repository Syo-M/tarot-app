export const shuffleArray = <T,>(items: T[]): T[] => {
  const clone = [...items];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
  }
  return clone;
};

export const pickUniqueItems = <T,>(items: T[], count: number): T[] => {
  const shuffled = shuffleArray(items);
  return shuffled.slice(0, count);
};
