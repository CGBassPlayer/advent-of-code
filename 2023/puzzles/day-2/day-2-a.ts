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

const RED_MAX = 12;
const GREEN_MAX = 13;
const BLUE_MAX = 14;

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  const validGames = [];
  data.forEach((line) => {
    let isValid = true;
    const game = parseLine(line);
    game.sets.forEach((set) => {
      if (set.red > RED_MAX || set.green > GREEN_MAX || set.blue > BLUE_MAX) {
        isValid = false;
      }
    });
    console.log(game.gameNumber, isValid);
    if (isValid) {
      validGames.push(game.gameNumber);
    }
  });
  return sumOfArray(validGames);
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