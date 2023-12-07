import { between, readData } from '../../common/index.ts';
import chalk from 'chalk';

interface MapDetail {
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
]

export async function day5a(dataPath?: string) {
  const locations: number[] = [];
  const data = await readData(dataPath);
  const initialSeeds: number[] = data[0].split(": ")[1].split(" ").map((i => parseInt(i)));
  initialSeeds.forEach((seed) => {
    maps.forEach((map) => {
      for (const detail of getMapDetails(data, map)) {
        if (between(seed, detail.sourceRangeStart, detail.sourceRangeStart + detail.rangeLength)) {
          seed += (detail.destinationRangeStart - detail.sourceRangeStart);
          break;
        }
      }
    });
    locations.push(seed)
  });

  return Math.min(...locations);
}

const answer = await day5a();
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
      destinationRangeStart: dest,
      sourceRangeStart: src,
      rangeLength: ran - 1 // Indexes start at 0 so removing 1 from the length
    });
  });

  return mapDetails;
}