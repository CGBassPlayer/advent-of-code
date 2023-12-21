import { readData, allEqual, sumOfArray } from '../../common/index.ts';
import chalk from 'chalk';

export async function day9b(dataPath?: string) {
  const predicitions: number[] = []
  const data = await readData(dataPath);
  for (const line of data) {
    const sequence: number[] = line.split(" ").map(Number);
    let extrapolated: number[][] = []
    let [distances, isEqualDistance] = getDistances(sequence);
    extrapolated.push(distances);
    while (!isEqualDistance) {
      [distances, isEqualDistance] = getDistances(distances);
      extrapolated.push(distances);
    }

    extrapolated = addPredictionsToList(extrapolated);
    // console.log(sequence);
    // console.table(extrapolated);

    predicitions.push(sequence[0] - extrapolated[0][0]);
  }
  return sumOfArray(predicitions);
}

const answer = await day9b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));


function getDistances(sequence: number[]): [number[], boolean] {
  const distances = [sequence[1] - sequence[0]];
  for (let idx = 1; idx < sequence.length - 1; idx++) { // Skip last number in sequence
    distances.push(sequence[idx + 1] - sequence[idx])
  }
  return [distances, allEqual(distances)];
}

function addPredictionsToList(extrapolatedList: number[][]): number[][] {
  extrapolatedList[extrapolatedList.length - 1].unshift(extrapolatedList[extrapolatedList.length - 1][0]);
    for (let i = extrapolatedList.length - 2; i>=0; i--) {
      extrapolatedList[i].unshift(extrapolatedList[i][0] - extrapolatedList[i + 1][0])
    }
  return extrapolatedList;
}
