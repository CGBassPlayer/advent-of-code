from __future__ import annotations

import string
from typing import List


def part1(docs: str) -> str:
    """
    The expedition can depart as soon as the final supplies have been unloaded from the ships. Supplies are stored in stacks of marked crates, but because the needed supplies are buried under many other crates, the crates need to be rearranged.

    The ship has a giant cargo crane capable of moving crates between stacks. To ensure none of the crates get crushed or fall over, the crane operator will rearrange them in a series of carefully-planned steps. After the crates are rearranged, the desired crates will be at the top of each stack.

    The Elves don't want to interrupt the crane operator during this delicate procedure, but they forgot to ask her which crate will end up where, and they want to be ready to unload them as soon as possible so they can embark.

    They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input). For example:

        [D]
    [N] [C]
    [Z] [M] [P]
     1   2   3

    move 1 from 2 to 1
    move 3 from 1 to 3
    move 2 from 2 to 1
    move 1 from 1 to 2
    In this example, there are three stacks of crates. Stack 1 contains two crates: crate Z is on the bottom, and crate N is on top. Stack 2 contains three crates; from bottom to top, they are crates M, C, and D. Finally, stack 3 contains a single crate, P.

    Then, the rearrangement procedure is given. In each step of the procedure, a quantity of crates is moved from one stack to a different stack. In the first step of the above rearrangement procedure, one crate is moved from stack 2 to stack 1, resulting in this configuration:

    [D]
    [N] [C]
    [Z] [M] [P]
     1   2   3
    In the second step, three crates are moved from stack 1 to stack 3. Crates are moved one at a time, so the first crate to be moved (D) ends up below the second and third crates:

            [Z]
            [N]
        [C] [D]
        [M] [P]
     1   2   3
    Then, both crates are moved from stack 2 to stack 1. Again, because crates are moved one at a time, crate C ends up below crate M:

            [Z]
            [N]
    [M]     [D]
    [C]     [P]
     1   2   3
    Finally, one crate is moved from stack 1 to stack 2:

            [Z]
            [N]
            [D]
    [C] [M] [P]
     1   2   3
    The Elves just need to know which crate will end up on top of each stack; in this example, the top crates are C in stack 1, M in stack 2, and Z in stack 3, so you should combine these together and give the Elves the message CMZ.

    After the rearrangement procedure completes, what crate ends up on top of each stack?
    """
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
