import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import StandardScaler

# =========================
# Load Dataset
# =========================
data = pd.read_csv("diabetes_vanderbilt_processed.csv")

# Select two features
X = data[["stab.glu", "BMI_Calc"]]
y = data["Diabetes"]

# =========================
# Feature Scaling
# =========================
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# =========================
# Train Naive Bayes Model
# =========================
nb = GaussianNB()
nb.fit(X_scaled, y)

# =========================
# Create Mesh Grid
# =========================
x_min, x_max = X_scaled[:, 0].min() - 1, X_scaled[:, 0].max() + 1
y_min, y_max = X_scaled[:, 1].min() - 1, X_scaled[:, 1].max() + 1

xx, yy = np.meshgrid(
    np.arange(x_min, x_max, 0.02),
    np.arange(y_min, y_max, 0.02)
)

# Predict on grid
grid = np.c_[xx.ravel(), yy.ravel()]
Z = nb.predict(grid)
Z = Z.reshape(xx.shape)

# =========================
# Plot
# =========================
plt.figure(figsize=(10, 6))

# Decision boundary
plt.contourf(xx, yy, Z, alpha=0.3)

# Scatter actual points
scatter = plt.scatter(
    X_scaled[:, 0],
    X_scaled[:, 1],
    c=y,
    edgecolor='k',
    s=60
)

plt.xlabel("Glucose Level (stab.glu)")
plt.ylabel("BMI")
plt.title("Naive Bayes Decision Boundary - Diabetes Prediction")

# Proper legend
handles, _ = scatter.legend_elements()
plt.legend(handles, ["Non-Diabetic", "Diabetic"])

plt.tight_layout()
plt.show()
