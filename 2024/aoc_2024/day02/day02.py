from itertools import combinations

import numpy as np
import itertools

from aoc_2024.common import files

SAFE_MIN = 1
SAFE_MAX = 3


def is_ascending(arr: list[int]) -> bool:
    return np.all(np.diff(arr) >= 0)


def is_descending(arr):
    return np.all(np.diff(arr) <= 0)


def within_range(num1: int, num2: int, min=SAFE_MIN, max=SAFE_MAX) -> bool:
    return min <= abs(num1 - num2) <= max


def is_safe(arr: list[int]) -> bool:
    if is_ascending(arr) or is_descending(arr):
        for i in range(len(arr) - 1):
            if not within_range(arr[i], arr[i + 1]):
                return False
        return True
    return False


def part_1() -> int:
    total = 0
    with open(files.load_input(2)) as f:
        reports = f.readlines()

    for r in reports:
        levels = [int(l) for l in r.strip("\n").split(" ")]
        if is_safe(levels):
            total += 1

    return total


def part_2() -> int:
    total = 0
    with open(files.load_input(2)) as f:
        reports = f.readlines()

    for r in reports:
        levels = [int(l) for l in r.strip("\n").split(" ")]
        if is_safe(levels):
            total += 1
        else:
            combos = list(itertools.combinations(levels, len(levels) - 1))
            for possible_safe in combos:
                if is_safe(list(possible_safe)):
                    total += 1
                    break

    return total


if __name__ == '__main__':
    part_1_solution = part_1()
    part_2_solution = part_2()

    print(f"Solution to part 1: {part_1_solution}")
    print(f"Solution to part 2: {part_2_solution}")
