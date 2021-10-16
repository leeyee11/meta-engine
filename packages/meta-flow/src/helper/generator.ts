export const random = (dict: {[key: string]: number}) => {
  const rateMap = new Map<number[], string>();
  let start = 0;
  for (const key of Object.keys(dict)) {
    const end = start + dict[key];
    rateMap.set([start, end], key);
    start = end;
  }
  const randomVal = Math.random();
  const target = [...rateMap.entries()].find(([[start, end]]) => {
    return randomVal >= start && randomVal < end;
  });
  if (!target?.length ) {
    throw new Error('Randomly generat failed. Please check the dictonary.');
  }
  return target[1];
};
