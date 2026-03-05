"""
==============================================================
  LEVEL 3: THE NETWORK ARCHITECT (200 XP)
==============================================================

WHAT YOU'LL LEARN:
  How to build neural networks using PyTorch's nn.Module.
  This is the pattern you'll use for EVERYTHING, including
  your Netflix recommender.

  KEY CONCEPTS:
  - nn.Module: base class for all neural networks
  - nn.Linear: a fully connected layer (y = Wx + b)
  - Activation functions: add non-linearity (ReLU, Sigmoid)
  - Forward pass: data flows through layers
  - Training loop: forward -> loss -> backward -> update

==============================================================
"""

import torch
import torch.nn as nn
import torch.optim as optim

print("=" * 60)
print("  LEVEL 3: THE NETWORK ARCHITECT")
print("=" * 60)
print()

# ----------------------------------------------------------
# LESSON 3.1: nn.Linear — The Building Block
# ----------------------------------------------------------
# A Linear layer does: output = input @ weight.T + bias
# It takes input_features and produces output_features.
#
# Think of it as: "Take N numbers in, produce M numbers out"
# ----------------------------------------------------------

print("--- Lesson 3.1: nn.Linear ---")

# A layer that takes 3 inputs and produces 2 outputs
layer = nn.Linear(in_features=3, out_features=2)

# Feed it a single sample with 3 features
sample = torch.tensor([1.0, 2.0, 3.0])
output = layer(sample)

print(f"Input:  {sample} (shape: {sample.shape})")
print(f"Output: {output} (shape: {output.shape})")
print(f"Weight shape: {layer.weight.shape}")  # (2, 3)
print(f"Bias shape:   {layer.bias.shape}")    # (2,)
print()

# ============================================================
# CHALLENGE 3.1: Create a linear layer that takes 5 movie
# features as input and produces 1 output (a rating prediction).
# Then feed it a sample tensor of 5 features.
# ============================================================

# YOUR CODE HERE:
rating_layer = None          # Create nn.Linear(?, ?)
movie_features = torch.tensor([0.8, 0.2, 0.5, 0.9, 0.1])  # 5 features
predicted_rating = None       # Pass movie_features through rating_layer

# HINT:
# rating_layer = nn.Linear(5, 1)
# predicted_rating = rating_layer(movie_features)


# ----------------------------------------------------------
# LESSON 3.2: Activation Functions
# ----------------------------------------------------------
# Without activations, stacking linear layers is pointless:
#   Linear(Linear(x)) = Linear(x) (still linear!)
#
# Activations add non-linearity, letting networks learn
# complex patterns.
#
# Common ones:
#   ReLU: max(0, x) — most popular, used in hidden layers
#   Sigmoid: 1/(1+e^-x) — squashes to [0,1], good for probs
#   Tanh: squashes to [-1,1]
# ----------------------------------------------------------

print("--- Lesson 3.2: Activations ---")

x = torch.tensor([-2.0, -1.0, 0.0, 1.0, 2.0])
print(f"Input:   {x}")
print(f"ReLU:    {torch.relu(x)}")       # Zeros out negatives
print(f"Sigmoid: {torch.sigmoid(x)}")     # Squashes to [0,1]
print()


# ----------------------------------------------------------
# LESSON 3.3: Building a Network with nn.Module
# ----------------------------------------------------------
# The pattern EVERY PyTorch model follows:
#
# class MyModel(nn.Module):
#     def __init__(self):
#         super().__init__()
#         # Define layers here
#
#     def forward(self, x):
#         # Define data flow here
#         return output
# ----------------------------------------------------------

print("--- Lesson 3.3: nn.Module ---")


class SimpleNet(nn.Module):
    """A simple 2-layer network."""

    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.layer1 = nn.Linear(input_size, hidden_size)
        self.layer2 = nn.Linear(hidden_size, output_size)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.layer1(x)    # Linear transform
        x = self.relu(x)      # Activation
        x = self.layer2(x)    # Linear transform
        return x


model = SimpleNet(input_size=4, hidden_size=8, output_size=1)
print(f"Model:\n{model}")
print(f"\nNumber of parameters: {sum(p.numel() for p in model.parameters())}")
print()

# ============================================================
# CHALLENGE 3.2: Build a network called RatingPredictor
#
# Architecture:
#   - Input: 10 features
#   - Hidden layer 1: 32 neurons + ReLU
#   - Hidden layer 2: 16 neurons + ReLU
#   - Output: 1 (predicted rating)
#
# This is the structure our Netflix model will use!
# ============================================================

# YOUR CODE HERE:
class RatingPredictor(nn.Module):
    def __init__(self):
        super().__init__()
        # Define your layers
        pass

    def forward(self, x):
        # Define forward pass
        pass

# HINT:
# class RatingPredictor(nn.Module):
#     def __init__(self):
#         super().__init__()
#         self.layer1 = nn.Linear(10, 32)
#         self.layer2 = nn.Linear(32, 16)
#         self.layer3 = nn.Linear(16, 1)
#         self.relu = nn.ReLU()
#
#     def forward(self, x):
#         x = self.relu(self.layer1(x))
#         x = self.relu(self.layer2(x))
#         x = self.layer3(x)
#         return x


