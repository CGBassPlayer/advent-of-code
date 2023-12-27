import { readData } from '../../common/shared.ts';
import chalk from 'chalk';

interface Connection {
  x: number
  y: number
}

interface Tile {
  symbol: string,
  connections: Connection[]
}

const TILES = {
  NS: {
    symbol: "|",
    connections: [
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ]
  },
  EW: {
    symbol: "-",
    connections: [
      { x: 1, y: 0 },
      { x: -1, y: 0 }
    ]
  },
  NE: {
    symbol: "L",
    connections: [
      { x: 1, y: 0 },
      { x: 0, y: 1 }
    ]
  },
  NW: {
    symbol: "J",
    connections: [
      { x: 1, y: 0 },
      { x: 0, y: -1 }
    ]
  },
  SE: {
    symbol: "F",
    connections: [
      { x: -1, y: 0 },
      { x: 0, y: 1 }
    ]
  },
  SW: {
    symbol: "7",
    connections: [
      { x: -1, y: 0 },
      { x: 0, y: -1 }
    ]
  },
  GND: {
    symbol: ".",
    connections: [
      { x: 0, y: 0 },
    ]
  },
  START: {
    symbol: "S",
    connections: [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ]
  }
}

interface Position {
  tile: Tile,
  x: number,
  y: number
}

export async function day10a(dataPath?: string) {
  const data = await readData(dataPath);
  const tiles: Tile[][] = parseTiles(data);
  const startTile = findStartLocation(tiles);
  console.log(startTile);
  return 0;
}

const answer = await day10a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

function parseTiles(data: string[]): Tile[][] {
  const tiles: Tile[][] = []
  for (const line of data) {
    tiles.push([]);
    for (const char of line) {
      switch (char) {
        case TILES.NS.symbol:
          tiles[data.indexOf(line)].push(TILES.NS);
          break;
        case TILES.EW.symbol:
          tiles[data.indexOf(line)].push(TILES.EW);
          break;
        case TILES.NE.symbol:
          tiles[data.indexOf(line)].push(TILES.NE);
          break;
        case TILES.NW.symbol:
          tiles[data.indexOf(line)].push(TILES.NW);
          break;
        case TILES.SE.symbol:
          tiles[data.indexOf(line)].push(TILES.SE);
          break;
        case TILES.SW.symbol:
          tiles[data.indexOf(line)].push(TILES.SW);
          break;
        case TILES.GND.symbol:
          tiles[data.indexOf(line)].push(TILES.GND);
          break;
        case TILES.START.symbol:
          tiles[data.indexOf(line)].push(TILES.START);
          break;
        default:
          console.log(chalk.redBright("Unknown Tile Type provided. Failed to parse data"));
          process.exit(1);
      }

    }
  }
  return tiles;
}

function findStartLocation(map: Tile[][]): Position {
  for (const row of map) {
    if (row.indexOf(TILES.START) !== -1) {
      return {
        tile: TILES.START,
        x: map.indexOf(row),
        y: row.indexOf(TILES.START)
      }
    }
  }
  console.log(chalk.red("Start Position not found!"))
  return {
    tile: TILES.START,
    x: -1,
    y: -1
  }
}

function findattachesPipes(map: Tile[][], tile: Position): Position[] {
  const attachedPipes: Position[] = [];

  for (const ct of tile.tile.connections) {
    if (tile.x + ct.x < 0 || tile.x + ct.x >= map.length) {
      continue;
    }
    if (tile.y + ct.y < 0 || tile.y + ct.y >= map[0].length) {
      continue;
    }
    if (map[tile.x + ct.x][tile.y + ct.y] == TILES.GND) {
      continue;
    }

    const nextTile: Position = {
      tile: map[tile.x + ct.x][tile.y + ct.y],
      x: tile.x + ct.x,
      y: tile.y + ct.y
    }

    if (tile.tile.connections.includes({ x: nextTile.x, y: nextTile.y })) {
      attachedPipes.push(nextTile);
    }
  }

  return attachedPipes;
}