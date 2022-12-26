import math
from typing import List, Optional, Dict


def visible_trees(forest: List[List[int]]) -> set[Optional[tuple[int, int]]]:
    trees: set[Optional[tuple[int, int]]] = set()
    rows: int = len(forest)
    cols: int = len(forest[0])

    # Perimeter
    trees.update((0, i) for i in range(cols))  # Top
    trees.update((cols - 1, i) for i in range(cols))  # Bottom
    trees.update((i, 0) for i in range(rows))  # Left
    trees.update((i, rows - 1) for i in range(rows))  # Right

    # Loops through each tree and checks if position 'forest[row][col]' is greater than trees in that direction
    for row in range(1, rows - 1):
        for col in range(1, cols - 1):
            if (all(forest[row][col] > forest[row][i] for i in range(col - 1, -1, -1))
                    or all(forest[row][col] > forest[row][i] for i in range(col + 1, cols))
                    or all(forest[row][col] > forest[i][col] for i in range(row - 1, -1, -1))
                    or all(forest[row][col] > forest[i][col] for i in range(row + 1, rows))):
                trees.add((row, col))

    return trees


def part1(tree_plot: str) -> int:
    with open(tree_plot) as f:
        plot: List[List[int]] = [list(map(int, line.strip())) for line in f]
    return len(visible_trees(plot))


def part2(tree_plot: str) -> int:
    with open(tree_plot) as f:
        plot: List[List[int]] = [list(map(int, line.strip())) for line in f]
    high_score: int = 0
    rows: int = len(plot)
    cols: int = len(plot[0])

    for (row, col) in visible_trees(plot):
        counts: Dict[str, int] = {
            "up": 0,
            "down": 0,
            "left": 0,
            "right": 0,
        }

        # Skip perimeter trees
        if row == 0 or row == rows - 1 or col == 0 or col == cols - 1:
            continue

        # Up
        for i in range(row - 1, -1, -1):
            counts['up'] += 1
            if plot[row][col] <= plot[i][col]:
                break

        # Down
        for i in range(row + 1, rows):
            counts['down'] += 1
            if plot[row][col] <= plot[i][col]:
                break

        # Left
        for i in range(col - 1, -1, -1):
            counts['left'] += 1
            if plot[row][col] <= plot[row][i]:
                break

        # Right
        for i in range(col + 1, cols):
            counts['right'] += 1
            if plot[row][col] <= plot[row][i]:
                break

        high_score = max(high_score, math.prod(counts.values()))

    return high_score


if __name__ == '__main__':
    print(f"Part 1: {part1(tree_plot='input.txt')}")
    print(f"Part 2: {part2(tree_plot='input.txt')}")
