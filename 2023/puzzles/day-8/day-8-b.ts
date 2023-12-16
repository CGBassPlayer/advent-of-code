import { readData } from '../../common/index.ts';
import chalk from 'chalk';

interface NetworkNode {
  node: string
  optionLeft: string
  optionRight: string
}

export async function day8b(dataPath?: string) {
  let steps = 0;
  const network: NetworkNode[] = [];
  const startNodes: NetworkNode[] = [];
  const endNodes: NetworkNode[] = [];
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

    if (node.endsWith("A")) {
      startNodes.push({
        node: node,
        optionLeft: option1,
        optionRight: option2
      });
    }
    if (node.endsWith("Z")) {
      endNodes.push({
        node: node,
        optionLeft: option1,
        optionRight: option2
      });
    }
  }

  let currentInstructionIdx = 0;
  let currentNetworkNodes = startNodes;

  let done = false;

  while (!arrayEquals(currentNetworkNodes, endNodes)) {
    steps++;
    // console.log(steps);
    // console.table(currentNetworkNodes);
    if (instructions[currentInstructionIdx] === "L") {
      for (const currentNetworkNode of currentNetworkNodes) {
        currentNetworkNodes[currentNetworkNodes.indexOf(currentNetworkNode)] = network[network.findIndex(n => n.node === currentNetworkNode.optionLeft)];
      }
    } else {
      for (const currentNetworkNode of currentNetworkNodes) {
        currentNetworkNodes[currentNetworkNodes.indexOf(currentNetworkNode)] = network[network.findIndex(n => n.node === currentNetworkNode.optionRight)];
      }
    }
    currentInstructionIdx++;
    if (currentInstructionIdx > instructions.length - 1) {
      currentInstructionIdx = 0;
    }
    if (steps % 5000 === 0) {
      console.log(steps);
    }
  }

  return steps;
}

const answer = await day8b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

function arrayEquals(a: NetworkNode[], b: NetworkNode[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((x) => b.some((y) => x.node === y.node && x.optionLeft === y.optionLeft && x.optionRight === y.optionRight));
}
