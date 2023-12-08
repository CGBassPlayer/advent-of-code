import { readData } from '../../common/index.ts';
import chalk from 'chalk';

interface Record {
  time: number,
  distance: number
}

export async function day6b(dataPath?: string) {
  const data = await readData(dataPath);
  const race = generateRecord(data);

  console.table(race);

  let winCount = 0;

  for (let i=0; i<race.time; i++) {
    if (race.distance < calculateDistance(race.time, i)) {
      winCount++
    }
  }


  return winCount;
}

const answer = await day6b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));


function generateRecord(data: string[]): Record {

  let times: number = -1;
  let distances: number = -1;

  for (const line of data) {
    switch (line.split(":")[0]) {
      case "Time":
        times = parseInt(line.split(":")[1].trim().replace(/\s/g, ""));
        break;
      case "Distance":
        distances = parseInt(line.split(":")[1].trim().replace(/\s/g, ""));
        break;
    }
  }
  return {
    time: times,
    distance: distances
  };
}

function calculateDistance(totalTime: number, holdTime:number): number {
  return (totalTime - holdTime) * holdTime;
}