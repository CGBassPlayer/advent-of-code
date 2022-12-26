from typing import List


def part1(assignments: str) -> int:
    full_overlaps: int = 0
    with open(assignments) as f:
        for line in f.readlines():
            cleaners: List[str] = line.split(",")
            cleaner1: set[int] = set(
                [x for x in range(int(cleaners[0].split("-")[0]), int(cleaners[0].split("-")[1]) + 1)])
            cleaner2: set[int] = set(
                [x for x in range(int(cleaners[1].split("-")[0]), int(cleaners[1].split("-")[1]) + 1)])
            if cleaner2.issubset(cleaner1) or cleaner1.issubset(cleaner2):
                full_overlaps += 1

    return full_overlaps


def part2(assignments: str) -> int:
    overlaps: int = 0
    with open(assignments) as f:
        for line in f.readlines():
            cleaners: List[str] = line.split(",")
            cleaner1: List[int] = [x for x in range(int(cleaners[0].split("-")[0]), int(cleaners[0].split("-")[1]) + 1)]
            cleaner2: List[int] = [x for x in range(int(cleaners[1].split("-")[0]), int(cleaners[1].split("-")[1]) + 1)]
            if any([area in cleaner2 for area in cleaner1]) or any([area in cleaner1 for area in cleaner2]):
                overlaps += 1

    return overlaps


if __name__ == '__main__':
    print(f"Part 1: {part1(assignments='input.txt')}")
    print(f"Part 2: {part2(assignments='input.txt')}")
