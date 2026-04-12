import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report
from imblearn.over_sampling import SMOTE
import pickle

# Load dataset
df = pd.read_csv('diabetes.csv')

# --- Feature Engineering ---
# 1. Replace 0s with NaN and fill
cols_with_missing = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
for col in cols_with_missing:
    df[col] = df[col].replace(0, np.nan)
    df[col] = df[col].fillna(df[col].median())

# 2. Key Interaction Features
# Glucose * Insulin (High glucose and high insulin is bad)
df['Glucose_Insulin'] = df['Glucose'] * df['Insulin']
# BMI * SkinThickness (Body fat indicator)
df['BMI_Skin'] = df['BMI'] * df['SkinThickness']

# 3. Categorical Bucketing (Simple)
# BMI Categories: Underweight(0), Normal(1), Overweight(2), Obese(3)
# Note: Using standard ranges <18.5, 18.5-25, 25-30, >30
def bmi_cat(x):
    if x < 18.5: return 0
    elif x < 25: return 1
    elif x < 30: return 2
    else: return 3
df['BMI_Cat'] = df['BMI'].apply(bmi_cat)

# Age Categories: Young(0), Middle(1), Senior(2)
def age_cat(x):
    if x < 25: return 0 # High risk for Type 1 usually but data is limited
    elif x < 45: return 1
    else: return 2
df['Age_Cat'] = df['Age'].apply(age_cat)


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

# --- Ensemble Model ---
# Individual strong models
clf1 = LogisticRegression(random_state=1)
clf2 = RandomForestClassifier(n_estimators=200, random_state=1)
clf3 = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=1)
clf4 = SVC(probability=True, random_state=1)

print("Training Ensemble Voting Classifier...")
eclf1 = VotingClassifier(estimators=[
        ('lr', clf1), ('rf', clf2), ('gb', clf3), ('svm', clf4)], voting='soft')

eclf1 = eclf1.fit(X_train_resampled, y_train_resampled)
y_pred = eclf1.predict(X_test_scaled)

acc = accuracy_score(y_test, y_pred)
print(f"\nEnsemble Accuracy: {acc:.4f}")
print(classification_report(y_test, y_pred))

# Save results
with open('results_v4.txt', 'w', encoding='utf-8') as f:
    f.write(f"Training Results (Feature Engineering + Ensemble):\n")
    f.write(f"Ensemble Accuracy: {acc:.4f}\n")
    f.write(classification_report(y_test, y_pred))

# Save model if good
if acc > 0.70: # Standard sanity check, though we want 90
    print("Saving ensemble model and scaler...")
    with open('best_model_ensemble.pkl', 'wb') as f:
        pickle.dump(eclf1, f)
    with open('scaler_ensemble.pkl', 'wb') as f:
        pickle.dump(scaler, f)
    print("Saved successfully.")
