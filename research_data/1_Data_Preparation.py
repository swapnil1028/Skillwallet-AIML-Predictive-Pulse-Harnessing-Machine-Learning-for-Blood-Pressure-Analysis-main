import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns 
from sklearn.preprocessing import MinMaxScaler

data =pd.read_csv('patient_data_processed.csv')
data.head()

data.isnull().sum()

data.rename(columns={'C':"Gender"},inplace=True)
data.to_csv('patient_data.csv', index=False)

data['TakeMedication'] = data['TakeMedication'].replace({'Yes ': 'Yes'})
data['NoseBleeding']   = data['NoseBleeding'].replace({'No ': 'No'})
data['Systolic']       = data['Systolic'].replace({'121- 130': '121 - 130'})
data['Systolic']       = data['Systolic'].replace({'100+': '100 - 110'})
data['Stages']         = data['Stages'].replace({'HYPERTENSION (Stage-2).': 'HYPERTENSION (Stage-2)'})
data['Stages']         = data['Stages'].replace({'HYPERTENSIVE CRISI': 'HYPERTENSIVE CRISIS'})
data['Diastolic']      = data['Diastolic'].replace({'130+': '100+'})
data.to_csv('patient_data.csv', index=False)

print((data['Diastolic'] == '130+').sum())
print((data['Diastolic'] == '100+').sum())
print(data.duplicated().sum())

data.to_csv('patient_data.csv', index=False)
