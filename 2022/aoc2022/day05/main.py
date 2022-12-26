from __future__ import annotations

import string
from typing import List


def part1(docs: str) -> str:
    ship: List[List[str]] = []
    movements: List[List[int]] = []
    with open(docs) as f:
        lines = f.readlines()

    # Ship Layout in input file
    for line in lines[:lines.index("\n") - 1:]:
        layer: List[str] = []
        for item in line[1::4]:
            if item not in list(string.digits):
                layer.append(item)
        ship.append(layer)

    # Moving Instructions
    for line in lines[lines.index("\n") + 1::]:
        extracted = [int(c) for c in line if c.isdigit()]
        if len(extracted) == 4:
            extracted[0] = int(str(extracted[0]) + str(extracted[1]))
            extracted[1] = extracted[2]
            extracted[2] = extracted[3]
            del extracted[3]
        movements.append(extracted)

    # Convert horizontal layers to vertical stacks
    vert_stacks: List[List[str]] = []
    for x in range(0, len(max(ship, key=len))):
        vert_stacks.append([s[x] for s in ship])
    stacks: List[List[str]] = []
    for stack in vert_stacks:
        stacks.append([i for i in stack if i != " "])

    # Move containers on ship
    for step in movements:
        amount: int = step[0]
        source_idx = step[1] - 1
        dest_idx = step[2] - 1

        for _ in range(0, amount):
            crate_id: str = stacks[source_idx][0]

            stacks[source_idx].pop(0)
            stacks[dest_idx] = [crate_id] + stacks[dest_idx]

    return "".join([stack[0] for stack in stacks])


def part2(docs: str) -> str:
    ship: List[List[str]] = []
    movements: List[List[int]] = []
    with open(docs) as f:
        lines = f.readlines()

    # Ship Layout in input file
    for line in lines[:lines.index("\n") - 1:]:
        layer: List[str] = []
        for item in line[1::4]:
            if item not in list(string.digits):
                layer.append(item)
        ship.append(layer)

    # Moving Instructions
    for line in lines[lines.index("\n") + 1::]:
        extracted = [int(c) for c in line if c.isdigit()]
        if len(extracted) == 4:
            extracted[0] = int(str(extracted[0]) + str(extracted[1]))
            extracted[1] = extracted[2]
            extracted[2] = extracted[3]
            del extracted[3]
        movements.append(extracted)

    # Convert horizontal layers to vertical stacks
    vert_stacks: List[List[str]] = []
    for x in range(0, len(max(ship, key=len))):
        vert_stacks.append([s[x] for s in ship])
    stacks: List[List[str]] = []
    for stack in vert_stacks:
        stacks.append([i for i in stack if i != " "])

    # Move containers on ship
    for step in movements:
        amount: int = step[0]
        source_idx = step[1] - 1
        dest_idx = step[2] - 1

        crate_ids: List[str] = [i for i in stacks[source_idx][0:amount]]
        for cid in crate_ids:
            stacks[source_idx].remove(cid)
        stacks[dest_idx] = crate_ids + stacks[dest_idx]

    return "".join([stack[0] for stack in stacks])


if __name__ == '__main__':
    print(f"Part 1: {part1(docs='input.txt')}")
    print(f"Part 2: {part2(docs='input.txt')}")
