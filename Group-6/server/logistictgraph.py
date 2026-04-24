import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression

# =========================
# Load Dataset
# =========================
data = pd.read_csv("diabetes_vanderbilt_processed.csv")

# Define features and target
X = data.drop("Diabetes", axis=1)
y = data["Diabetes"]

# Train model
model = LogisticRegression(max_iter=1000)
model.fit(X, y)

# =========================
# Plot for Cholesterol (chol)
# =========================

feature = "chol"

plt.figure(figsize=(10, 6))

# Create range for cholesterol
x_range = np.linspace(X[feature].min(), X[feature].max(), 300)

# Create dataframe with mean values
X_mean = pd.DataFrame(
    np.tile(X.mean().values, (300, 1)),
    columns=X.columns
)

# Replace only cholesterol column
X_mean[feature] = x_range

# Predict probabilities
y_prob = model.predict_proba(X_mean)[:, 1]

# Plot sigmoid curve
plt.plot(x_range, y_prob, label="Logistic Curve")

# Scatter actual data
plt.scatter(X[feature], y, alpha=0.3, label="Actual Data")

plt.xlabel("Cholesterol (chol)")
plt.ylabel("Probability of Diabetes")
plt.title("Logistic Regression Curve - Cholesterol vs Diabetes")

plt.legend()
plt.show()

# =========================
# Plot for Glucose (stab.glu)
# =========================
feature_glu = "stab.glu"

plt.figure(figsize=(10, 6))

# Create range for glucose
x_range_glu = np.linspace(X[feature_glu].min(), X[feature_glu].max(), 300)

# Create dataframe with mean values (reuse mean values)
X_mean_glu = pd.DataFrame(
    np.tile(X.mean().values, (300, 1)),
    columns=X.columns
)

# Replace only glucose column
X_mean_glu[feature_glu] = x_range_glu

# Predict probabilities
y_prob_glu = model.predict_proba(X_mean_glu)[:, 1]

# Plot sigmoid curve
plt.plot(x_range_glu, y_prob_glu, label="Logistic Curve")

# Scatter actual data
plt.scatter(X[feature_glu], y, alpha=0.3, label="Actual Data")

plt.xlabel("Glucose (stab.glu)")
plt.ylabel("Probability of Diabetes")
plt.title("Logistic Regression Curve - Glucose vs Diabetes")

plt.legend()
plt.show()

# =========================
# Plot for Age (age)
# =========================
feature_age = "age"

plt.figure(figsize=(10, 6))

# Create range for age
x_range_age = np.linspace(X[feature_age].min(), X[feature_age].max(), 300)

# Create dataframe with mean values (reuse mean values)
X_mean_age = pd.DataFrame(
    np.tile(X.mean().values, (300, 1)),
    columns=X.columns
)

# Replace only age column
X_mean_age[feature_age] = x_range_age

# Predict probabilities
y_prob_age = model.predict_proba(X_mean_age)[:, 1]

# Plot sigmoid curve
plt.plot(x_range_age, y_prob_age, label="Logistic Curve")

# Scatter actual data
plt.scatter(X[feature_age], y, alpha=0.3, label="Actual Data")

plt.xlabel("Age (age)")
plt.ylabel("Probability of Diabetes")
plt.title("Logistic Regression Curve - Age vs Diabetes")

plt.legend()
plt.show()
