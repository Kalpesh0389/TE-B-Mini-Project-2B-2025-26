import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report
import pickle

# Load Dataset
print("Loading Vanderbilt dataset...")
data = pd.read_csv('diabetes_vanderbilt_processed.csv')

# Separate Features and Target
X = data.drop(['id', 'Diabetes'], axis=1)  # ID is not predictive
y = data['Diabetes']

# Split Data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Define Pipeline with Logistic Regression
pipeline = Pipeline([
    ('scaler', StandardScaler()),  # Important for Logistic Regression
    ('classifier', LogisticRegression(
        max_iter=1000,
        random_state=42
    ))
])

print("Training Logistic Regression Model...")
pipeline.fit(X_train, y_train)

# Evaluate Model
y_pred = pipeline.predict(X_test)
acc = accuracy_score(y_test, y_pred)

print(f"Final Model Accuracy: {acc:.4f}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Save Model
with open('diab_vanderbilt_logistic.pkl', 'wb') as f_out:
    pickle.dump(pipeline, f_out)

print("Model saved to 'diab_vanderbilt_logistic.pkl'")