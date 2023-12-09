import { readData, sumOfArray } from '../../common/index.ts';
import chalk from 'chalk';

interface Card {
  card: string,
  count: number
}

interface Turn {
  hand: string,
  bid: number,
  cards: Card[]
}

const CARD_STRENGTH: Card[] = [
  { card: "A", count: 0 },
  { card: "K", count: 0 },
  { card: "Q", count: 0 },
  { card: "J", count: 0 },
  { card: "T", count: 0 },
  { card: "9", count: 0 },
  { card: "8", count: 0 },
  { card: "7", count: 0 },
  { card: "6", count: 0 },
  { card: "5", count: 0 },
  { card: "4", count: 0 },
  { card: "3", count: 0 },
  { card: "2", count: 0 }
]

export async function day7a(dataPath?: string) {
  const data = await readData(dataPath);
  let turns = getAllTurns(data);

  turns.sort((a, b) => {
    const aMax = Math.max.apply(Math, a.cards.map(function (o) { return o.count }));
    const bMax = Math.max.apply(Math, b.cards.map(function (o) { return o.count }));
    if (aMax > bMax) {
      return 1
    }
    if (aMax < bMax) {
      return -1
    }

    // Full House vs 3 of a kind
    if (aMax === 3 && bMax === 3) {
      const aCounts = a.cards.map(function (o) { return o.count });
      const bCounts = b.cards.map(function (o) { return o.count });

      if (aCounts.includes(2) && !bCounts.includes(2)) {
        return 1;
      }
      if  (!aCounts.includes(2) && bCounts.includes(2)) {
        return -1;
      }
    }

    // 2 Pairs vs 2 of a kind
    if (aMax ===2  && bMax === 2) {
      const aCounts = a.cards.map(function (o) { return o.count });
      const bCounts = b.cards.map(function (o) { return o.count });

      if (aCounts.indexOf(2) !== aCounts.lastIndexOf(2) && bCounts.indexOf(2) === bCounts.lastIndexOf(2)) {
        return 1;
      }
      if (aCounts.indexOf(2) === aCounts.lastIndexOf(2) && bCounts.indexOf(2) !== bCounts.lastIndexOf(2)) {
        return -1;
      }
    }

    let cardIdx = 0
    while (cardIdx < a.hand.length) {
      const aCardStrength = CARD_STRENGTH.findIndex(item => item.card === a.hand[cardIdx]);
      const bCardStrength = CARD_STRENGTH.findIndex(item => item.card === b.hand[cardIdx]);
      if (aCardStrength < bCardStrength) {
        return 1;
      }
      if (aCardStrength > bCardStrength) {
        return -1;
      }
      cardIdx++;
    }
    return 0;
  });

  const totalWinnigs: number [] = []
  turns.forEach((turn, rank) => {
    totalWinnigs.push(turn.bid * (rank + 1));
  });

  // console.table(turns);
  // turns.forEach((turn) => {console.table(turn.cards)});

  return sumOfArray(totalWinnigs);
}

const answer = await day7a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
// 249737949 Too low
// 250152525 Too low
// 250232501


function getAllTurns(data: string[]): Turn[] {
  const turns: Turn[] = [];
  for (const line of data) {
    let counts: Card[] = [
      { card: "A", count: 0 },
      { card: "K", count: 0 },
      { card: "Q", count: 0 },
      { card: "J", count: 0 },
      { card: "T", count: 0 },
      { card: "9", count: 0 },
      { card: "8", count: 0 },
      { card: "7", count: 0 },
      { card: "6", count: 0 },
      { card: "5", count: 0 },
      { card: "4", count: 0 },
      { card: "3", count: 0 },
      { card: "2", count: 0 }
    ];
    const [hand, bid] = line.split(" ");
    const cards = hand.split('');
    for (const cs of counts) {
      for (const card of cards) {
        if (cs.card === card) {
          cs.count++;
        }
      }
    }
    turns.push({
      hand: hand,
      bid: parseInt(bid),
      cards: counts
    })
  }

  return turns;
}