# ----------------------------------------------------------
# LESSON 3.4: The Training Loop
# ----------------------------------------------------------
# Every training loop has the same structure:
#
# for epoch in range(num_epochs):
#     prediction = model(input)         # Forward pass
#     loss = loss_fn(prediction, target) # Compute loss
#     optimizer.zero_grad()              # Clear old gradients
#     loss.backward()                    # Compute new gradients
#     optimizer.step()                   # Update weights
#
# This is the heartbeat of deep learning.
# ----------------------------------------------------------

print("--- Lesson 3.4: Training Loop ---")
print("Training SimpleNet to learn XOR:\n")

# XOR dataset: a classic test for neural networks
# XOR(0,0)=0, XOR(0,1)=1, XOR(1,0)=1, XOR(1,1)=0
X_xor = torch.tensor([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=torch.float32)
y_xor = torch.tensor([[0], [1], [1], [0]], dtype=torch.float32)

xor_model = SimpleNet(input_size=2, hidden_size=8, output_size=1)
loss_fn = nn.MSELoss()  # Mean Squared Error
optimizer = optim.Adam(xor_model.parameters(), lr=0.01)

for epoch in range(1000):
    prediction = xor_model(X_xor)
    loss = loss_fn(prediction, y_xor)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    if (epoch + 1) % 200 == 0:
        print(f"  Epoch {epoch+1}: loss={loss.item():.6f}")

print(f"\nFinal predictions (should be close to [0, 1, 1, 0]):")
with torch.no_grad():
    preds = xor_model(X_xor)
    for i in range(4):
        print(f"  {X_xor[i].tolist()} -> {preds[i].item():.4f} (target: {y_xor[i].item()})")
print()

# ============================================================
# CHALLENGE 3.3: Train your RatingPredictor!
#
# Create some fake movie data and train your model:
#   - 100 samples, 10 features each (random)
#   - Target: ratings between 1-5 (random)
#   - Train for 200 epochs with Adam optimizer, lr=0.01
#   - Use MSELoss
#   - Store the final loss in `final_loss`
# ============================================================

# YOUR CODE HERE:
torch.manual_seed(42)  # For reproducibility

# Create fake data
X_movies = None   # 100 samples, 10 features (use torch.randn)
y_ratings = None  # 100 ratings between 1-5 (use torch.rand * 4 + 1)

# Create model, loss, optimizer
my_model = None
my_loss_fn = None
my_optimizer = None

# Training loop
final_loss = None

# HINT:
# X_movies = torch.randn(100, 10)
# y_ratings = torch.rand(100, 1) * 4 + 1  # Random ratings 1-5
#
# my_model = RatingPredictor()
# my_loss_fn = nn.MSELoss()
# my_optimizer = optim.Adam(my_model.parameters(), lr=0.01)
#
# for epoch in range(200):
#     preds = my_model(X_movies)
#     loss = my_loss_fn(preds, y_ratings)
#     my_optimizer.zero_grad()
#     loss.backward()
#     my_optimizer.step()
# final_loss = loss.item()


# ==============================================================
# BOSS CHECK
# ==============================================================

print("\n" + "=" * 60)
print("  LEVEL 3 BOSS CHECK")
print("=" * 60)

score = 0
total = 3

# Check 3.1
if rating_layer is not None and predicted_rating is not None:
    if rating_layer.in_features == 5 and rating_layer.out_features == 1:
        print("[PASS] Challenge 3.1: Rating layer (5->1) created")
        score += 1
    else:
        print(f"[FAIL] Challenge 3.1: Layer should be (5->1)")
else:
    print("[FAIL] Challenge 3.1: Create rating_layer and predicted_rating")

# Check 3.2
try:
    test_model = RatingPredictor()
    test_input = torch.randn(1, 10)
    test_output = test_model(test_input)
    if test_output.shape == torch.Size([1, 1]):
        print("[PASS] Challenge 3.2: RatingPredictor architecture correct (10->1)")
        score += 1
    else:
        print(f"[FAIL] Challenge 3.2: Output shape should be (1,1), got {test_output.shape}")
except Exception as e:
    print(f"[FAIL] Challenge 3.2: RatingPredictor error: {e}")

# Check 3.3
if final_loss is not None and final_loss < 2.0:
    print(f"[PASS] Challenge 3.3: Model trained! Final loss: {final_loss:.4f}")
    score += 1
else:
    print(f"[FAIL] Challenge 3.3: Train the model (final_loss should be < 2.0, got {final_loss})")

print(f"\nScore: {score}/{total}")
if score == total:
    print("LEVEL 3 COMPLETE! +200 XP (Total: 450 XP)")
    print("You are now a Network Architect!")
    print("Next: python level_04_data_loading.py")
else:
    print("Keep building! Neural networks take practice.")
