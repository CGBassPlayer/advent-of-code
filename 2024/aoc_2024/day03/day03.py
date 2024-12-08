import re
from email.policy import default

import numpy as np

from aoc_2024.common import files


def find_closest_value_np(lst, target):
    return lst[np.abs(np.array(lst) - target).argmin()]


def mul_string(input: str) -> int:
    if not "mul" in input:
        return 0
    nums = re.findall(pattern="\d+", string=input)
    return int(np.prod([int(n) for n in nums]))


def part_1() -> int:
    total = 0
    with open(files.load_input(3)) as f:
        memory = f.read().replace("\n", "")
    multiplications = re.findall(pattern=r"mul\(\d{1,3},\d{1,3}\)", string=memory)
    for m in multiplications:
        total += mul_string(m)

    return total


def part_2() -> int:
    total = 0
    with open(files.load_input(3)) as f:
        memory = f.read().replace("\n", "")
    multiplications = re.findall(pattern=r"mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)", string=memory)
    process = True
    for m in multiplications:
        match m:
            case "don't()":
                process = False
            case "do()":
                process = True
        if process:
            total += mul_string(m)

        # if "don't()" in multiplications[:multiplications.index(m)] or m == "don't()":
        #     if "do()" in multiplications[:multiplications.index(m)]:
        #         total += mul_string(m)
        #     continue
        # total += mul_string(m)


    return total


if __name__ == '__main__':
    part_1_solution = part_1()
    part_2_solution = part_2()

    print(f"Solution to part 1: {part_1_solution}")
    print(f"Solution to part 2: {part_2_solution}")
