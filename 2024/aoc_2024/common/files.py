import sys


def load_input(day: int):
    if len(sys.argv) > 1 and sys.argv[1] == "sample":
        return f"day{day:02}.sample-data.txt"
    return f"day{day:02}.data.txt"
