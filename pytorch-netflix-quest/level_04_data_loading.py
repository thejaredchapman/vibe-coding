"""
==============================================================
  LEVEL 4: THE DATA WRANGLER (250 XP)
==============================================================

WHAT YOU'LL LEARN:
  How to load REAL movie ratings data and prepare it for
  your neural network. This is where it gets real.

  KEY CONCEPTS:
  - torch.utils.data.Dataset: defines HOW to access your data
  - torch.utils.data.DataLoader: handles batching & shuffling
  - Train/test splits: evaluate on unseen data
  - Label encoding: convert user/movie IDs to indices

  PRE-REQUISITE: Run `python setup_data.py` first!

==============================================================
"""

import os
import torch
from torch.utils.data import Dataset, DataLoader
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

print("=" * 60)
print("  LEVEL 4: THE DATA WRANGLER")
print("=" * 60)
print()

# ----------------------------------------------------------
# LESSON 4.1: Loading the MovieLens Data
# ----------------------------------------------------------
# MovieLens 100K has 100,000 ratings from 943 users on 1,682 movies.
# Each row: (user_id, movie_id, rating, timestamp)
# ----------------------------------------------------------

print("--- Lesson 4.1: Loading Data ---")

data_path = os.path.join("data", "ml-100k", "u.data")
if not os.path.exists(data_path):
    print("ERROR: Run `python setup_data.py` first!")
    exit(1)

# Load ratings
ratings_df = pd.read_csv(
    data_path, sep="\t", names=["user_id", "item_id", "rating", "timestamp"]
)

# Load movie titles for display
movies_df = pd.read_csv(
    os.path.join("data", "ml-100k", "u.item"),
    sep="|", encoding="latin-1", header=None,
    usecols=[0, 1], names=["item_id", "title"],
)

print(f"Loaded {len(ratings_df):,} ratings")
print(f"Users: {ratings_df['user_id'].nunique()}")
print(f"Movies: {ratings_df['item_id'].nunique()}")
print(f"\nSample ratings:")
sample = ratings_df.head(5).merge(movies_df, on="item_id")
print(sample[["user_id", "title", "rating"]].to_string(index=False))
print()

# ----------------------------------------------------------
# LESSON 4.2: Label Encoding
# ----------------------------------------------------------
# User IDs go from 1-943, Movie IDs from 1-1682.
# Neural networks need 0-indexed contiguous IDs.
# We'll map: original_id -> 0, 1, 2, 3, ...
# ----------------------------------------------------------

print("--- Lesson 4.2: Label Encoding ---")

# Create mappings from original IDs to 0-indexed
user_ids = ratings_df["user_id"].unique()
item_ids = ratings_df["item_id"].unique()

user_to_idx = {uid: idx for idx, uid in enumerate(sorted(user_ids))}
item_to_idx = {iid: idx for idx, iid in enumerate(sorted(item_ids))}

# Apply encoding
ratings_df["user_idx"] = ratings_df["user_id"].map(user_to_idx)
ratings_df["item_idx"] = ratings_df["item_id"].map(item_to_idx)

n_users = len(user_to_idx)
n_items = len(item_to_idx)

print(f"User indices: 0 to {n_users - 1}")
print(f"Item indices: 0 to {n_items - 1}")
print(f"Sample encoded:")
print(ratings_df[["user_id", "user_idx", "item_id", "item_idx", "rating"]].head(3).to_string(index=False))
print()

# ============================================================
# CHALLENGE 4.1: Answer these questions about the data
# (fill in the correct values)
# ============================================================

# YOUR CODE HERE:
total_ratings = None    # How many total ratings?
num_users = None        # How many unique users?
num_movies = None       # How many unique movies?
sparsity = None         # What % of the user-movie matrix is filled?
                        # Formula: total_ratings / (num_users * num_movies) * 100

# HINT:
# total_ratings = len(ratings_df)
# num_users = n_users
# num_movies = n_items
# sparsity = total_ratings / (num_users * num_movies) * 100


# ----------------------------------------------------------
# LESSON 4.3: Custom Dataset
# ----------------------------------------------------------
# PyTorch's Dataset class defines:
#   __len__: how many samples
#   __getitem__: get one sample by index
#
# This is the standard interface for feeding data to models.
# ----------------------------------------------------------

print("--- Lesson 4.3: Custom Dataset ---")


class MovieLensDataset(Dataset):
    """Custom Dataset for MovieLens ratings."""

    def __init__(self, users, items, ratings):
        self.users = torch.LongTensor(users)
        self.items = torch.LongTensor(items)
        self.ratings = torch.FloatTensor(ratings)

    def __len__(self):
        return len(self.ratings)

    def __getitem__(self, idx):
        return self.users[idx], self.items[idx], self.ratings[idx]


