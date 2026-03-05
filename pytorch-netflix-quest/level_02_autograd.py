"""
==============================================================
  LEVEL 2: THE GRADIENT WHISPERER (150 XP)
==============================================================

WHAT YOU'LL LEARN:
  Autograd is PyTorch's automatic differentiation engine.
  It computes gradients (derivatives) for you automatically.

  WHY? Because training a neural network means:
    1. Make a prediction
    2. Measure how wrong it is (loss)
    3. Figure out HOW to adjust weights to be less wrong
    Step 3 requires gradients. Autograd does step 3 for you.

  NETFLIX ANALOGY:
    Imagine you predicted a user would rate a movie 3.0,
    but they rated it 5.0. The gradient tells you:
    "Increase your prediction — and here's exactly how much."

==============================================================
"""

import torch

print("=" * 60)
print("  LEVEL 2: THE GRADIENT WHISPERER")
print("=" * 60)
print()

# ----------------------------------------------------------
# LESSON 2.1: What is a Gradient?
# ----------------------------------------------------------
# A gradient tells you how much a function's output changes
# when you change its input. It's the slope/derivative.
#
# Example: f(x) = x^2
#   derivative: f'(x) = 2x
#   At x=3: gradient = 6 (meaning: if x increases by 1,
#                          f(x) increases by ~6)
#
# In deep learning:
#   x = model weights
#   f(x) = loss (how wrong the model is)
#   gradient = direction to adjust weights
# ----------------------------------------------------------

print("--- Lesson 2.1: Basic Gradients ---")

# requires_grad=True tells PyTorch: "track operations on this tensor"
x = torch.tensor(3.0, requires_grad=True)

# Perform an operation
y = x ** 2  # y = x^2 = 9

# Compute gradients (backpropagation)
y.backward()

# x.grad now contains dy/dx = 2x = 2*3 = 6
print(f"x = {x.item()}")
print(f"y = x^2 = {y.item()}")
print(f"dy/dx = 2x = {x.grad.item()}")  # Should be 6.0
print()

# ============================================================
# CHALLENGE 2.1: Compute the gradient of f(x) = x^3 + 2x
# at x = 2.0
#
# Math: f'(x) = 3x^2 + 2
#       f'(2) = 3(4) + 2 = 14
#
# Steps:
#   1. Create tensor x = 2.0 with requires_grad=True
#   2. Compute y = x^3 + 2*x
#   3. Call y.backward()
#   4. Read x.grad
# ============================================================

# YOUR CODE HERE:
x1 = None       # Step 1
y1 = None       # Step 2
# Step 3: call backward
gradient_2_1 = None  # Step 4: read the gradient

# HINT:
# x1 = torch.tensor(2.0, requires_grad=True)
# y1 = x1 ** 3 + 2 * x1
# y1.backward()
# gradient_2_1 = x1.grad


# ----------------------------------------------------------
# LESSON 2.2: Gradients with Multiple Variables
# ----------------------------------------------------------
# Real models have MILLIONS of parameters.
# Autograd computes gradients for ALL of them at once.
#
# Example: f(a, b) = a*b + b^2
#   df/da = b
#   df/db = a + 2b
# ----------------------------------------------------------

print("--- Lesson 2.2: Multiple Variables ---")

a = torch.tensor(2.0, requires_grad=True)
b = torch.tensor(3.0, requires_grad=True)

f = a * b + b ** 2  # f = 2*3 + 9 = 15

f.backward()

print(f"a = {a.item()}, b = {b.item()}")
print(f"f = a*b + b^2 = {f.item()}")
print(f"df/da = b = {a.grad.item()}")       # Should be 3.0
print(f"df/db = a + 2b = {b.grad.item()}")  # Should be 8.0
print()

# ============================================================
# CHALLENGE 2.2: Netflix Loss Function
#
# In our recommender, the loss is:
#   loss = (predicted_rating - actual_rating)^2
#
# If predicted = 3.5 (a learnable parameter) and actual = 5.0:
#   loss = (3.5 - 5.0)^2 = 2.25
#   d(loss)/d(predicted) = 2 * (3.5 - 5.0) = -3.0
#
# The negative gradient means: INCREASE your prediction!
#
# Compute this with PyTorch autograd.
# ============================================================

