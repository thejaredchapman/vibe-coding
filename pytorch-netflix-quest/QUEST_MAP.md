# PyTorch Netflix Recommendation Quest

## Your Quest: Build an AI that recommends movies like Netflix

You'll progress through 7 levels. Each level builds on the last.
Complete the challenge at each level to unlock the next.

---

## LEVEL 1: "The Tensor Apprentice" (Start Here)
**File:** `level_01_tensors.py`
**Goal:** Understand tensors — the building blocks of ALL deep learning
**Skills:** Creating tensors, shapes, operations, GPU basics
**Challenge:** Pass all assertions at the bottom of the file
**XP Reward:** 100 XP

## LEVEL 2: "The Gradient Whisperer"
**File:** `level_02_autograd.py`
**Goal:** Understand autograd — how PyTorch learns automatically
**Skills:** Gradients, backpropagation, computation graphs
**Challenge:** Manually compute a gradient, then verify with PyTorch
**XP Reward:** 150 XP

## LEVEL 3: "The Network Architect"
**File:** `level_03_neural_net.py`
**Goal:** Build your first neural network from scratch
**Skills:** nn.Module, layers, forward pass, activation functions
**Challenge:** Build a network that learns XOR (the classic test)
**XP Reward:** 200 XP

## LEVEL 4: "The Data Wrangler"
**File:** `level_04_data_loading.py`
**Goal:** Load and prepare real movie ratings data
**Skills:** Dataset, DataLoader, train/test splits, batching
**Challenge:** Create a MovieLens dataset loader that feeds batches
**XP Reward:** 250 XP

## LEVEL 5: "The Embedding Sage"
**File:** `level_05_embeddings.py`
**Goal:** Learn embeddings — how Netflix represents users and movies as vectors
**Skills:** nn.Embedding, similarity, vector spaces
**Challenge:** Find similar movies using cosine similarity
**XP Reward:** 300 XP

## LEVEL 6: "The Recommender"
**File:** `level_06_recommender.py`
**Goal:** Build the full collaborative filtering recommendation model
**Skills:** Matrix factorization, training loops, loss functions, optimization
**Challenge:** Train a model that predicts ratings with < 1.0 RMSE
**XP Reward:** 500 XP

## LEVEL 7: "The Grand Master" (BOSS LEVEL)
**File:** `level_07_advanced.py`
**Goal:** Upgrade to a Neural Collaborative Filtering model
**Skills:** Deep learning recommender, evaluation metrics, model saving
**Challenge:** Beat your Level 6 model's RMSE score
**XP Reward:** 1000 XP

---

## TOTAL XP: 2500
## Rank Progression:
- 0-100: Tensor Apprentice
- 250-450: Gradient Whisperer
- 450-900: Network Architect
- 900-1500: Recommender in Training
- 1500-2500: Netflix AI Grand Master

---

## How to Play:
1. Open each level file in order
2. READ the explanations (they teach you the concepts)
3. Fill in the `# YOUR CODE HERE` sections
4. Run the file: `python level_XX_<name>.py`
5. If all checks pass, you level up!
6. Stuck? Each file has HINTS you can uncomment

## Setup:
```bash
cd pytorch-netflix-quest
pip install torch pandas numpy scikit-learn matplotlib
python setup_data.py  # Downloads the MovieLens dataset
```
