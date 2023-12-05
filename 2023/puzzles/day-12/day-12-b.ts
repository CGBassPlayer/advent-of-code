import { readData } from '../../common/shared.ts';
import chalk from 'chalk';

export async function day12b(dataPath?: string) {
  const data = await readData(dataPath);
  return 0;
}

const answer = await day12b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
