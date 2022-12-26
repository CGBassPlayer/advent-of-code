from dataclasses import dataclass, field
from typing import List, Dict

TOTAL_SPACE: int = 70_000_000
UPDATE_SIZE: int = 30_000_000


# Stolen from https://github.com/weichslgartner/AdventOfCode2022/blob/main/Python/day_07.py#L11-L17
@dataclass
class Node:
    name: str
    _size: int = 0
    is_dir: bool = True
    parent: 'Node' = None
    children: Dict[str, 'Node'] = field(default_factory=dict)

    def get_size(self) -> int:
        if not self.is_dir or self._size > 0:
            return self._size
        for child in self.children.values():
            self._size += child.get_size()
        return self._size


# Stolen from https://github.com/weichslgartner/AdventOfCode2022/blob/main/Python/day_07.py#L55-L59
def get_all_folder_sizes(node: Node, sizes: List[int]) -> (int, List[int]):
    if not node.is_dir:
        return node.get_size(), sizes
    sizes.append(sum(get_all_folder_sizes(child, sizes)[0] for child in node.children.values()))
    return sizes[-1], sizes


def part1(history: str) -> int:
    with open(history) as f:
        lines = f.readlines()

    root: Node = Node("/")
    current_node: Node = root
    for line in lines:
        tokens = line.split()
        if line.startswith("$"):
            if tokens[1] == "cd":
                if tokens[2] == "/":
                    current_node = root
                elif tokens[2] == "..":
                    if current_node.parent is None:
                        current_node = root
                    else:
                        current_node = current_node.parent
                elif tokens[2] not in current_node.children.keys():
                    current_node.children[tokens[2]] = Node(tokens[2])
                    current_node = current_node.children[tokens[2]]
                else:
                    current_node = current_node.children[tokens[2]]
            elif tokens[1] == "ls":
                pass
        else:
            if tokens[0] == "dir" and tokens[0] not in current_node.children.keys():
                current_node.children[tokens[1]] = Node(name=tokens[1], parent=current_node)
            elif tokens[0].isdigit():
                current_node.children[tokens[1]] = Node(name=tokens[1],
                                                        _size=int(tokens[0]),
                                                        is_dir=False,
                                                        parent=current_node)

    _, sizes = get_all_folder_sizes(root, [])
    return sum(s for s in sizes if s <= 100_000)


def part2(history: str) -> int:
    with open(history) as f:
        lines = f.readlines()

    root: Node = Node("/")
    current_node: Node = root
    for line in lines:
        tokens = line.split()
        if line.startswith("$"):
            if tokens[1] == "cd":
                if tokens[2] == "/":
                    current_node = root
                elif tokens[2] == "..":
                    if current_node.parent is None:
                        current_node = root
                    else:
                        current_node = current_node.parent
                elif tokens[2] not in current_node.children.keys():
                    current_node.children[tokens[2]] = Node(tokens[2])
                    current_node = current_node.children[tokens[2]]
                else:
                    current_node = current_node.children[tokens[2]]
            elif tokens[1] == "ls":
                pass
        else:
            if tokens[0] == "dir" and tokens[0] not in current_node.children.keys():
                current_node.children[tokens[1]] = Node(name=tokens[1], parent=current_node)
            elif tokens[0].isdigit():
                current_node.children[tokens[1]] = Node(name=tokens[1],
                                                        _size=int(tokens[0]),
                                                        is_dir=False,
                                                        parent=current_node)

    node_size, sizes = get_all_folder_sizes(root, [])

    space_needed: int = UPDATE_SIZE - (TOTAL_SPACE - root.get_size())
    return min(f for f in sizes if f > space_needed)


if __name__ == '__main__':
    print(f"Part 1: {part1(history='input.txt')}")
    print(f"Part 2: {part2(history='input.txt')}")
