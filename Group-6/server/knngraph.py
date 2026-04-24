import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler

# =========================
# Load Dataset
# =========================
data = pd.read_csv("diabetes_vanderbilt_processed.csv")

# Select two features
X = data[["stab.glu", "BMI_Calc"]]
y = data["Diabetes"]

# =========================
# Feature Scaling (Very Important for KNN)
# =========================
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# =========================
# Train KNN Model
# =========================
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_scaled, y)

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
Z = knn.predict(grid)
Z = Z.reshape(xx.shape)

# =========================
# Plot
# =========================
plt.figure(figsize=(10, 6))

# Decision regions
plt.contourf(xx, yy, Z, alpha=0.3)

# Plot actual data points
scatter = plt.scatter(
    X_scaled[:, 0],
    X_scaled[:, 1],
    c=y,
    edgecolor='k',
    s=60
)

plt.xlabel("Glucose Level (stab.glu)")
plt.ylabel("BMI")
plt.title("KNN Decision Boundary (K=5) - Diabetes Prediction")

# Proper legend
handles, _ = scatter.legend_elements()
plt.legend(handles, ["Non-Diabetic", "Diabetic"])

plt.tight_layout()
plt.show()
