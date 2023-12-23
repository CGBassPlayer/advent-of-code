import { readData } from '../../common/shared.ts';
import chalk from 'chalk';

interface Position {
  tile: Tile,
  x: number,
  y: number
}

enum Tile {
  NS = "|",
  EW = "-",
  NE = "L",
  NW = "J",
  SW = "7",
  SE = "F",
  GND = ".",
  START = "S"
}

export async function day10a(dataPath?: string) {
  const data = await readData(dataPath);
  const tiles: Tile[][] = parseTiles(data);
  console.table(tiles);
  console.log(findStartLocation(tiles));
  return 0;
}

const answer = await day10a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

function parseTiles(data: string[]): Tile[][] {
  const tiles: Tile[][] = []
  for (const line of data) {
    tiles.push([]);
    for (const char of line) {
      tiles[data.indexOf(line)].push(<Tile> char)
    }
  }
  return tiles;
}

function findStartLocation(tiles: Tile[][]): Position {
  for (const row of tiles) {
    if (row.indexOf(Tile.START) !== -1) {
      return {
        tile: Tile.START,
        x: tiles.indexOf(row),
        y: row.indexOf(Tile.START)
      }
    }
  }
  return {
    tile: Tile.START,
    x: -1,
    y: -1
  }
}

function pipeAttachemnts(map: Tile[][], tile: Position): Position[] {
  const attachedPipes: Position[] = [];
  switch (tile.x) {
    case 0:
      break;
    case map.length - 1:
      break;
  }
  return attachedPipes;
}