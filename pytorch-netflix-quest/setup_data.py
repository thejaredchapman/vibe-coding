"""
SETUP: Run this first to download the MovieLens dataset.
Usage: python setup_data.py
"""

import os
import urllib.request
import zipfile
import pandas as pd

DATA_DIR = "data"

def download_movielens():
    """Download MovieLens 100K dataset (small, fast, perfect for learning)."""
    url = "https://files.grouplens.org/datasets/movielens/ml-100k.zip"
    zip_path = os.path.join(DATA_DIR, "ml-100k.zip")

    os.makedirs(DATA_DIR, exist_ok=True)

    if os.path.exists(os.path.join(DATA_DIR, "ml-100k")):
        print("Dataset already downloaded!")
    else:
        print("Downloading MovieLens 100K dataset...")
        urllib.request.urlretrieve(url, zip_path)
        print("Extracting...")
        with zipfile.ZipFile(zip_path, "r") as z:
            z.extractall(DATA_DIR)
        os.remove(zip_path)
        print("Done!")

    # Quick preview
    ratings = pd.read_csv(
        os.path.join(DATA_DIR, "ml-100k", "u.data"),
        sep="\t",
        names=["user_id", "item_id", "rating", "timestamp"],
    )
    movies = pd.read_csv(
        os.path.join(DATA_DIR, "ml-100k", "u.item"),
        sep="|",
        encoding="latin-1",
        header=None,
        usecols=[0, 1],
        names=["item_id", "title"],
    )

    print(f"\n--- Dataset Summary ---")
    print(f"Total ratings:  {len(ratings):,}")
    print(f"Unique users:   {ratings['user_id'].nunique()}")
    print(f"Unique movies:  {ratings['item_id'].nunique()}")
    print(f"Rating range:   {ratings['rating'].min()} - {ratings['rating'].max()}")
    print(f"Avg rating:     {ratings['rating'].mean():.2f}")
    print(f"\nSample movies:")
    print(movies.head(10).to_string(index=False))
    print("\nYou're ready to start Level 1!")


if __name__ == "__main__":
    download_movielens()
