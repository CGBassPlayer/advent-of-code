import {
  readData,
  filterOutNaN,
  toNumberArray
} from '../../common/index.ts';
import chalk from 'chalk';

export async function day1b(dataPath?: string) {
  const numberStrings = [
    { num: 1, str: "one" },
    { num: 2, str: "two" },
    { num: 3, str: "three" },
    { num: 4, str: "four" },
    { num: 5, str: "five" },
    { num: 6, str: "six" },
    { num: 7, str: "seven" },
    { num: 8, str: "eight" },
    { num: 9, str: "nine" },
    { num: 1, str: "1" },
    { num: 2, str: "2" },
    { num: 3, str: "3" },
    { num: 4, str: "4" },
    { num: 5, str: "5" },
    { num: 6, str: "6" },
    { num: 7, str: "7" },
    { num: 8, str: "8" },
    { num: 9, str: "9" }
  ];

  const data = await readData(dataPath);
  let calibrationValues: number[] = [];
  data.forEach((line) => {
    const nums = filterOutNaN(toNumberArray([...line]))
    const foundNumber = `${nums[0]}${nums[nums.length - 1]}`;
    calibrationValues.push(+foundNumber)
  });

  return 0;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
