import { readData, lcm } from '../../common/index.ts';
import chalk from 'chalk';

export interface NodeOptions {
  L: string;
  R: string;
}

export async function day8b(dataPath?: string) {
  const loopRanges: number[] = []
  const data = await readData(dataPath);
  const instructions = data[0].split("");
  const networkMap = new Map<string, NodeOptions>(
    data.slice(2)
      .map((line) => line.match(/^([A-Z0-9]{3}) = \(([A-Z0-9]{3}), ([A-Z0-9]{3})\)$/)?.slice(1))
      .filter((line): line is RegExpMatchArray => !!line)
      .map((matches) => [matches[0], { L: matches[1], R: matches[2] }]),
  );
  const startNodes = new Map<string, NodeOptions>(
    [...networkMap.entries()].filter(it => it[0].endsWith("A"))
      .map((matches) => [matches[0], matches[1]])
  );

  for (let currentNode of startNodes) {
    let z1Found = false;
    let z2Found = false;
    let instructionIdx = 0
    let loopSteps = 0
    while (!z2Found) {
      if (z1Found) {
        loopSteps++;
      }
      if (instructions[instructionIdx] === "L") {
        currentNode = [currentNode[1].L, networkMap.get(currentNode[1].L)];
      } else {
        currentNode = [currentNode[1].R, networkMap.get(currentNode[1].R)];
      }
      instructionIdx++;
      if (instructionIdx > instructions.length - 1) {
        instructionIdx = 0;
      }


      if (currentNode[0].endsWith("Z") && !z1Found) {
        z1Found = true;
      } else if (currentNode[0].endsWith("Z") && z1Found) {
        z2Found = true;
        loopRanges.push(loopSteps);
      }
    }
  }

  return lcm(loopRanges);
}

const answer = await day8b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
