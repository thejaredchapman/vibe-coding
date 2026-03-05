"""
==============================================================
  LEVEL 6: THE RECOMMENDER (500 XP)
==============================================================

WHAT YOU'LL LEARN:
  Put it ALL together. Train a real recommendation model on
  real MovieLens data and evaluate it properly.

  This level combines everything from Levels 1-5:
  - Tensors (Level 1)
  - Gradients & optimization (Level 2)
  - Neural networks (Level 3)
  - Data loading (Level 4)
  - Embeddings (Level 5)

  TARGET: Train a model with RMSE < 1.0 on test data
  (Netflix's own contest had RMSE ~0.85 as the goal!)

==============================================================
"""

import os
import math
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

print("=" * 60)
print("  LEVEL 6: THE RECOMMENDER")
print("=" * 60)
print()

# ----------------------------------------------------------
# SETUP: Load and prepare data (from Level 4)
# ----------------------------------------------------------

data_path = os.path.join("data", "ml-100k", "u.data")
if not os.path.exists(data_path):
    print("ERROR: Run `python setup_data.py` first!")
    exit(1)

ratings_df = pd.read_csv(
    data_path, sep="\t", names=["user_id", "item_id", "rating", "timestamp"]
)
movies_df = pd.read_csv(
    os.path.join("data", "ml-100k", "u.item"),
    sep="|", encoding="latin-1", header=None,
    usecols=[0, 1], names=["item_id", "title"],
)

user_to_idx = {uid: idx for idx, uid in enumerate(sorted(ratings_df["user_id"].unique()))}
item_to_idx = {iid: idx for idx, iid in enumerate(sorted(ratings_df["item_id"].unique()))}
idx_to_item = {v: k for k, v in item_to_idx.items()}

ratings_df["user_idx"] = ratings_df["user_id"].map(user_to_idx)
ratings_df["item_idx"] = ratings_df["item_id"].map(item_to_idx)

n_users = len(user_to_idx)
n_items = len(item_to_idx)

print(f"Data: {len(ratings_df):,} ratings, {n_users} users, {n_items} movies")


class MovieLensDataset(Dataset):
    def __init__(self, users, items, ratings):
        self.users = torch.LongTensor(users)
        self.items = torch.LongTensor(items)
        self.ratings = torch.FloatTensor(ratings)

    def __len__(self):
        return len(self.ratings)

    def __getitem__(self, idx):
        return self.users[idx], self.items[idx], self.ratings[idx]


train_df, test_df = train_test_split(ratings_df, test_size=0.2, random_state=42)

train_dataset = MovieLensDataset(
    train_df["user_idx"].values, train_df["item_idx"].values, train_df["rating"].values
)
test_dataset = MovieLensDataset(
    test_df["user_idx"].values, test_df["item_idx"].values, test_df["rating"].values
)

train_loader = DataLoader(train_dataset, batch_size=256, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=256, shuffle=False)

print(f"Train: {len(train_dataset):,} | Test: {len(test_dataset):,}")
print()


# ----------------------------------------------------------
# LESSON 6.1: The Complete Model
# ----------------------------------------------------------
# Here's the Matrix Factorization model from Level 5,
# with one addition: we clamp predictions to [1, 5].
# ----------------------------------------------------------

print("--- Lesson 6.1: The Model ---")


class MatrixFactorization(nn.Module):
    def __init__(self, n_users, n_items, n_factors=32):
        super().__init__()
        self.user_emb = nn.Embedding(n_users, n_factors)
        self.item_emb = nn.Embedding(n_items, n_factors)
        self.user_bias = nn.Embedding(n_users, 1)
        self.item_bias = nn.Embedding(n_items, 1)
        self.global_bias = nn.Parameter(torch.zeros(1))

        # Smart initialization
        nn.init.normal_(self.user_emb.weight, std=0.01)
        nn.init.normal_(self.item_emb.weight, std=0.01)
        nn.init.zeros_(self.user_bias.weight)
        nn.init.zeros_(self.item_bias.weight)

    def forward(self, user_ids, item_ids):
        u_emb = self.user_emb(user_ids)
        i_emb = self.item_emb(item_ids)
        dot = (u_emb * i_emb).sum(dim=1)
        u_bias = self.user_bias(user_ids).squeeze()
        i_bias = self.item_bias(item_ids).squeeze()
        pred = dot + u_bias + i_bias + self.global_bias
        return pred.clamp(1.0, 5.0)  # Keep predictions in valid range


model = MatrixFactorization(n_users, n_items, n_factors=32)
print(f"Parameters: {sum(p.numel() for p in model.parameters()):,}")
print()


# ----------------------------------------------------------
# LESSON 6.2: Training Function
# ----------------------------------------------------------

def train_one_epoch(model, loader, optimizer, loss_fn):
    model.train()
    total_loss = 0
    for users, items, ratings in loader:
        optimizer.zero_grad()
        predictions = model(users, items)
        loss = loss_fn(predictions, ratings)
        loss.backward()
        optimizer.step()
        total_loss += loss.item() * len(ratings)
    return total_loss / len(loader.dataset)


