from typing import List


def move(instruction: str) -> tuple[int, int]:
    movement: tuple[int, int] = (0, 0)
    tokens: tuple[str, str] = (instruction.split()[0], instruction.split()[1])

    if tokens[0] == 'U':
        movement = (0, int(tokens[1]) * -1)
    elif tokens[0] == "D":
        movement = (0, int(tokens[1]))
    elif tokens[0] == "L":
        movement = (int(tokens[1]) * -1, 0)
    elif tokens[0] == "R":
        movement = (int(tokens[1]), 0)

    return movement


def part1(moves: str) -> int:
    with open(moves) as f:
        lines: List[str] = f.readlines()

    head_x: int = 0
    head_y: int = 0
    tail_x: int = 0
    tail_y: int = 0

    visited_tail_positions: List[tuple[int, int]] = [(0, 0)]

    for line in lines:
        x, y = move(line)
        # print(x, y)
        for i in range(0, x):
            head_x += 1
        for i in range(x, 0):
            head_x -= 1
        for i in range(0, y):
            head_y += 1
        for i in range(y, 0):
            head_y -= 1
        print(head_x, head_y)

    return -1


if __name__ == '__main__':
    print(f"Part 1: {part1(moves='input.txt')}")