# YOUR CODE HERE:
predicted = None    # Create tensor 3.5 with requires_grad=True
actual = 5.0        # This is fixed, not learnable
loss = None         # Compute (predicted - actual)^2
# Call backward on loss
loss_gradient = None  # Read predicted.grad

# HINT:
# predicted = torch.tensor(3.5, requires_grad=True)
# loss = (predicted - actual) ** 2
# loss.backward()
# loss_gradient = predicted.grad


# ----------------------------------------------------------
# LESSON 2.3: Gradient Descent (How Learning Works)
# ----------------------------------------------------------
# Now the magic: use gradients to IMPROVE predictions.
#
# Algorithm:
#   1. Make prediction
#   2. Compute loss
#   3. Compute gradient
#   4. Update: new_value = old_value - learning_rate * gradient
#   5. Repeat
#
# The learning rate controls step size.
# Too big = overshoot. Too small = slow learning.
# ----------------------------------------------------------

print("--- Lesson 2.3: Gradient Descent ---")
print("Watch the prediction improve over 10 steps:\n")

# We want to learn the value 5.0 starting from 0.0
guess = torch.tensor(0.0, requires_grad=True)
target = 5.0
learning_rate = 0.1

for step in range(10):
    # Forward pass: compute loss
    loss = (guess - target) ** 2

    # Backward pass: compute gradient
    loss.backward()

    # Update (manually, no optimizer yet)
    with torch.no_grad():  # Don't track this operation
        guess -= learning_rate * guess.grad
        guess.grad.zero_()  # Reset gradient for next iteration

    print(f"  Step {step+1}: guess={guess.item():.4f}, loss={loss.item():.4f}")

print()

# ============================================================
# CHALLENGE 2.3: Gradient Descent for a Rating
#
# A user rated Movie X as 4.0. Your model starts by guessing
# the rating is 1.0. Use gradient descent to learn the
# correct rating.
#
# Use learning_rate = 0.2 and run for 20 steps.
# Store the final prediction in `final_prediction`.
# ============================================================

# YOUR CODE HERE:
model_prediction = None  # Start at 1.0 with requires_grad=True
true_rating = 4.0
lr = 0.2
final_prediction = None

# HINT:
# model_prediction = torch.tensor(1.0, requires_grad=True)
# for step in range(20):
#     loss = (model_prediction - true_rating) ** 2
#     loss.backward()
#     with torch.no_grad():
#         model_prediction -= lr * model_prediction.grad
#         model_prediction.grad.zero_()
# final_prediction = model_prediction.item()


# ==============================================================
# BOSS CHECK: Pass all these to complete Level 2!
# ==============================================================

print("\n" + "=" * 60)
print("  LEVEL 2 BOSS CHECK")
print("=" * 60)

score = 0
total = 3

# Check 2.1
if gradient_2_1 is not None and abs(float(gradient_2_1) - 14.0) < 0.01:
    print("[PASS] Challenge 2.1: Gradient of x^3 + 2x at x=2 is 14.0")
    score += 1
else:
    print(f"[FAIL] Challenge 2.1: Expected gradient 14.0, got {gradient_2_1}")

# Check 2.2
if loss_gradient is not None and abs(float(loss_gradient) - (-3.0)) < 0.01:
    print("[PASS] Challenge 2.2: Loss gradient is -3.0 (increase prediction!)")
    score += 1
else:
    print(f"[FAIL] Challenge 2.2: Expected gradient -3.0, got {loss_gradient}")

# Check 2.3
if final_prediction is not None and abs(final_prediction - 4.0) < 0.1:
    print(f"[PASS] Challenge 2.3: Learned rating {final_prediction:.4f} (close to 4.0)")
    score += 1
else:
    print(f"[FAIL] Challenge 2.3: Final prediction should be close to 4.0, got {final_prediction}")

print(f"\nScore: {score}/{total}")
if score == total:
    print("LEVEL 2 COMPLETE! +150 XP (Total: 250 XP)")
    print("You are now a Gradient Whisperer!")
    print("Next: python level_03_neural_net.py")
else:
    print("Keep trying! The gradients will flow.")
