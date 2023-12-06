import { productOfArray, sumOfArray } from '../../common/math.ts';
import { between, readData } from '../../common/shared.ts';
import chalk from 'chalk';

interface Coordinate {
  x: number,
  y: number
}

interface Symbol {
  symbol: string,
  coords: Coordinate
}

interface PartNumber {
  partNumber: number,
  coords: Coordinate[]
}

interface Gear {
  symbol: Symbol,
  partNumbers: PartNumber[]
}

export async function day3b(dataPath?: string) {
  const gearRatios: number[] = [];
  const data = await readData(dataPath);
  let dataMap: string[][] = [];
  data.forEach((line) => {
    const chars = [...line];
    if (chars[chars.length - 1] === '\r') {
      chars.pop();
    }
    dataMap.push(chars);
  });

  const symbols: Symbol[] = [];
  const partNumbers: PartNumber[] = [];
  const gears: Gear[] = [];
  dataMap.forEach((row, rowIdx) => {
    row.forEach((item, colIdx) => {
      if (isNaN(+item) && item !== '.') {
        symbols.push({
          symbol: item,
          coords: { x: rowIdx, y: colIdx }
        });
      } else if (!isNaN(+item)) {
        // Check if item is first digit of the number
        if (colIdx - 1 >= 0 && !isNaN(+row[colIdx - 1])) {
          return;
        }
        let partNumberCoords: Coordinate[] = [{ x: rowIdx, y: colIdx }];
        let partNumberBuild: string = item
        let step: number = 1;
        while (!isNaN(+row[colIdx + step])) {
          partNumberBuild = `${partNumberBuild}${row[colIdx + step]}`
          partNumberCoords.push({ x: rowIdx, y: colIdx + step })
          step++;
        }
        partNumbers.push({
          partNumber: +partNumberBuild,
          coords: partNumberCoords
        })
      }
    })
  });

  symbols.forEach((symbol) => {
    if (symbol.symbol !== "*") {
      return;
    }
    const gearPartNumbers: PartNumber[] = [];
    for (const partNumber of partNumbers) {
      if (!between(partNumber.coords[0].x, symbol.coords.x - 1, symbol.coords.x + 1)) {
        continue;
      }
      let isCloseY = false;
      for (const partNumberCoord of partNumber.coords) {
        if (between(partNumberCoord.y, symbol.coords.y - 1, symbol.coords.y + 1)) {
          isCloseY = true;
        }
      }
      if (!isCloseY) {
        continue;
      }
      gearPartNumbers.push(partNumber);
    }
    gears.push({
      symbol: symbol,
      partNumbers: gearPartNumbers
    });
  });

  gears.forEach((gear) => {
    if (gear.partNumbers.length !== 2) {
      return;
    }
    gearRatios.push(gear.partNumbers[0].partNumber * gear.partNumbers[1].partNumber);
  });

  return sumOfArray(gearRatios);
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
