import chalk from 'chalk';
import { readData, sumOfArray, toNumberArray } from '../../common/index.ts';

interface Card {
  cardNumber: number
  winningNumbers: number[]
  yourNumbers: number[]
  matches: number
  cardInstances: number
}

export async function day4b(dataPath?: string) {
  const cards: Card[] = []
  const scratchCards = []
  const data = await readData(dataPath);
  data.forEach((line) => {
    cards.push(generateCard(line));
  });

  cards.forEach((card) => {
    const cardIdx = cards.indexOf(card);
    for (let ci = 1; ci <= card.cardInstances; ci++) {
      for (let i = 1; i <= card.matches; i++) {
        cards[cardIdx + i].cardInstances++;
      }
    }
    scratchCards.push(card.cardInstances);
  });


  console.table(cards);
  return sumOfArray(scratchCards);
}

const answer = await day4b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

function generateCard(line: string): Card {
  let matches = 0;
  const cardNumber = line.split(":")[0].split(" ")[1];
  const winningNumbers = line.split(":")[1].split(" | ")[0].trim().split(" ");
  while (winningNumbers.indexOf("") !== -1) {
    winningNumbers.splice(winningNumbers.indexOf(""), 1);
  }
  const yourNumbers = line.split("| ")[1].replace(/(\r\n|\n|\r)/gm, "").trim().split(" ");
  while (yourNumbers.indexOf("") !== -1) {
    yourNumbers.splice(yourNumbers.indexOf(""), 1);
  }

  for (const yourNum of yourNumbers) {
    if (winningNumbers.includes(yourNum)) {
      matches++;
    }
  }

  return {
    cardNumber: +cardNumber,
    winningNumbers: toNumberArray(winningNumbers),
    yourNumbers: toNumberArray(yourNumbers),
    cardInstances: 1,
    matches: matches
  };
}