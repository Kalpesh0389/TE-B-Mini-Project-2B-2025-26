import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, classification_report
from imblearn.over_sampling import SMOTE
import pickle

# Load dataset
df = pd.read_csv('diabetes.csv')

# Preprocessing
cols_with_missing = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
for col in cols_with_missing:
    df[col] = df[col].replace(0, np.nan)
    df[col] = df[col].fillna(df[col].median())

X = df.drop('Outcome', axis=1)
y = df['Outcome']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Apply SMOTE
print("Applying SMOTE...")
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train_scaled, y_train)

# Models and Hyperparameters
models = {
    "Random Forest": {
        "model": RandomForestClassifier(random_state=42),
        "params": {
            'n_estimators': [100, 200, 300],
            'max_depth': [None, 10, 20, 30],
            'min_samples_split': [2, 5, 10],
            'min_samples_leaf': [1, 2, 4]
        }
    },
    "XGBoost": {
        "model": XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42),
        "params": {
            'n_estimators': [100, 200, 300],
            'learning_rate': [0.01, 0.1, 0.2],
            'max_depth': [3, 5, 7],
            'subsample': [0.8, 1.0],
            'colsample_bytree': [0.8, 1.0]
        }
    }
}

best_model = None
best_accuracy = 0
best_model_name = ""
results = {}

print("Tuning models...")

for name, model_info in models.items():
    print(f"Grid Search for {name}...")
    grid_search = GridSearchCV(estimator=model_info['model'], param_grid=model_info['params'], 
                               cv=3, n_jobs=1, verbose=2, scoring='accuracy')
    grid_search.fit(X_train_resampled, y_train_resampled)
    
    best_estimator = grid_search.best_estimator_
    y_pred = best_estimator.predict(X_test_scaled)
    acc = accuracy_score(y_test, y_pred)
    
    results[name] = acc
    print(f"\n{name} Best Params: {grid_search.best_params_}")
    print(f"{name} Test Accuracy: {acc:.4f}")
    print(classification_report(y_test, y_pred))
    
    if acc > best_accuracy:
        best_accuracy = acc
        best_model = best_estimator
        best_model_name = name

# Save results
with open('results_v2.txt', 'w', encoding='utf-8') as f:
    f.write(f"Training Results (with SMOTE and Tuning):\n")
    for name, acc in results.items():
        f.write(f"{name}: {acc:.4f}\n")
    f.write(f"\nBest Model: {best_model_name} with Accuracy: {best_accuracy:.4f}\n")

if best_model:
    print(f"Saving best model ({best_model_name}) and scaler...")
    # Use generic name for app compatibility later, or update app
    # For now saving as specific name can help track
    with open('best_model_tuned.pkl', 'wb') as f:
        pickle.dump(best_model, f)
    with open('scaler_tuned.pkl', 'wb') as f:
        pickle.dump(scaler, f)
    print("Saved successfully.")
