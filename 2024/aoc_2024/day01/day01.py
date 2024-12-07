from aoc_2024.common import files

import numpy as np


def load_maps():
    left_map = []
    right_map = []
    with open(files.load_input(1), "r") as f:
        for line in f:
            line = line.split()
            if line:
                line = [int(i) for i in line]
                left_map.append(line[0])
                right_map.append(line[1])

    return left_map, right_map

def part_1() -> int:
    left_map, right_map = load_maps()
    left_map = np.sort(np.array(left_map))
    right_map = np.sort(np.array(right_map))
    np.subtract(left_map, right_map, out=left_map)
    return np.sum(np.abs(left_map))

def part_2() -> int:
    total = 0
    left_map, right_map = load_maps()
    left_map = np.array(left_map)
    right_map = np.array(right_map)
    rm_location, rm_count = np.unique(right_map, return_counts=True)
    right_map_stats = dict(zip(rm_location, rm_count))
    for location in left_map:
        if location in right_map_stats.keys():
            total += (location * right_map_stats[location])
    return total


if __name__ == '__main__':
    part_1_solution = part_1()
    part_2_solution = part_2()

    print(f"Solution to part 1: {part_1_solution}")
    print(f"Solution to part 2: {part_2_solution}")
