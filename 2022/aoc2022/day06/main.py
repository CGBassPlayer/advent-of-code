from typing import List, Any


def has_duplicate(list_vals: List[Any]) -> bool:
    if len(list_vals) != len(set(list_vals)):
        return True
    return False


def part1(datastream: str) -> int:
    with open(datastream) as f:
        ds: str = f.read()

    for idx in range(0, len(ds) - 4):
        chars: List[str] = [c for c in ds[idx:idx + 4:]]
        if not has_duplicate(chars):
            return idx + 4
    return -1


def part2(datastream: str) -> int:
    with open(datastream) as f:
        ds: str = f.read()

    for idx in range(0, len(ds) - 14):
        chars: List[str] = [c for c in ds[idx:idx + 14:]]
        if not has_duplicate(chars):
            return idx + 14
    return -1


if __name__ == '__main__':
    print(f"Part 1: {part1(datastream='input.txt')}")
    print(f"Part 2: {part2(datastream='input.txt')}")
