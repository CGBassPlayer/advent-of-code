import { sumOfArray } from '../../common/math.ts';
import { readData } from '../../common/shared.ts';
import chalk from 'chalk';

interface Set {
  red: number,
  green: number,
  blue: number
}

interface GameData {
  gameNumber: number,
  sets: Set[]
}

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  const colorPowers = [];
  data.forEach((line) => {
    const game = parseLine(line);
    let redMin = 0;
    let greetMin = 0;
    let blueMin = 0;
    game.sets.forEach((set) => {
      if(set.red > redMin) {
        redMin = set.red;
      }
      if(set.green > greetMin) {
        greetMin = set.green;
      }
      if(set.blue > blueMin) {
        blueMin = set.blue;
      }
    });
    colorPowers.push(redMin * greetMin * blueMin);
  });
  return sumOfArray(colorPowers);
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

function parseLine(line: string): GameData {
  const gameNumber = parseInt(line.split(':')[0].split(' ')[1]);
  let sets = [];
  let redCubes = 0;
  let greenCubes = 0;
  let blueCubes = 0;
  for (const set of line.split(': ')[1].split('; ')) {
    let seenCubes = {};
    for (const cubes of set.split(', ')) {
      if (cubes.includes('red')) {
        redCubes = parseInt(cubes.split(' ')[0]);
      } else if (cubes.includes('green')) {
        greenCubes = parseInt(cubes.split(' ')[0]);
      } else if (cubes.includes('blue')) {
        blueCubes = parseInt(cubes.split(' ')[0]);
      }
      seenCubes = {
        red: redCubes,
        green: greenCubes,
        blue: blueCubes
      }
    }
    sets.push(seenCubes);
  }

  return {
    gameNumber: gameNumber,
    sets: sets
  };
}