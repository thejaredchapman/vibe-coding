"""
==============================================================
  LEVEL 1: THE TENSOR APPRENTICE (100 XP)
==============================================================

WHAT YOU'LL LEARN:
  Tensors are the fundamental data structure in PyTorch.
  Think of them as supercharged NumPy arrays that can run on GPUs.

  In our Netflix recommender:
  - User ratings will be tensors
  - Movie features will be tensors
  - Model weights will be tensors
  EVERYTHING is a tensor.

WHY THIS MATTERS:
  You can't build a recommender without understanding tensors,
  just like you can't cook without knowing what ingredients are.

==============================================================
"""

import torch

print("=" * 60)
print("  LEVEL 1: THE TENSOR APPRENTICE")
print("=" * 60)
print()

# ----------------------------------------------------------
# LESSON 1.1: Creating Tensors
# ----------------------------------------------------------
# A tensor is just a multi-dimensional array of numbers.
#
# Scalar (0D tensor):  5
# Vector (1D tensor):  [1, 2, 3]
# Matrix (2D tensor):  [[1, 2], [3, 4]]
# 3D tensor:           [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
#
# Think of Netflix ratings:
#   - A single rating (4.5) is a scalar
#   - One user's ratings [4, 5, 3, 2] is a vector
#   - All users' ratings is a matrix (rows=users, cols=movies)
# ----------------------------------------------------------

print("--- Lesson 1.1: Creating Tensors ---")

# Example: Create a tensor from a Python list
ratings_user_1 = torch.tensor([5.0, 3.0, 4.0, 1.0, 2.0])
print(f"User 1 ratings: {ratings_user_1}")
print(f"Shape: {ratings_user_1.shape}")  # torch.Size([5]) - 1D with 5 elements
print(f"Data type: {ratings_user_1.dtype}")  # float32
print()

# ============================================================
# CHALLENGE 1.1: Create a 2D tensor (matrix) representing
# ratings from 3 users for 4 movies.
# Use these ratings:
#   User 1: [5, 3, 0, 1]  (0 means not rated)
#   User 2: [4, 0, 0, 1]
#   User 3: [1, 1, 0, 5]
# ============================================================

# YOUR CODE HERE: Create a variable called `ratings_matrix`
ratings_matrix = None  # Replace None with your tensor

# HINT (uncomment if stuck):
# ratings_matrix = torch.tensor([[5, 3, 0, 1], [4, 0, 0, 1], [1, 1, 0, 5]], dtype=torch.float32)


# ----------------------------------------------------------
# LESSON 1.2: Tensor Shapes and Dimensions
# ----------------------------------------------------------
# .shape tells you the size of each dimension
# .dim() tells you how many dimensions
# .numel() tells you total number of elements
#
# For Netflix:
#   Shape (943, 1682) means 943 users, 1682 movies
# ----------------------------------------------------------

print("--- Lesson 1.2: Shapes ---")

example = torch.zeros(943, 1682)  # Creates a matrix of zeros
print(f"Shape: {example.shape}")  # torch.Size([943, 1682])
print(f"Dimensions: {example.dim()}")  # 2
print(f"Total elements: {example.numel()}")  # 943 * 1682
print()

# ============================================================
# CHALLENGE 1.2: What is the shape, dimensions, and number
# of elements in your ratings_matrix?
# Fill in the expected values below.
# ============================================================

expected_shape = None       # Replace with a tuple like (3, 4)
expected_dims = None        # Replace with an integer
expected_elements = None    # Replace with an integer

# HINT: ratings_matrix has 3 users (rows) and 4 movies (columns)


# ----------------------------------------------------------
# LESSON 1.3: Tensor Operations
# ----------------------------------------------------------
# You can do math on tensors just like numbers.
# Operations happen element-wise by default.
#
# This is KEY for recommendations:
#   - Dot products measure similarity between users
#   - Matrix multiply predicts ratings
# ----------------------------------------------------------

print("--- Lesson 1.3: Operations ---")

a = torch.tensor([1.0, 2.0, 3.0])
b = torch.tensor([4.0, 5.0, 6.0])

print(f"a + b = {a + b}")          # Element-wise addition
print(f"a * b = {a * b}")          # Element-wise multiplication
print(f"dot product = {torch.dot(a, b)}")  # 1*4 + 2*5 + 3*6 = 32
print(f"mean = {a.mean()}")        # Average
print()