def evaluate(model, loader):
    model.eval()
    total_se = 0  # Sum of squared errors
    total_n = 0
    with torch.no_grad():
        for users, items, ratings in loader:
            predictions = model(users, items)
            total_se += ((predictions - ratings) ** 2).sum().item()
            total_n += len(ratings)
    mse = total_se / total_n
    rmse = math.sqrt(mse)
    return rmse


# ============================================================
# CHALLENGE 6.1: Train the model!
#
# Configure and run the training loop:
#   - Loss function: nn.MSELoss()
#   - Optimizer: Adam with lr=0.005, weight_decay=1e-5
#   - Train for 20 epochs
#   - Print train loss and test RMSE each epoch
#   - Store the final test RMSE in `final_rmse`
#
# TARGET: Get RMSE below 1.0!
# ============================================================

print("--- Training the Recommender ---\n")

# YOUR CODE HERE:
loss_fn = None
optimizer = None
final_rmse = None

# Training loop:
# for epoch in range(20):
#     train_loss = train_one_epoch(...)
#     test_rmse = evaluate(...)
#     print(...)
# final_rmse = test_rmse

# HINT:
# loss_fn = nn.MSELoss()
# optimizer = optim.Adam(model.parameters(), lr=0.005, weight_decay=1e-5)
#
# for epoch in range(20):
#     train_loss = train_one_epoch(model, train_loader, optimizer, loss_fn)
#     test_rmse = evaluate(model, test_loader)
#     print(f"  Epoch {epoch+1:2d} | Train Loss: {train_loss:.4f} | Test RMSE: {test_rmse:.4f}")
# final_rmse = test_rmse


# ============================================================
# CHALLENGE 6.2: Get recommendations for a user!
#
# Write a function that:
#   1. Takes a user_idx
#   2. Gets predicted ratings for ALL movies
#   3. Returns the top-N movie titles they haven't rated yet
#
# Store the top 5 recommendations for user 0 in `top_5_recs`
# (as a list of movie title strings)
# ============================================================

def get_recommendations(model, user_idx, ratings_df, movies_df, item_to_idx, idx_to_item, n=5):
    """Get top-N movie recommendations for a user."""
    # YOUR CODE HERE:
    pass

top_5_recs = None

# HINT:
# def get_recommendations(model, user_idx, ratings_df, movies_df, item_to_idx, idx_to_item, n=5):
#     model.eval()
#     # Movies this user already rated
#     rated_items = set(ratings_df[ratings_df["user_idx"] == user_idx]["item_idx"].values)
#
#     # Predict ratings for all movies
#     all_items = torch.arange(len(item_to_idx))
#     user_tensor = torch.full_like(all_items, user_idx)
#
#     with torch.no_grad():
#         predictions = model(user_tensor, all_items)
#
#     # Filter out already rated, get top N
#     scores = []
#     for item_idx in range(len(item_to_idx)):
#         if item_idx not in rated_items:
#             item_id = idx_to_item[item_idx]
#             title = movies_df[movies_df["item_id"] == item_id]["title"].values
#             if len(title) > 0:
#                 scores.append((predictions[item_idx].item(), title[0]))
#
#     scores.sort(reverse=True)
#     return [title for _, title in scores[:n]]
#
# top_5_recs = get_recommendations(model, 0, ratings_df, movies_df, item_to_idx, idx_to_item)


# ==============================================================
# BOSS CHECK
# ==============================================================

print("\n" + "=" * 60)
print("  LEVEL 6 BOSS CHECK")
print("=" * 60)

score = 0
total = 2

# Check 6.1
if final_rmse is not None and final_rmse < 1.0:
    print(f"[PASS] Challenge 6.1: RMSE = {final_rmse:.4f} (< 1.0!)")
    score += 1
elif final_rmse is not None:
    print(f"[CLOSE] Challenge 6.1: RMSE = {final_rmse:.4f} (needs to be < 1.0, try more epochs or tuning)")
else:
    print("[FAIL] Challenge 6.1: Train the model and set final_rmse")

# Check 6.2
if top_5_recs is not None and len(top_5_recs) == 5 and all(isinstance(t, str) for t in top_5_recs):
    print(f"[PASS] Challenge 6.2: Top 5 recommendations for User 0:")
    for i, title in enumerate(top_5_recs, 1):
        print(f"        {i}. {title}")
    score += 1
else:
    print("[FAIL] Challenge 6.2: get_recommendations should return 5 movie title strings")

print(f"\nScore: {score}/{total}")
if score == total:
    print("LEVEL 6 COMPLETE! +500 XP (Total: 1500 XP)")
    print("You are now a Recommender!")
    print("FINAL BOSS: python level_07_advanced.py")
else:
    print("You're so close to building a real recommender!")
