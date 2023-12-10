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
  { card: "T", count: 0 },
  { card: "9", count: 0 },
  { card: "8", count: 0 },
  { card: "7", count: 0 },
  { card: "6", count: 0 },
  { card: "5", count: 0 },
  { card: "4", count: 0 },
  { card: "3", count: 0 },
  { card: "2", count: 0 },
  { card: "J", count: 0 }
]

export async function day7b(dataPath?: string) {
  const data = await readData(dataPath);
  let turns = getAllTurns(data);

  turns.sort((a, b) => {
    // occurrences
    const aJokerCountList = a.cards.map(function (o) {
      if (o.card === "J") {
        return o.count;
      }
      return;
    });
    const bJokerCountList = b.cards.map(function (o) {
      if (o.card === "J") {
        return o.count;
      }
      return;
    });
    const aJokerCount = aJokerCountList[aJokerCountList.length - 1] || 0;
    const bJokerCount = bJokerCountList[bJokerCountList.length - 1] || 0;

    const aMax: number = Math.max.apply(Math, a.cards.map(function (o) {
      if (o.card === "J") {
        return 0; // Joker cards are counted separately, adding them in would double count them
      }
      return o.count;
    }));
    const bMax: number = Math.max.apply(Math, b.cards.map(function (o) {
      if (o.card === "J") {
        return 0; // Joker cards are counted separately, adding them in would double count them
      }
      return o.count;
    }));

    if (aMax + aJokerCount > bMax + bJokerCount) {
      return 1
    }
    if (aMax + aJokerCount < bMax + bJokerCount) {
      return -1
    }

    // Full House vs 3 of a kind
    if (aMax + aJokerCount === 3 && bMax + bJokerCount === 3) {
      const aCounts = a.cards.map(function (o) { return o.count });
      const bCounts = b.cards.map(function (o) { return o.count });

      if (aCounts.includes(2) && !bCounts.includes(2)) {
        return 1;
      }
      if (!aCounts.includes(2) && bCounts.includes(2)) {
        return -1;
      }
    }

    // 2 Pairs vs 2 of a kind
    if (aMax + aJokerCount === 2 && bMax + bJokerCount === 2) {
      const aCounts = a.cards.map(function (o) { return o.count });
      const bCounts = b.cards.map(function (o) { return o.count });

      if (aCounts.indexOf(2) !== aCounts.lastIndexOf(2) && bCounts.indexOf(2) === bCounts.lastIndexOf(2)) {
        return 1;
      }
      if (aCounts.indexOf(2) === aCounts.lastIndexOf(2) && bCounts.indexOf(2) !== bCounts.lastIndexOf(2)) {
        return -1;
      }
    }

    // Card value check
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

  console.table(turns);

  const totalWinnigs: number[] = []
  turns.forEach((turn, rank) => {
    totalWinnigs.push(turn.bid * (rank + 1));
  });

  return sumOfArray(totalWinnigs);
}

const answer = await day7b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
// 248731027 too low
// 248362756


function getAllTurns(data: string[]): Turn[] {
  const turns: Turn[] = [];
  for (const line of data) {
    let counts: Card[] = [
      { card: "A", count: 0 },
      { card: "K", count: 0 },
      { card: "Q", count: 0 },
      { card: "T", count: 0 },
      { card: "9", count: 0 },
      { card: "8", count: 0 },
      { card: "7", count: 0 },
      { card: "6", count: 0 },
      { card: "5", count: 0 },
      { card: "4", count: 0 },
      { card: "3", count: 0 },
      { card: "2", count: 0 },
      { card: "J", count: 0 }
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