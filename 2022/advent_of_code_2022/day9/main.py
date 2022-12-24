from typing import List, Dict

Coordinate = tuple[int, int]
Instruction = tuple[str, int]


def find_neighbors(pos: Coordinate) -> list[Coordinate]:
    x0, y0 = pos
    # candidates = [
    return [
        (x0, y0),
        (x0 - 1, y0),
        (x0 + 1, y0),
        (x0, y0 - 1),
        (x0, y0 + 1),
        (x0 - 1, y0 - 1),
        (x0 + 1, y0 + 1),
        (x0 - 1, y0 + 1),
        (x0 + 1, y0 - 1),
    ]


def move(current_position: Coordinate, direction: Instruction) -> List[Coordinate]:
    positions: List[Coordinate] = []
    x, y = current_position
    d, amount = direction
    for i in range(amount):
        if d == "U":
            y += 1
        elif d == "D":
            y -= 1
        elif d == "L":
            x -= 1
        elif d == "R":
            x += 1
        positions.append((x, y))
    return positions


def part1(input: str) -> int:
    with open(input) as f:
        lines: List[str] = f.readlines()

    grid: Dict[Coordinate, int] = {}
    head_position: Coordinate = (0, 0)
    tail_position: Coordinate = (0, 0)

    grid.setdefault(tail_position, 1)
    for line in lines:
        instruction: Instruction = (line.split()[0], int(line.split()[1]))
        grid.setdefault(head_position, 0)
        move_list: List[Coordinate] = move(head_position, instruction)
        for m in move_list:
            grid.setdefault(m, 0)
            previous_move: Coordinate = head_position
            head_position = m
            if tail_position not in find_neighbors(head_position):
                tail_position = previous_move
                grid[tail_position] = 1
    return sum(v for v in grid.values() if v == 1)


if __name__ == '__main__':
    print(f"Part 1: {part1(input='input.txt')}")
