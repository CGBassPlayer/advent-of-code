import { productOfArray, readData } from '../../common/index.ts';
import chalk from 'chalk';

interface Record {
  time: number,
  distance: number
}

export async function day6a(dataPath?: string) {
  const data = await readData(dataPath);
  const races = generateTable(data);
  const waysToWin = []

  for(const race of races) {
    let winCount = 0;

    for (let i=0; i<race.time; i++) {
      if (race.distance < calculateDistance(race.time, i)) {
        winCount++
      }
    }
    waysToWin.push(winCount);
  }

  return productOfArray(waysToWin);
}

const answer = await day6a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));


function generateTable(data): Record[] {
  const records: Record[] = []

  let times: number[] = [];
  let distances: number[] = [];

  for (const line of data) {
    switch (line.split(":")[0]) {
      case "Time":
        times = line.split(":")[1].trim().split(" ").filter((n) => { return n !== "" });
        break;
      case "Distance":
        distances = line.split(":")[1].trim().split(" ").filter((n) => { return n !== "" });
        break;
    }
  }

  if (times.length !== distances.length || times.length === 0 || distances.length === 0) {
    console.log(chalk.bgRed("FILE PARSE FAILURE"), chalk.redBright(`Times: ${times.length}, Distances: ${distances.length}`));
    console.log(chalk.redBright("Mismatch of values or no value was parsed for 1 or more sets are 0"));
    process.exit(1);
  }

  for (let i = 0; i < times.length && i < distances.length; i++)
    records.push({
      time: times[i],
      distance: distances[i]
    });
  return records;
}

function calculateDistance(totalTime: number, holdTime:number): number {
  return (totalTime - holdTime) * holdTime;
}