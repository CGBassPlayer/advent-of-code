import { CANCELLED } from 'dns';
import { readData } from '../../common/shared.ts';
import chalk from 'chalk';
import { toNumberArray } from '../../common/map.ts';
import { sumOfArray } from '../../common/math.ts';

interface Card {
  cardNumber: number
  winningNumbers: number[]
  yourNumbers: number[]
}

export async function day4a(dataPath?: string) {
  const scores = []
  const cards: Card[] = []
  const data = await readData(dataPath);
  data.forEach((line) => {
    cards.push(parseLine(line));
  });

  cards.forEach((card) => {
    let score = 0;
    for (const yourNum of card.yourNumbers) {
      if (card.winningNumbers.includes(yourNum)) {
        if (score === 0) {
          score++;
          continue;
        }
        score = score * 2
      }
    }
    scores.push(score);
  });
  console.log(scores);

  return sumOfArray(scores);
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

function parseLine(line: string): Card {
  const cardNumber = line.split(":")[0].split(" ")[1];
  const winningNumbers = line.split(":")[1].split(" | ")[0].trim().split(" ");
  while (winningNumbers.indexOf("") !== -1) {
    winningNumbers.splice(winningNumbers.indexOf(""), 1);
  }
  const yourNumbers = line.split("| ")[1].replace(/(\r\n|\n|\r)/gm, "").trim().split(" ");
  while (yourNumbers.indexOf("") !== -1) {
    yourNumbers.splice(yourNumbers.indexOf(""), 1);
  }

  return {
    cardNumber: +cardNumber,
    winningNumbers: toNumberArray(winningNumbers),
    yourNumbers: toNumberArray(yourNumbers)
  };
}