# ============================================================
# CHALLENGE 1.3: Compute the average rating that User 1 gave
# (from your ratings_matrix). But ONLY count movies they
# actually rated (rating > 0).
#
# Steps:
#   1. Get User 1's ratings (first row of ratings_matrix)
#   2. Create a mask: which ratings are > 0?
#   3. Use the mask to select only non-zero ratings
#   4. Compute the mean of those ratings
# ============================================================

# YOUR CODE HERE:
user1_ratings = None        # Step 1: Get first row
mask = None                 # Step 2: Boolean mask where rating > 0
non_zero_ratings = None     # Step 3: Apply mask to filter
user1_avg = None            # Step 4: Compute mean

# HINT:
# user1_ratings = ratings_matrix[0]       # First row
# mask = user1_ratings > 0                # Boolean tensor
# non_zero_ratings = user1_ratings[mask]  # Fancy indexing
# user1_avg = non_zero_ratings.mean()


# ----------------------------------------------------------
# LESSON 1.4: Reshaping Tensors
# ----------------------------------------------------------
# Sometimes you need to change a tensor's shape without
# changing its data. This is VERY common in deep learning.
#
# .view() and .reshape() change shape
# .unsqueeze() adds a dimension
# .squeeze() removes dimensions of size 1
# ----------------------------------------------------------

print("--- Lesson 1.4: Reshaping ---")

flat = torch.arange(12)  # [0, 1, 2, ..., 11]
print(f"Flat: {flat} shape={flat.shape}")

reshaped = flat.view(3, 4)  # Reshape to 3x4 matrix
print(f"Reshaped:\n{reshaped}")
print()

# ============================================================
# CHALLENGE 1.4: Take the flat tensor [1,2,3,4,5,6] and
# reshape it into a 2x3 matrix, then into a 3x2 matrix.
# ============================================================

flat_tensor = torch.tensor([1, 2, 3, 4, 5, 6], dtype=torch.float32)

# YOUR CODE HERE:
matrix_2x3 = None  # Reshape to (2, 3)
matrix_3x2 = None  # Reshape to (3, 2)

# HINT:
# matrix_2x3 = flat_tensor.view(2, 3)
# matrix_3x2 = flat_tensor.view(3, 2)


# ==============================================================
# BOSS CHECK: Pass all these to complete Level 1!
# ==============================================================

print("\n" + "=" * 60)
print("  LEVEL 1 BOSS CHECK")
print("=" * 60)

score = 0
total = 6

# Check 1.1
if ratings_matrix is not None and ratings_matrix.shape == torch.Size([3, 4]):
    print("[PASS] Challenge 1.1: ratings_matrix created correctly")
    score += 1
else:
    print("[FAIL] Challenge 1.1: ratings_matrix should be shape (3, 4)")

# Check 1.2
if expected_shape == (3, 4):
    print("[PASS] Challenge 1.2a: Correct shape")
    score += 1
else:
    print(f"[FAIL] Challenge 1.2a: Expected shape (3, 4), got {expected_shape}")

if expected_dims == 2 and expected_elements == 12:
    print("[PASS] Challenge 1.2b: Correct dims and elements")
    score += 1
else:
    print(f"[FAIL] Challenge 1.2b: Expected dims=2, elements=12")

# Check 1.3
if user1_avg is not None and abs(float(user1_avg) - 3.0) < 0.01:
    print("[PASS] Challenge 1.3: User 1 average rating is 3.0")
    score += 1
else:
    print(f"[FAIL] Challenge 1.3: User 1 avg should be 3.0 (mean of [5,3,1])")

# Check 1.4
if matrix_2x3 is not None and matrix_2x3.shape == torch.Size([2, 3]):
    print("[PASS] Challenge 1.4a: 2x3 reshape correct")
    score += 1
else:
    print("[FAIL] Challenge 1.4a: matrix_2x3 should be shape (2, 3)")

if matrix_3x2 is not None and matrix_3x2.shape == torch.Size([3, 2]):
    print("[PASS] Challenge 1.4b: 3x2 reshape correct")
    score += 1
else:
    print("[FAIL] Challenge 1.4b: matrix_3x2 should be shape (3, 2)")

print(f"\nScore: {score}/{total}")
if score == total:
    print("LEVEL 1 COMPLETE! +100 XP")
    print("You are now a Tensor Apprentice!")
    print("Next: python level_02_autograd.py")
else:
    print("Keep trying! Fill in the YOUR CODE HERE sections.")
    print("Uncomment the HINTS if you're stuck.")
