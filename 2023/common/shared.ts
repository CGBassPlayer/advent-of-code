import { readFile } from 'fs/promises';

export async function readData(path?: string) {
  const fileName = path || process.argv[2];
  const data = (await readFile(fileName)).toString().split('\n');
  return data;
}

export function between(x: number, min: number, max: number): boolean {
  return x >= min && x <= max;
}

