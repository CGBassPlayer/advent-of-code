import {
  readData,
  sumOfArray
} from '../../common/index.ts';
import chalk from 'chalk';

interface FoundNumber {
  index: number,
  value: number
}

export async function day1b(dataPath?: string) {
  const lookup = [
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
    let firstFound: FoundNumber = { index: -1, value: -1 };
    let lastFound: FoundNumber = { index: -1, value: -1 };
    for (const item of lookup) {
      const firstIdx = line.indexOf(item.str);
      if (firstIdx === -1)
        continue;
      if (firstIdx < firstFound.index || firstFound.index === -1) {
        firstFound = { index: firstIdx, value: item.num };
      }
      if (firstIdx > lastFound.index) {
        lastFound = { index: firstIdx, value: item.num };
      }
      const lastIdx = line.lastIndexOf(item.str);
      if (lastIdx === firstIdx)
        continue;
      if (lastIdx < firstFound.index || firstFound.index === -1) {
        firstFound = { index: lastIdx, value: item.num };
      }
      if (lastIdx > lastFound.index) {
        lastFound = { index: lastIdx, value: item.num };
      }
    }
    console.log(`${firstFound.value}${lastFound.value}`);
    calibrationValues.push(+`${firstFound.value}${lastFound.value}`);
  });

  return sumOfArray(calibrationValues);
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
