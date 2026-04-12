import pickle as pkl
import os
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

script_dir = os.path.dirname(os.path.abspath(__file__))
# Loading the new ensemble model and scaler
scaler_path = os.path.join(script_dir, 'scaler_ensemble.pkl')
model_path = os.path.join(script_dir, 'best_model_ensemble.pkl')

if not os.path.exists(scaler_path) or not os.path.exists(model_path):
    print("Error: Model or Scaler file not found. Please run train_v4.py first.")
    # Fallback or exit? For now just print error.
else:
    scaler = pkl.load(open(scaler_path, 'rb'))
    with open(model_path, 'rb') as f:
        model = pkl.load(f)

# --- Feature Engineering Helper Functions ---
def bmi_cat(x):
    if x < 18.5: return 0
    elif x < 25: return 1
    elif x < 30: return 2
    else: return 3

def age_cat(x):
    if x < 25: return 0 
    elif x < 45: return 1
    else: return 2

def predict(Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, Bmi, Dpf, Age):
    # Create Base DataFrame with correct feature names
    # Note: Training used 'DiabetesPedigreeFunction' but input name is 'DPF'. 
    # train_v4 features: Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age
    
    data = {
        'Pregnancies': [Pregnancies],
        'Glucose': [Glucose],
        'BloodPressure': [BloodPressure],
        'SkinThickness': [SkinThickness],
        'Insulin': [Insulin],
        'BMI': [Bmi],
        'DiabetesPedigreeFunction': [Dpf],
        'Age': [Age]
    }
    input_df = pd.DataFrame(data)
    
    # --- Feature Engineering (Must match train_v4.py logic) ---
    input_df['Glucose_Insulin'] = input_df['Glucose'] * input_df['Insulin']
    input_df['BMI_Skin'] = input_df['BMI'] * input_df['SkinThickness']
    input_df['BMI_Cat'] = input_df['BMI'].apply(bmi_cat)
    input_df['Age_Cat'] = input_df['Age'].apply(age_cat)
    
    # Scale
    try:
        input_scaled = scaler.transform(input_df)
    except Exception as e:
        return {'error': f"Scaling failed: {str(e)}"}
    
    # Predict
    try:
        prediction_prob = model.predict_proba(input_scaled)[0] # [prob_0, prob_1]
        prob_0 = prediction_prob[0]
        prob_1 = prediction_prob[1]
    except Exception as e:
         return {'error': f"Prediction failed: {str(e)}"}
    
    # Heuristic breakdown logic (kept from original app.py but adapted)
    if prob_1 < 0.3:
        # Mostly Non-Diabetic
        non_diabetic = prob_0
        pre_diabetic = prob_1 * 0.7 
        type_2 = prob_1 * 0.3
    elif prob_1 < 0.7:
        # Pre-Diabetic zone
        non_diabetic = prob_0 * 0.5
        pre_diabetic = prob_1 + (prob_0 * 0.5) 
        if pre_diabetic > 0.8: pre_diabetic = 0.8 
        type_2 = 1 - non_diabetic - pre_diabetic
    else:
        # Diabetic zone
        non_diabetic = prob_0
        pre_diabetic = prob_1 * 0.4
        type_2 = prob_1 * 0.6
        
    total = non_diabetic + pre_diabetic + type_2
    p_non = (non_diabetic / total) * 100
    p_pre = (pre_diabetic / total) * 100
    p_type2 = (type_2 / total) * 100
    
    validation_score = 100
    if not (0 <= Age <= 100): validation_score -= 10
    if not (0 <= Glucose <= 250): validation_score -= 10
    
    confidence = max(p_non, p_pre, p_type2)
    
    label = "Non-Diabetic"
    if p_pre > p_non and p_pre > p_type2:
        label = "Pre-Diabetic"
    elif p_type2 > p_non and p_type2 > p_pre:
        label = "Type 2 Diabetic"
        
    main_msg = "Diabetes Detected" if label != "Non-Diabetic" else "Healthy"
    if label == "Non-Diabetic": main_msg = "Healthy"
    
    result = {
        'prediction': main_msg, 
        'diabetes_detected': bool(prob_1 > 0.5),
        'label': label,
        'confidence': f"{confidence:.2f}%",
        'validation_score': f"{validation_score}/100",
        'breakdown': {
            'Non-Diabetic': f"{p_non:.2f}%",
            'Pre-Diabetic': f"{p_pre:.2f}%",
            'Type 2 Diabetic': f"{p_type2:.2f}%"
        }
    }
    
    return result

@app.route('/predict', methods=['POST'])
def predictions():
    if request.method == 'POST':
        try:
            data = request.get_json()
            required_fields = ['Age', 'Pregnancies', 'Glucose', 'BloodPressure', 'Insulin', 'BMI', 'SkinThickness', 'DPF']
            input_values = {}
            for field in required_fields:
                value = data.get(field)
                if value is None or str(value).strip() == "":
                    raise ValueError(f"Missing or empty value for {field}")
                input_values[field] = float(value)
            
            # Prediction
            result = predict(
                input_values['Pregnancies'], 
                input_values['Glucose'], 
                input_values['BloodPressure'], 
                input_values['SkinThickness'], 
                input_values['Insulin'], 
                input_values['BMI'], 
                input_values['DPF'], 
                input_values['Age']
            )
            
            if 'error' in result:
                return jsonify(result), 500
                
            return jsonify(result)
        except (ValueError, TypeError) as e:
            return jsonify({'error': str(e)}), 400
        except Exception as e:
            return jsonify({'error': f"Internal Server Error: {str(e)}"}), 500
    
    return "Invalid request method"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)