from typing import List
import numpy as np
from numpy import ndarray
import matplotlib.pyplot as plt

Display = ndarray


def parse_multi_string(filename: str = None, use_test_file: bool = False, sep: str = " ") -> List[List[str]]:
    if use_test_file or filename is None:
        filename = "example.txt"
    with open(filename, "r") as f:
        data = f.readlines()
    if sep == "":
        arr = [list(a.replace("\n", "")) for a in data]
    else:
        arr = [a.replace("\n", "").split(sep) for a in data]
    return arr


def count_cycle(cycle: int, result: int, x: int) -> tuple[int, int]:
    if cycle == 20 or (cycle - 20) % 40 == 0:
        result += x * cycle
    return cycle + 1, result


def part1(input_file: str) -> int:
    data: List[List[str]] = parse_multi_string(input_file)
    cycle: int = 1
    result: int = 0
    x: int = 1

    for command in data:
        if command[0] == "noop":
            cycle, result = count_cycle(cycle, result, x)
        else:
            cycle, result = count_cycle(cycle, result, x)
            cycle, result = count_cycle(cycle, result, x)
            x += int(command[1])
    return result


def part2(input_file: str) -> None:
    data: List[List[str]] = parse_multi_string(input_file)
    display: Display = np.zeros((6, 40))
    cursor_position: int = 0
    x: int = 1

    def draw_pixel(cursor_ind: int, x: int, display: Display) -> int:
        cursor_row = cursor_ind // 40
        cursor_col = cursor_ind % 40
        if abs(cursor_col - x) <= 1:
            display[cursor_row, cursor_col] = 1
        return cursor_ind + 1

    for idx, command in enumerate(data):
        if command[0] == "noop":
            cursor_position = draw_pixel(cursor_position, x, display)
        else:
            cursor_position = draw_pixel(cursor_position, x, display)
            cursor_position = draw_pixel(cursor_position, x, display)
            x += int(command[1])

    display = np.array(display)
    plt.imshow(display, origin="upper")
    plt.show()


if __name__ == '__main__':
    print(f"Part 1: {part1(input_file='input.txt')}")
    part2(input_file='input.txt')
