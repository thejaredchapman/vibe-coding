"""
XP TRACKER: Run this to check your overall quest progress!
Usage: python xp_tracker.py
"""

import subprocess
import sys

LEVELS = [
    ("level_01_tensors.py", "The Tensor Apprentice", 100),
    ("level_02_autograd.py", "The Gradient Whisperer", 150),
    ("level_03_neural_net.py", "The Network Architect", 200),
    ("level_04_data_loading.py", "The Data Wrangler", 250),
    ("level_05_embeddings.py", "The Embedding Sage", 300),
    ("level_06_recommender.py", "The Recommender", 500),
    ("level_07_advanced.py", "The Grand Master", 1000),
]

RANKS = [
    (0, "Unranked"),
    (100, "Tensor Apprentice"),
    (250, "Gradient Whisperer"),
    (450, "Network Architect"),
    (700, "Data Wrangler"),
    (1000, "Embedding Sage"),
    (1500, "Recommender"),
    (2500, "Netflix AI Grand Master"),
]


def get_rank(xp):
    rank = "Unranked"
    for threshold, name in RANKS:
        if xp >= threshold:
            rank = name
    return rank


def main():
    print("=" * 60)
    print("  PYTORCH NETFLIX QUEST - PROGRESS TRACKER")
    print("=" * 60)
    print()

    total_xp = 0
    completed = 0

    for filename, title, xp in LEVELS:
        try:
            result = subprocess.run(
                [sys.executable, filename],
                capture_output=True, text=True, timeout=60
            )
            output = result.stdout
            if "COMPLETE" in output:
                status = "COMPLETE"
                total_xp += xp
                completed += 1
            elif "FAIL" in output:
                status = "IN PROGRESS"
            else:
                status = "NOT STARTED"
        except Exception:
            status = "NOT STARTED"

        icon = {
            "COMPLETE": "[x]",
            "IN PROGRESS": "[~]",
            "NOT STARTED": "[ ]",
        }[status]

        print(f"  {icon} Level {LEVELS.index((filename, title, xp))+1}: {title} ({xp} XP) - {status}")

    print()
    print(f"  Total XP: {total_xp} / 2500")
    print(f"  Levels Complete: {completed} / {len(LEVELS)}")
    print(f"  Current Rank: {get_rank(total_xp)}")
    print()

    bar_width = 40
    filled = int(bar_width * total_xp / 2500)
    bar = "#" * filled + "-" * (bar_width - filled)
    print(f"  [{bar}] {total_xp/2500*100:.0f}%")
    print()


if __name__ == "__main__":
    main()
