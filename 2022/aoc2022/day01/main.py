from typing import List


def part1(elves: str) -> int:
    highest: int = 0
    with open(elves, "r") as f:
        calories = 0
        for line in f.readlines():
            if line == "\n":
                if calories > highest:
                    highest = calories
                calories = 0
            else:
                calories += int(line)
    return highest


def part2(elves: str) -> int:
    with open(elves, "r") as f:
        calorie_counts: List[int] = []
        calories = 0
        for line in f.readlines():
            if line == "\n":
                calorie_counts.append(calories)
                calories = 0
            else:
                calories += int(line)
    calorie_counts.sort(reverse=True)
    return sum(calorie_counts[:3:])


if __name__ == '__main__':
    print(f"Part 1: {part1(elves='input.txt')}")
    print(f"Part 2: {part2(elves='input.txt')}")
