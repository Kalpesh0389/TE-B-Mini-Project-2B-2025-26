import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression
import os

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

output_dir = os.path.join("client", "src", "assets", "graphs")
os.makedirs(output_dir, exist_ok=True)

# Function to plot and save
def save_logistic_plot(feature_name, label_name, filename):
    plt.figure(figsize=(10, 6))
    
    # Create range
    x_range = np.linspace(X[feature_name].min(), X[feature_name].max(), 300)
    
    # Create dataframe with mean values
    X_mean = pd.DataFrame(
        np.tile(X.mean().values, (300, 1)),
        columns=X.columns
    )
    
    # Replace only feature column
    X_mean[feature_name] = x_range
    
    # Predict probabilities
    y_prob = model.predict_proba(X_mean)[:, 1]
    
    # Plot sigmoid curve
    plt.plot(x_range, y_prob, label="Logistic Curve")
    
    # Scatter actual data
    plt.scatter(X[feature_name], y, alpha=0.3, label="Actual Data")
    
    plt.xlabel(f"{label_name} ({feature_name})")
    plt.ylabel("Probability of Diabetes")
    plt.title(f"Logistic Regression Curve - {label_name} vs Diabetes")
    
    plt.legend()
    
    output_path = os.path.join(output_dir, filename)
    plt.savefig(output_path, format='svg')
    print(f"Saved {output_path}")
    plt.close()

# 1. Cholesterol
save_logistic_plot("chol", "Cholesterol", "logistic_regression.svg")

# 2. Glucose
save_logistic_plot("stab.glu", "Glucose", "logistic_glucose.svg")

# 3. Age
save_logistic_plot("age", "Age", "logistic_age.svg")
