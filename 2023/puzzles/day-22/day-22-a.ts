import { readData } from '../../common/shared.ts';
import chalk from 'chalk';

export async function day22a(dataPath?: string) {
  const data = await readData(dataPath);
  return 0;
}

const answer = await day22a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
