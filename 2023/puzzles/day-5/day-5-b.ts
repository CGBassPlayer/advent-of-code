import { between, readData } from '../../common/index.ts';
import chalk from 'chalk';

interface MapDetail {
  map: string
  destinationRangeStart: number
  sourceRangeStart: number
  rangeLength: number
}

const maps = [
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location"
];

export async function day5b(dataPath?: string) {
  let location: number = Number.MAX_VALUE;
  const data = await readData(dataPath);
  const mapDetails = maps.map((map) => getMapDetails(data, map));
  const groups: number[] = data[0].split(": ")[1].split(" ").map((i => parseInt(i)));

  for (let i = 0; i < groups.length; i += 2) {
    console.log("set:", i/2 + 1);
    const seedStart = groups[i];
    const seedRange = groups[i + 1];
    for (let s = seedStart; s < seedStart+seedRange; s++) {
      let seed = s;
      for (const v of mapDetails) {
        for (const detail of v) {
          // console.table(v);
          if (between(seed, detail.sourceRangeStart, detail.sourceRangeStart + detail.rangeLength)) {
            seed += (detail.destinationRangeStart - detail.sourceRangeStart);
            break;
          }
        }
      }
      if (seed < 0) {
        console.log(chalk.bgRed("SEED BELOW 0"), chalk.redBright(seed));
        process.exit(1);
      }
      if (location > seed) {
        location = seed;
        console.log("location:", location)
      }
    }
  }

  return location;
}

const answer = await day5b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

function getMapDetails(data: string[], map: string): MapDetail[] {
  const desiredLines: string[] = [];
  let foundMap: boolean = false;
  data.forEach((line) => {
    if (line === `${map} map:`) {
      foundMap = true;
      return;
    }
    if (!line) { // if it is a blank line
      foundMap = false;
      return;
    }
    if (foundMap) {
      desiredLines.push(line);
      return;
    }
  });
  const mapDetails: MapDetail[] = [];
  desiredLines.forEach((line) => {
    const [dest, src, ran] = line.split(" ").map((i) => parseInt(i));
    mapDetails.push({
      map: map,
      destinationRangeStart: dest,
      sourceRangeStart: src,
      rangeLength: ran // Indexes start at 0 so removing 1 from the length
    });
  });

  return mapDetails;
}