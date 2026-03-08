from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import os
import time

app = Flask(__name__)
CORS(app)

# List of models to load
MODEL_NAMES = [
    "Logistic Regression", "KNN", "Random Forest", "Decision Tree", 
    "Linear SVM", "RBF SVM", "Ridge Classifier", "Gaussian Naive Bayes"
]

models = {}
MODEL_DIR = os.path.dirname(__file__)

def load_models():
    for name in MODEL_NAMES:
        safe_name = name.lower().replace(" ", "_")
        model_path = os.path.join(MODEL_DIR, f"model_{safe_name}.joblib")
        if os.path.exists(model_path):
            models[name] = joblib.load(model_path)
            print(f"✅ Model '{name}' loaded successfully.")
        else:
            print(f"⚠️ Warning: Model file for '{name}' not found at {model_path}.")

# Load all models at startup
load_models()

def preprocess_input(data):
    """
    Maps frontend input strings to numerical values used in model training.
    """
    # 1. Gender: Male -> 0, Female -> 1
    gender = 1 if data.get('gender') == 'Female' else 0
    
    # 2. Age Range Mapping
    age_map = {'18-34': 0.0, '35-50': 0.33, '51-64': 0.66, '65+': 1.0}
    age = age_map.get(data.get('age'), 0.0)
    
    # 3. BP Readings (Refined to match research data distribution)
    # Research scale: 0.0->Normal, 0.33->Stage1, 0.66->Stage2, 1.0->Crisis
    sys_map = {
        '100 - 110': 0.1,  # Normal range entry
        '111 - 120': 0.33, # Matches Stage-1 training
        '121 - 130': 0.66, # Matches Stage-2 training
        '130+': 1.0       # Matches Crisis training
    }
    dia_map = {
        '70 - 80': 0.1,   # Normal range entry
        '81 - 90': 0.33,  # Matches Stage-1 training
        '91 - 100': 0.66, # Matches Stage-2 training
        '100+': 1.0       # Matches Crisis training
    }
    sys = sys_map.get(data.get('systolic'), 0.0)
    dia = dia_map.get(data.get('diastolic'), 0.0)
    
    # 4. Severity Assessment
    sev_map = {'Mild': 0.0, 'Moderate': 0.5, 'Sever': 1.0}
    severity = sev_map.get(data.get('severity'), 0.0)
    
    # 5. Time Since Diagnosis
    diag_map = {'<1 Year': 0.0, '1 - 5 Years': 0.5, '>5 Years': 1.0}
    when_diag = diag_map.get(data.get('whenDiagnosed'), 0.0)
    
    # 6. Booleans
    booleans = [
        data.get('history'), data.get('takeMedication'), data.get('breathShortness'),
        data.get('visualChanges'), data.get('noseBleeding'), data.get('controlledDiet')
    ]
    bool_vals = [1 if b else 0 for b in booleans]
    
    # Feature Order: Gender, Age, History, TakeMedication, Severity, BreathShortness, VisualChanges, NoseBleeding, Whendiagnoused, Systolic, Diastolic, ControlledDiet
    features = [
        gender, age, bool_vals[0], bool_vals[1], severity, bool_vals[2], 
        bool_vals[3], bool_vals[4], when_diag, sys, dia, bool_vals[5]
    ]
    
    return np.array([features])

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        time.sleep(1.2) # UI Experience delay
        features_vec = preprocess_input(data)
        
        comparison_results = []
        votes = []
        
        stage_names = {
            0: 'Normal',
            1: 'Hypertension (Stage-1)',
            2: 'Hypertension (Stage-2)',
            3: 'Hypertensive Crisis'
        }

        for name, model in models.items():
            pred = int(model.predict(features_vec)[0])
            votes.append(pred)
            
            # Confidence calculation (if model supports it)
            conf = 1.0
            if hasattr(model, "predict_proba"):
                probs = model.predict_proba(features_vec)[0]
                conf = round(float(probs[pred]), 2)
            
            comparison_results.append({
                'model': name,
                'prediction': stage_names.get(pred, 'Unknown'),
                'level': pred,
                'confidence': conf
            })
            
        # Overall Result (Majority Vote)
        if votes:
            consensus_level = max(set(votes), key=votes.count)
            
            # Color and Stage for UI
            stage_meta = {
                0: {'stage': 'NORMAL', 'level': 0, 'color': 'var(--status-normal)'},
                1: {'stage': 'HYPERTENSION (Stage-1)', 'level': 1, 'color': 'var(--status-stage1)'},
                2: {'stage': 'HYPERTENSION (Stage-2)', 'level': 2, 'color': 'var(--status-stage2)'},
                3: {'stage': 'HYPERTENSIVE CRISIS', 'level': 3, 'color': 'var(--status-crisis)'}
            }
            
            final_result = stage_meta.get(consensus_level, stage_meta[0])
            
            # Weighted average confidence for the consensus class
            consensus_conf = round(np.mean([r['confidence'] for r in comparison_results if r['level'] == consensus_level]), 2)
            
            return jsonify({
                **final_result,
                'confidence': consensus_conf,
                'comparison': comparison_results
            }), 200
        else:
            return jsonify({'error': 'No models available for prediction'}), 500

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