# Example
example_dataset = MovieLensDataset(
    users=[0, 1, 2],
    items=[10, 20, 30],
    ratings=[4.0, 5.0, 3.0],
)

print(f"Dataset length: {len(example_dataset)}")
user, item, rating = example_dataset[0]
print(f"Sample 0: user={user}, item={item}, rating={rating}")
print()

# ============================================================
# CHALLENGE 4.2: Create the REAL dataset
#
# Steps:
#   1. Split ratings_df into train (80%) and test (20%)
#   2. Create a MovieLensDataset for training data
#   3. Create a MovieLensDataset for test data
# ============================================================

# YOUR CODE HERE:

# Step 1: Split the data
train_df = None
test_df = None

# Step 2: Create training dataset
train_dataset = None

# Step 3: Create test dataset
test_dataset = None

# HINT:
# train_df, test_df = train_test_split(ratings_df, test_size=0.2, random_state=42)
#
# train_dataset = MovieLensDataset(
#     users=train_df["user_idx"].values,
#     items=train_df["item_idx"].values,
#     ratings=train_df["rating"].values,
# )
# test_dataset = MovieLensDataset(
#     users=test_df["user_idx"].values,
#     items=test_df["item_idx"].values,
#     ratings=test_df["rating"].values,
# )


# ----------------------------------------------------------
# LESSON 4.4: DataLoader — Batching and Shuffling
# ----------------------------------------------------------
# DataLoader wraps a Dataset and provides:
#   - Batching: group samples (e.g., 64 at a time)
#   - Shuffling: randomize order each epoch
#   - Parallel loading: load data in background
#
# WHY batch? Training on one sample at a time is noisy.
# Training on ALL samples at once is slow. Batches = sweet spot.
# ----------------------------------------------------------

print("--- Lesson 4.4: DataLoader ---")

# Example with our mini dataset
example_loader = DataLoader(example_dataset, batch_size=2, shuffle=True)

for batch_idx, (users, items, ratings) in enumerate(example_loader):
    print(f"Batch {batch_idx}: users={users}, items={items}, ratings={ratings}")
print()

# ============================================================
# CHALLENGE 4.3: Create DataLoaders
#
# Create a training DataLoader and test DataLoader:
#   - Training: batch_size=64, shuffle=True
#   - Test: batch_size=64, shuffle=False (order doesn't matter for eval)
# ============================================================

# YOUR CODE HERE:
train_loader = None
test_loader = None

# HINT:
# train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
# test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False)


# ==============================================================
# BOSS CHECK
# ==============================================================

print("\n" + "=" * 60)
print("  LEVEL 4 BOSS CHECK")
print("=" * 60)

score = 0
total = 3

# Check 4.1
if (total_ratings == 100000 and num_users == 943 and num_movies == 1682
        and sparsity is not None and abs(sparsity - 6.305) < 0.1):
    print(f"[PASS] Challenge 4.1: Data stats correct (sparsity={sparsity:.1f}%)")
    score += 1
else:
    print(f"[FAIL] Challenge 4.1: Check your values. "
          f"total={total_ratings}, users={num_users}, movies={num_movies}, sparsity={sparsity}")

# Check 4.2
if train_dataset is not None and test_dataset is not None:
    total = len(train_dataset) + len(test_dataset)
    if abs(total - 100000) < 10 and abs(len(train_dataset) - 80000) < 1000:
        print(f"[PASS] Challenge 4.2: Train={len(train_dataset)}, Test={len(test_dataset)}")
        score += 1
    else:
        print(f"[FAIL] Challenge 4.2: Unexpected split sizes")
else:
    print("[FAIL] Challenge 4.2: Create train_dataset and test_dataset")

total = 3  # Reset total since we overwrote it

# Check 4.3
if train_loader is not None and test_loader is not None:
    batch = next(iter(train_loader))
    if len(batch) == 3 and len(batch[0]) == 64:
        print(f"[PASS] Challenge 4.3: DataLoaders working (batch_size=64)")
        score += 1
    else:
        print(f"[FAIL] Challenge 4.3: Check batch size")
else:
    print("[FAIL] Challenge 4.3: Create train_loader and test_loader")

print(f"\nScore: {score}/{total}")
if score == total:
    print("LEVEL 4 COMPLETE! +250 XP (Total: 700 XP)")
    print("You are now a Data Wrangler!")
    print("Next: python level_05_embeddings.py")
else:
    print("Almost there! Real data is messy but you've got this.")
