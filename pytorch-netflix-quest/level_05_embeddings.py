"""
==============================================================
  LEVEL 5: THE EMBEDDING SAGE (300 XP)
==============================================================

WHAT YOU'LL LEARN:
  Embeddings are THE key idea behind recommendation systems.

  THE BIG IDEA:
  Instead of representing a user as just an ID number (42),
  represent them as a vector of learned features:
    User 42 -> [0.8, -0.3, 0.5, 0.1, ...]

  Same for movies:
    "Toy Story" -> [0.7, -0.2, 0.6, 0.3, ...]

  These vectors capture hidden preferences:
    - Dimension 1 might represent "likes action"
    - Dimension 2 might represent "prefers short films"
    - etc. (the network discovers these automatically!)

  To predict a rating: dot product of user & movie vectors!
    User likes action (0.8) * Movie is action (0.7) = high match!

==============================================================
"""

import os
import torch
import torch.nn as nn
import pandas as pd

print("=" * 60)
print("  LEVEL 5: THE EMBEDDING SAGE")
print("=" * 60)
print()

# ----------------------------------------------------------
# LESSON 5.1: What is nn.Embedding?
# ----------------------------------------------------------
# nn.Embedding is a lookup table:
#   - Input: an integer index
#   - Output: a learned vector
#
# It's like a dictionary: {0: [0.1, 0.3, ...], 1: [0.5, 0.2, ...]}
# But the vectors are LEARNED during training!
# ----------------------------------------------------------

print("--- Lesson 5.1: nn.Embedding ---")

# Create embeddings for 5 users, each represented by 3 features
user_embedding = nn.Embedding(num_embeddings=5, embedding_dim=3)

# Look up user 0 and user 3
user_0_vec = user_embedding(torch.tensor(0))
user_3_vec = user_embedding(torch.tensor(3))

print(f"User 0 vector: {user_0_vec.data}")
print(f"User 3 vector: {user_3_vec.data}")
print(f"Embedding weight shape: {user_embedding.weight.shape}")  # (5, 3)
print()

# You can look up multiple at once!
batch = torch.tensor([0, 1, 3])
batch_vecs = user_embedding(batch)
print(f"Batch lookup shape: {batch_vecs.shape}")  # (3, 3) - 3 users, 3 dims each
print()

# ============================================================
# CHALLENGE 5.1: Create embeddings for our Netflix data
#
# Create:
#   - user_emb: embedding for 943 users, dimension 32
#   - item_emb: embedding for 1682 movies, dimension 32
#
# Then look up the embedding for user 0 and movie 0.
# ============================================================

# YOUR CODE HERE:
user_emb = None     # Embedding for 943 users, dim 32
item_emb = None     # Embedding for 1682 items, dim 32
user_0 = None       # Look up user 0's embedding
movie_0 = None      # Look up movie 0's embedding

# HINT:
# user_emb = nn.Embedding(943, 32)
# item_emb = nn.Embedding(1682, 32)
# user_0 = user_emb(torch.tensor(0))
# movie_0 = item_emb(torch.tensor(0))


# ----------------------------------------------------------
# LESSON 5.2: Cosine Similarity — Measuring Closeness
# ----------------------------------------------------------
# How similar are two vectors? Use cosine similarity!
#
# cos_sim = (A . B) / (|A| * |B|)
#
# Result:  1.0 = identical direction (very similar)
#          0.0 = perpendicular (unrelated)
#         -1.0 = opposite direction (very different)
#
# Netflix uses this to find "movies similar to what you liked"
# ----------------------------------------------------------

print("--- Lesson 5.2: Cosine Similarity ---")

# Two similar movies (both action)
action_1 = torch.tensor([0.9, 0.1, 0.8])
action_2 = torch.tensor([0.8, 0.2, 0.7])

# A different genre (romance)
romance = torch.tensor([-0.5, 0.9, -0.3])

cos_sim = nn.CosineSimilarity(dim=0)
print(f"Action1 vs Action2: {cos_sim(action_1, action_2).item():.4f}")  # High
print(f"Action1 vs Romance: {cos_sim(action_1, romance).item():.4f}")    # Low/negative
print()

# ============================================================
# CHALLENGE 5.2: Predict a rating using dot product
#
# The simplest recommender: rating = dot(user_vec, movie_vec)
#
# Steps:
#   1. Get user 0's embedding (from user_emb)
#   2. Get movie 0's embedding (from item_emb)
#   3. Compute their dot product
#   4. Store in `dot_product_rating`
#
# Note: use torch.dot() and .detach() to avoid grad issues
# ============================================================

# YOUR CODE HERE:
dot_product_rating = None

# HINT:
# u_vec = user_emb(torch.tensor(0)).detach()
# m_vec = item_emb(torch.tensor(0)).detach()
# dot_product_rating = torch.dot(u_vec, m_vec).item()


# ----------------------------------------------------------
# LESSON 5.3: The Matrix Factorization Model
# ----------------------------------------------------------
# THIS is the core of Netflix's original recommendation system!
#
# Idea: Every rating can be approximated by:
#   rating(user, movie) = dot(user_embedding, movie_embedding) + user_bias + movie_bias + global_bias
#
# The biases capture:
#   - global_bias: average rating across all users/movies (~3.5)
#   - user_bias: "this user rates everything high/low"
#   - movie_bias: "this movie gets rated high/low by everyone"
# ----------------------------------------------------------

