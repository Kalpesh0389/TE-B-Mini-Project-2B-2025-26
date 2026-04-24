import pandas as pd
import matplotlib.pyplot as plt
from sklearn.tree import DecisionTreeClassifier, plot_tree

# =========================
# Load Dataset
# =========================
data = pd.read_csv("diabetes_vanderbilt_processed.csv")

# Optional: Drop ID column (recommended)
data = data.drop("id", axis=1)

# Define Features and Target
X = data.drop("Diabetes", axis=1)
y = data["Diabetes"]

# =========================
# Train Decision Tree
# =========================
model = DecisionTreeClassifier(
    max_depth=4,      # keeps tree readable
    random_state=42
)

model.fit(X, y)

# =========================
# Plot Decision Tree
# =========================
plt.figure(figsize=(20, 10))

plot_tree(
    model,
    feature_names=X.columns,
    class_names=["No Diabetes", "Diabetes"],
    filled=True,
    rounded=True,
    fontsize=10
)

plt.title("Decision Tree - Diabetes Dataset")
plt.show()
