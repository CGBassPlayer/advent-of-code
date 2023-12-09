import { readData } from '../../common/index.ts';
import chalk from 'chalk';

interface Card {
  card: string,
  count: number
}

interface Turn {
  hand: string,
  bid: number,
  counts: Card[]
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

  console.log("Start");
  console.table(turns);

  turns = turns.sort((a, b) => {
    return -1
  });

  console.log("End");
  console.table(turns);

  return 0;
}

const answer = await day7a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

function getAllTurns(data: string[]): Turn[] {
  const turns: Turn[] = []
  for (const line of data) {
    let counts: Card[] = CARD_STRENGTH; // Reset counts
    const [hand, bid] = line.split(" ");
    const cards = hand.split('');
    for (const cs of CARD_STRENGTH) {
      for (const card of cards) {
        if (cs.card === card) {
          counts[counts.indexOf(cs)].count++
        }
      }
    }
    turns.push({
      hand: hand,
      bid: parseInt(bid),
      counts: counts
    })
  }

  return turns;
}