print("--- Lesson 5.3: Matrix Factorization ---")


class MatrixFactorization(nn.Module):
    def __init__(self, n_users, n_items, n_factors=32):
        super().__init__()
        self.user_embeddings = nn.Embedding(n_users, n_factors)
        self.item_embeddings = nn.Embedding(n_items, n_factors)
        self.user_bias = nn.Embedding(n_users, 1)
        self.item_bias = nn.Embedding(n_items, 1)

        # Initialize embeddings with small random values
        nn.init.normal_(self.user_embeddings.weight, std=0.01)
        nn.init.normal_(self.item_embeddings.weight, std=0.01)
        nn.init.zeros_(self.user_bias.weight)
        nn.init.zeros_(self.item_bias.weight)

        self.global_bias = nn.Parameter(torch.tensor(0.0))

    def forward(self, user_ids, item_ids):
        # Look up embeddings
        user_vecs = self.user_embeddings(user_ids)   # (batch, n_factors)
        item_vecs = self.item_embeddings(item_ids)   # (batch, n_factors)

        # Dot product (element-wise multiply then sum)
        dot = (user_vecs * item_vecs).sum(dim=1)     # (batch,)

        # Add biases
        u_bias = self.user_bias(user_ids).squeeze()   # (batch,)
        i_bias = self.item_bias(item_ids).squeeze()   # (batch,)

        return dot + u_bias + i_bias + self.global_bias


mf_model = MatrixFactorization(n_users=943, n_items=1682, n_factors=32)
print(f"Model parameters: {sum(p.numel() for p in mf_model.parameters()):,}")

# Test with a batch
test_users = torch.tensor([0, 1, 2])
test_items = torch.tensor([10, 20, 30])
test_preds = mf_model(test_users, test_items)
print(f"Sample predictions: {test_preds.data}")
print()

# ============================================================
# CHALLENGE 5.3: Build YOUR Matrix Factorization Model
#
# Create a model called MyMF with:
#   - 943 users, 1682 items, 64 factors (bigger = more expressive)
#   - User and item embeddings
#   - User and item biases
#   - Global bias
#   - Same forward() logic as above
#
# Then make predictions for users [0, 5, 10] on items [100, 200, 300]
# Store predictions in `my_predictions`
# ============================================================

# YOUR CODE HERE:
class MyMF(nn.Module):
    def __init__(self):
        super().__init__()
        pass

    def forward(self, user_ids, item_ids):
        pass

my_mf = None        # Instantiate your model
my_predictions = None  # Predictions for users [0,5,10] on items [100,200,300]

# HINT:
# class MyMF(nn.Module):
#     def __init__(self):
#         super().__init__()
#         self.user_emb = nn.Embedding(943, 64)
#         self.item_emb = nn.Embedding(1682, 64)
#         self.user_bias = nn.Embedding(943, 1)
#         self.item_bias = nn.Embedding(1682, 1)
#         self.global_bias = nn.Parameter(torch.tensor(0.0))
#         nn.init.normal_(self.user_emb.weight, std=0.01)
#         nn.init.normal_(self.item_emb.weight, std=0.01)
#
#     def forward(self, user_ids, item_ids):
#         u = self.user_emb(user_ids)
#         i = self.item_emb(item_ids)
#         dot = (u * i).sum(dim=1)
#         return dot + self.user_bias(user_ids).squeeze() + self.item_bias(item_ids).squeeze() + self.global_bias
#
# my_mf = MyMF()
# my_predictions = my_mf(torch.tensor([0, 5, 10]), torch.tensor([100, 200, 300])).detach()


# ==============================================================
# BOSS CHECK
# ==============================================================

print("\n" + "=" * 60)
print("  LEVEL 5 BOSS CHECK")
print("=" * 60)

score = 0
total = 3

# Check 5.1
if user_emb is not None and item_emb is not None:
    if (user_emb.num_embeddings == 943 and user_emb.embedding_dim == 32
            and item_emb.num_embeddings == 1682 and item_emb.embedding_dim == 32):
        print("[PASS] Challenge 5.1: Embeddings created (943 users x 32d, 1682 items x 32d)")
        score += 1
    else:
        print("[FAIL] Challenge 5.1: Check embedding dimensions")
else:
    print("[FAIL] Challenge 5.1: Create user_emb and item_emb")

# Check 5.2
if dot_product_rating is not None and isinstance(dot_product_rating, float):
    print(f"[PASS] Challenge 5.2: Dot product rating = {dot_product_rating:.4f}")
    score += 1
else:
    print(f"[FAIL] Challenge 5.2: Compute dot_product_rating (should be a float)")

# Check 5.3
if my_predictions is not None and len(my_predictions) == 3:
    print(f"[PASS] Challenge 5.3: Model predictions = {my_predictions.tolist()}")
    score += 1
else:
    print(f"[FAIL] Challenge 5.3: my_predictions should have 3 values")

print(f"\nScore: {score}/{total}")
if score == total:
    print("LEVEL 5 COMPLETE! +300 XP (Total: 1000 XP)")
    print("You are now an Embedding Sage!")
    print("Next: python level_06_recommender.py")
else:
    print("Embeddings are the secret sauce — keep at it!")
