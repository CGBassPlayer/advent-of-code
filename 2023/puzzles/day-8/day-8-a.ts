import { notEqual } from 'assert';
import { readData } from '../../common/shared.ts';
import chalk from 'chalk';

const START_POINT: string = "AAA";
const END_POINT: string = "ZZZ";

interface NetworkMap {
  node: string
  optionLeft: string
  optionRight: string
}

export async function day8a(dataPath?: string) {
  let steps = 0;
  const network: NetworkMap[] = [];
  const data = await readData(dataPath);
  const instructions = data[0].split("");

  for (const line of data.slice(2)) {
    const node = line.split(" = ")[0];
    const option1 = line.split(" = (")[1].split(", ")[0];
    const option2 = line.split(" = (")[1].split(", ")[1].slice(0, -1);

    network.push({
      node: node,
      optionLeft: option1,
      optionRight: option2
    })
  }

  let currentInstructionIdx = 0;
  let currentNetworkNode = network[network.findIndex(n => n.node === START_POINT)];

  while (currentNetworkNode.node !== END_POINT) {
    steps++;
    if (instructions[currentInstructionIdx] === "L") {
      currentNetworkNode = network[network.findIndex(n => n.node === currentNetworkNode.optionLeft)];;
    } else {
      currentNetworkNode = network[network.findIndex(n => n.node === currentNetworkNode.optionRight)];
    }
    currentInstructionIdx++;
    if (currentInstructionIdx > instructions.length - 1) {
      currentInstructionIdx = 0;
    }
  }

  return steps;
}

const answer = await day8a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
