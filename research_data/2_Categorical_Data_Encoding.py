import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns 
from sklearn.preprocessing import MinMaxScaler

data =pd.read_csv('patient_data.csv')

nominal_features=['Gender','History', 'Patient', 'TakeMedication','BreathShortness', 'VisualChanges', 'NoseBleeding','ControlledDiet',]
ordinal_features=[f for f in data.columns if f not in nominal_features]
ordinal_features.remove('Stages')
print(nominal_features)
print(ordinal_features)

for col in nominal_features:
    if set(data[col].unique()) == set(['Yes','No']):
        data[col] = data[col].map({'No':0, 'Yes':1})
    elif col == 'Gender':
        data[col] = data[col].map({'Male':0, 'Female':1})

data['Age'] = data['Age'].map({'18-34':1, '35-50':2, '51-64':3, '65+':4})
data['Severity'] = data['Severity'].map({'Mild': 0, 'Moderate': 1, 'Sever': 2})
data['Whendiagnoused'] = data['Whendiagnoused'].map({'<1 Year':1, '1 - 5 Years':2, '>5 Years':3})
data['Systolic'] = data['Systolic'].map({'100 - 110': 0,'111 - 120': 1,'121 - 130': 2,'130+': 3})
data['Diastolic'] = data['Diastolic'].map({'70 - 80': 0,'81 - 90': 1,'91 - 100': 2,'100+': 3})
data['Stages'] = data['Stages'].map({'NORMAL':0,'HYPERTENSION (Stage-1)':1,'HYPERTENSION (Stage-2)':2,'HYPERTENSIVE CRISIS':3})



scaler = MinMaxScaler()
data[ordinal_features] = scaler.fit_transform(data[ordinal_features])

data.to_csv('patient_data.csv', index=False)
