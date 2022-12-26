from typing import List

ROCK_POINTS = 1
PAPER_POINTS = 2
SCISSORS_POINTS = 3

WIN_POINTS = 6
DRAW_POINTS = 3
LOSE_POINTS = 0


def part1(guide: str) -> int:
    total_points = 0
    with open(guide) as f:
        for line in f.readlines():
            moves: List[str] = line.strip("\n").split(" ")
            if moves[0] == "A":
                if moves[1] == "X":  # Rock v Rock
                    total_points += ROCK_POINTS + DRAW_POINTS
                elif moves[1] == "Y":  # Rock v Paper
                    total_points += PAPER_POINTS + WIN_POINTS
                elif moves[1] == "Z":  # Rock v Scissors
                    total_points += SCISSORS_POINTS + LOSE_POINTS
            elif moves[0] == "B":
                if moves[1] == "X":  # Paper v Rock
                    total_points += ROCK_POINTS + LOSE_POINTS
                elif moves[1] == "Y":  # Paper v Paper
                    total_points += PAPER_POINTS + DRAW_POINTS
                elif moves[1] == "Z":  # Paper v Scissors
                    total_points += SCISSORS_POINTS + WIN_POINTS
            elif moves[0] == "C":
                if moves[1] == "X":  # Scissors v Rock
                    total_points += ROCK_POINTS + WIN_POINTS
                elif moves[1] == "Y":  # Scissors v Paper
                    total_points += PAPER_POINTS + LOSE_POINTS
                elif moves[1] == "Z":  # Scissors v Scissors
                    total_points += SCISSORS_POINTS + DRAW_POINTS

    return total_points


def part2(guide: str) -> int:
    total_points = 0
    with open(guide) as f:
        for line in f.readlines():
            moves: List[str] = line.strip("\n").split(" ")
            if moves[0] == "A":  # Rock
                if moves[1] == "X":  # Lose
                    total_points += SCISSORS_POINTS + LOSE_POINTS
                elif moves[1] == "Y":  # Draw
                    total_points += ROCK_POINTS + DRAW_POINTS
                elif moves[1] == "Z":  # Win
                    total_points += PAPER_POINTS + WIN_POINTS
            elif moves[0] == "B":  # Paper
                if moves[1] == "X":  # Lose
                    total_points += ROCK_POINTS + LOSE_POINTS
                elif moves[1] == "Y":  # Draw
                    total_points += PAPER_POINTS + DRAW_POINTS
                elif moves[1] == "Z":  # Win
                    total_points += SCISSORS_POINTS + WIN_POINTS
            elif moves[0] == "C":  # Scissors
                if moves[1] == "X":  # Lose
                    total_points += PAPER_POINTS + LOSE_POINTS
                elif moves[1] == "Y":  # Draw
                    total_points += SCISSORS_POINTS + DRAW_POINTS
                elif moves[1] == "Z":  # Win
                    total_points += ROCK_POINTS + WIN_POINTS

    return total_points


if __name__ == '__main__':
    print(f"Part 1: {part1(guide='input.txt')}")
    print(f"Part 2: {part2(guide='input.txt')}")
