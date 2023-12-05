import {
  readData,
  filterOutNaN,
  toNumberArray,
  sumOfArray
} from '../../common/index.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  let calibrationValues: number[] = [];
  data.forEach((line) => {
    const nums = filterOutNaN(toNumberArray([...line]))
    const foundNumber = `${nums[0]}${nums[nums.length - 1]}`;
    calibrationValues.push(+foundNumber)
  });
  return sumOfArray(calibrationValues);
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
