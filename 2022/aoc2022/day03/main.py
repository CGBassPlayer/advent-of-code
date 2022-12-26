import string
from typing import List

SORT_ORDER: List = list(string.ascii_lowercase) + list(string.ascii_uppercase)


def part1(inventory: str) -> int:
    priority_total: int = 0
    with open(inventory) as f:
        for line in f.readlines():
            c1: str = line[0:len(line) // 2:]
            c2: str = line[len(line) // 2::]
            for char in c1:
                if char in c2:
                    priority_total += SORT_ORDER.index(char) + 1
                    break
    return priority_total


def part2(inventory: str) -> int:
    priority_total: int = 0
    with open(inventory) as f:
        lines: List[str] = f.readlines()
    for line in lines[::3]:
        group: List[str] = [line, lines[lines.index(line) + 1], lines[lines.index(line) + 2]]
        for char in group[0]:
            if char in group[1] and char in group[2]:
                priority_total += SORT_ORDER.index(char) + 1
                break
    return priority_total


if __name__ == '__main__':
    print(f"Part 1: {part1(inventory='input.txt')}")
    print(f"Part 2: {part2(inventory='input.txt')}")
