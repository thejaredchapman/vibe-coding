"""
==============================================================
  LEVEL 7: THE GRAND MASTER — BOSS LEVEL (1000 XP)
==============================================================

WHAT YOU'LL LEARN:
  Upgrade from simple Matrix Factorization to
  Neural Collaborative Filtering (NCF) — the modern approach.

  THE DIFFERENCE:
  - MF (Level 6): rating = dot(user, movie) + biases
    Simple, fast, but limited to linear interactions.

  - NCF (This Level): rating = NeuralNet(concat(user, movie))
    Can learn complex non-linear patterns!

  This is what modern Netflix/Spotify/YouTube actually use
  (plus many more tricks, but this is the foundation).

  TARGET: Beat your Level 6 RMSE score!

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
print("  LEVEL 7: THE GRAND MASTER (BOSS LEVEL)")
print("=" * 60)
print()

# ----------------------------------------------------------
# SETUP (same as Level 6)
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

print(f"Data loaded: {len(train_dataset):,} train, {len(test_dataset):,} test")
print()


# ----------------------------------------------------------
# LESSON 7.1: Neural Collaborative Filtering Architecture
# ----------------------------------------------------------
# Instead of just a dot product, we:
#   1. Get user embedding and movie embedding
#   2. CONCATENATE them into one big vector
#   3. Feed through a multi-layer neural network
#   4. Output a predicted rating
#
#   [user_emb (64)] + [item_emb (64)] = [combined (128)]
#        |
#   [Linear 128 -> 64] + ReLU + Dropout
#        |
#   [Linear 64 -> 32] + ReLU + Dropout
#        |
#   [Linear 32 -> 1]
#        |
#   predicted rating
# ----------------------------------------------------------

print("--- Lesson 7.1: NCF Architecture ---")


class NeuralCollaborativeFiltering(nn.Module):
    """
    Neural Collaborative Filtering model.

    Combines user and item embeddings with a deep neural network
    to learn non-linear user-item interactions.
    """

    def __init__(self, n_users, n_items, emb_dim=64, hidden_layers=[64, 32], dropout=0.2):
        super().__init__()

        # Embedding layers
        self.user_emb = nn.Embedding(n_users, emb_dim)
        self.item_emb = nn.Embedding(n_items, emb_dim)

        # Build the MLP layers dynamically
        layers = []
        input_dim = emb_dim * 2  # concat of user + item
        for hidden_dim in hidden_layers:
            layers.append(nn.Linear(input_dim, hidden_dim))
            layers.append(nn.ReLU())
            layers.append(nn.Dropout(dropout))
            input_dim = hidden_dim
        layers.append(nn.Linear(input_dim, 1))

        self.mlp = nn.Sequential(*layers)

        # Initialize
        nn.init.normal_(self.user_emb.weight, std=0.01)
        nn.init.normal_(self.item_emb.weight, std=0.01)
        for layer in self.mlp:
            if isinstance(layer, nn.Linear):
                nn.init.xavier_uniform_(layer.weight)
                nn.init.zeros_(layer.bias)

    def forward(self, user_ids, item_ids):
        u_emb = self.user_emb(user_ids)   # (batch, emb_dim)
        i_emb = self.item_emb(item_ids)   # (batch, emb_dim)

        # Concatenate user and item embeddings
        combined = torch.cat([u_emb, i_emb], dim=1)  # (batch, emb_dim*2)

        # Pass through MLP
        output = self.mlp(combined).squeeze()  # (batch,)

        return output.clamp(1.0, 5.0)


ncf_model = NeuralCollaborativeFiltering(n_users, n_items)
print(f"NCF Model:")
print(f"  Parameters: {sum(p.numel() for p in ncf_model.parameters()):,}")
print(f"  Architecture: {ncf_model.mlp}")
print()


# ----------------------------------------------------------
# LESSON 7.2: Training Utilities
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
    total_se = 0
    total_n = 0
    with torch.no_grad():
        for users, items, ratings in loader:
            predictions = model(users, items)
            total_se += ((predictions - ratings) ** 2).sum().item()
            total_n += len(ratings)
    return math.sqrt(total_se / total_n)


# ============================================================
# CHALLENGE 7.1: Train the NCF Model
#
# Train the ncf_model to beat RMSE < 0.95 (or even < 0.93!)
#
# Suggested hyperparameters:
#   - Optimizer: Adam, lr=0.001, weight_decay=1e-5
#   - Epochs: 30
#   - Loss: MSELoss
#
# Track the best RMSE and store it in `best_rmse`.
# Save the best model weights using torch.save().
# ============================================================

print("--- Training NCF Model ---\n")

# YOUR CODE HERE:
loss_fn = None
optimizer = None
best_rmse = float("inf")

# Training loop with best model tracking:
# for epoch in range(30):
#     ...
#     if test_rmse < best_rmse:
#         best_rmse = test_rmse
#         torch.save(model.state_dict(), "best_ncf_model.pth")

# HINT:
# loss_fn = nn.MSELoss()
# optimizer = optim.Adam(ncf_model.parameters(), lr=0.001, weight_decay=1e-5)
# best_rmse = float("inf")
#
# for epoch in range(30):
#     train_loss = train_one_epoch(ncf_model, train_loader, optimizer, loss_fn)
#     test_rmse = evaluate(ncf_model, test_loader)
#     marker = ""
#     if test_rmse < best_rmse:
#         best_rmse = test_rmse
#         torch.save(ncf_model.state_dict(), "best_ncf_model.pth")
#         marker = " <-- BEST"
#     print(f"  Epoch {epoch+1:2d} | Train Loss: {train_loss:.4f} | Test RMSE: {test_rmse:.4f}{marker}")
#
# print(f"\nBest RMSE: {best_rmse:.4f}")


# ============================================================
# CHALLENGE 7.2: Full Recommendation Pipeline
#
# Create a complete recommendation function that:
#   1. Loads the best saved model
#   2. For a given user, predicts ratings for all unseen movies
#   3. Returns top-N recommendations with predicted ratings
#   4. Also shows what the user has rated highly (for comparison)
#
# Test it on user 0 and store results in `final_recs`
# ============================================================

def full_recommendation_pipeline(user_idx, model, n=10):
    """Complete recommendation pipeline for a user."""
    # YOUR CODE HERE:
    pass

final_recs = None

# HINT:
# def full_recommendation_pipeline(user_idx, model, n=10):
#     model.eval()
#
#     # What has this user already rated highly?
#     user_ratings = ratings_df[ratings_df["user_idx"] == user_idx].merge(movies_df, on="item_id")
#     top_rated = user_ratings.nlargest(5, "rating")[["title", "rating"]]
#     print(f"\n  User {user_idx}'s top rated movies:")
#     for _, row in top_rated.iterrows():
#         print(f"    {row['rating']:.0f}/5 - {row['title']}")
#
#     # Predict for all unseen movies
#     rated_items = set(ratings_df[ratings_df["user_idx"] == user_idx]["item_idx"].values)
#     all_items = torch.arange(n_items)
#     user_tensor = torch.full((n_items,), user_idx, dtype=torch.long)
#
#     with torch.no_grad():
#         predictions = model(user_tensor, all_items)
#
#     # Get top N unseen
#     recs = []
#     for item_idx in range(n_items):
#         if item_idx not in rated_items:
#             item_id = idx_to_item[item_idx]
#             title = movies_df[movies_df["item_id"] == item_id]["title"].values
#             if len(title) > 0:
#                 recs.append((predictions[item_idx].item(), title[0]))
#     recs.sort(reverse=True)
#
#     print(f"\n  Top {n} Recommendations:")
#     result = []
#     for i, (pred_rating, title) in enumerate(recs[:n], 1):
#         print(f"    {i}. {title} (predicted: {pred_rating:.2f}/5)")
#         result.append(title)
#     return result
#
# final_recs = full_recommendation_pipeline(0, ncf_model)


# ==============================================================
# BOSS CHECK
# ==============================================================

print("\n" + "=" * 60)
print("  LEVEL 7 FINAL BOSS CHECK")
print("=" * 60)

score = 0
total = 2

# Check 7.1
if best_rmse < 1.0:
    print(f"[PASS] Challenge 7.1: Best RMSE = {best_rmse:.4f}")
    score += 1
    if best_rmse < 0.95:
        print(f"        BONUS: Under 0.95! Excellent!")
    if best_rmse < 0.93:
        print(f"        LEGENDARY: Under 0.93! Netflix would hire you!")
else:
    print(f"[FAIL] Challenge 7.1: RMSE = {best_rmse:.4f} (need < 1.0)")

# Check 7.2
if final_recs is not None and len(final_recs) >= 5:
    print(f"[PASS] Challenge 7.2: Recommendation pipeline working!")
    score += 1
else:
    print("[FAIL] Challenge 7.2: Complete the recommendation pipeline")

print(f"\nScore: {score}/{total}")
if score == total:
    print()
    print("=" * 60)
    print("  CONGRATULATIONS! ALL LEVELS COMPLETE!")
    print("  TOTAL XP: 2500 / 2500")
    print("  RANK: Netflix AI Grand Master")
    print("=" * 60)
    print()
    print("  You built a real movie recommendation system using:")
    print("    - Tensors & tensor operations")
    print("    - Automatic differentiation")
    print("    - Neural network architectures")
    print("    - Real-world data loading pipelines")
    print("    - Embedding representations")
    print("    - Matrix Factorization")
    print("    - Neural Collaborative Filtering")
    print()
    print("  NEXT STEPS to keep leveling up:")
    print("    1. Try the MovieLens 1M or 10M dataset (bigger!)")
    print("    2. Add movie genres/year as extra features")
    print("    3. Implement a hybrid model (content + collaborative)")
    print("    4. Deploy as an API with FastAPI or Flask")
    print("    5. Add a frontend to browse recommendations")
    print()
    print("  You're ready to build production ML systems.")
    print("=" * 60)
else:
    print("\nYou're at the final boss. Keep pushing!")
