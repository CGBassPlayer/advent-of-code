import {readData, sumOfArray} from '../../common/index.ts';
import chalk from 'chalk';

const STRENGTH_MAPPING = {
  "J": 1, "2": 2, "3": 3, "4": 4, "5": 5,
  "6": 6, "7": 7, "8": 8, "9": 9, "T": 10,
  "Q": 12, "K": 13, "A": 14
};

interface Card {
  card: string,
  strength: number
}

enum HandType {
  FiveOfAKind,
  FourOfAKind,
  FullHouse,
  ThreeOfAKind,
  TwoPair,
  OnePair,
  HighCard
}

interface Turn {
  hand: string,
  type: HandType,
  bid: number,
  cards: Card[]
}

export async function day7b(dataPath?: string) {
  const data = await readData(dataPath);
  let turns = getAllTurns(data);

  turns.sort((a, b) => {
    if (a.type !== b.type) {
      return b.type - a.type;
    }

    for (let i = 0; i < a.cards.length; i++) {
      if (a.cards[i].strength !== b.cards[i].strength)
        return a.cards[i].strength - b.cards[i].strength;
    }

    return 0;
  });

  const totalWinnings: number[] = []
  turns.forEach((turn, rank) => {
    totalWinnings.push(turn.bid * (rank + 1));
  });

  return sumOfArray(totalWinnings);
}

const answer = await day7b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

function getAllTurns(data: string[]): Turn[] {
  const turns: Turn[] = [];
  for (const line of data) {
    let cards: Card[] = [];

    const [hand, bid] = line.split(" ");
    for (const card of hand.split('')) {
      cards.push({card: card, strength: STRENGTH_MAPPING[card]});
    }

    let jokerCount = 0;
    let frequency = new Map<string, number>();

    for (const card of cards) {
      if (card.card === "J") jokerCount++;
      else frequency.set(card.card, (frequency.get(card.card) || 0) + 1);
    }

    for (let j = 0; j < jokerCount; j++) {
      const bestUse = [...frequency.entries()].reduce((max, current) => {
        return max === null || current[1] > max[1] ? current : max;
      }, null);

      if (bestUse) {
        const [key, _] = bestUse;

        frequency.set(key, frequency.get(key) + 1);
      } else {
        frequency.set("*", 1);
      }
    }

    let pairs = 0, triplets = 0, quads = 0, quints = 0;
    for (const [_, val] of frequency) {
      if (val === 2) pairs++;
      else if (val == 3) triplets++;
      else if (val == 4) quads++;
      else if (val == 5) quints++;
    }

    let handType: HandType;
    if (quints === 1) handType = HandType.FiveOfAKind;
    else if (quads === 1) handType = HandType.FourOfAKind;
    else if (triplets === 1 && pairs === 1) handType = HandType.FullHouse;
    else if (triplets === 1) handType = HandType.ThreeOfAKind;
    else if (pairs === 2) handType = HandType.TwoPair;
    else if (pairs === 1) handType = HandType.OnePair;
    else handType = HandType.HighCard;

    turns.push({
      hand: hand,
      type: handType,
      bid: parseInt(bid),
      cards: cards
    })
  }

  return turns;
}
