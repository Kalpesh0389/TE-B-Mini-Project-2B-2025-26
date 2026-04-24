import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, classification_report
import pickle

# Load dataset
df = pd.read_csv('diabetes.csv')

# Preprocessing
# Replace 0 with NaN for columns where 0 is invalid
cols_with_missing = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
for col in cols_with_missing:
    df[col] = df[col].replace(0, np.nan)
    # Fill missing values with median
    df[col] = df[col].fillna(df[col].median())

X = df.drop('Outcome', axis=1)
y = df['Outcome']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Models
models = {
    "Logistic Regression": LogisticRegression(),
    "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
    "XGBoost": XGBClassifier(use_label_encoder=False, eval_metric='logloss'),
    "SVM": SVC(probability=True)
}

best_model = None
best_accuracy = 0
best_model_name = ""

results = {}

print("Training models...")
for name, model in models.items():
    model.fit(X_train_scaled, y_train)
    y_pred = model.predict(X_test_scaled)
    acc = accuracy_score(y_test, y_pred)
    results[name] = acc
    print(f"\n{name} Accuracy: {acc:.4f}")
    print(classification_report(y_test, y_pred))
    
    if acc > best_accuracy:
        best_accuracy = acc
        best_model = model
        best_model_name = name


# Save the best model and scaler
with open('results.txt', 'w', encoding='utf-8') as f:
    f.write(f"Training Results:\n")
    for name, acc in results.items():
        f.write(f"{name}: {acc:.4f}\n")
    f.write(f"\nBest Model: {best_model_name} with Accuracy: {best_accuracy:.4f}\n")

if best_model:
    print(f"Saving best model ({best_model_name}) and scaler...")
    with open('best_model.pkl', 'wb') as f:
        pickle.dump(best_model, f)
    with open('scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)
    print("Saved successfully.")

