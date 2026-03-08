import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns 

data =pd.read_csv('patient_data.csv')

plt.figure(figsize=(8,4))
sns.countplot(data=data, x="Gender", palette="Set2")
plt.title("Gender Distribution")
plt.show()

data['Gender'].value_counts().plot.pie(autopct='%1.1f%%', figsize=(5,5), colors=['#66b3ff','#99ff99'])
plt.title("Gender Distribution (Pie Chart)")
plt.ylabel("")
plt.show()

plt.figure(figsize=(8,4))
sns.countplot(data=data, x="Stages", palette="coolwarm")
plt.title("Hypertension Stages Distribution")
plt.xticks(rotation=30)
plt.show()


def range_to_midpoint(val):
    if "-" in val:
        start, end = val.split("-")
        return (int(start.strip()) + int(end.strip()))/2
    elif "+" in val:
        return int(val.replace("+","").strip())
    else:
        return np.nan

data['Systolic_num']  = data['Systolic'].apply(range_to_midpoint)
data['Diastolic_num'] = data['Diastolic'].apply(range_to_midpoint)

plt.figure(figsize=(6,4))
sns.heatmap(data[['Systolic_num','Diastolic_num']].corr(), annot=True, cmap="Blues")
plt.title("Correlation between Systolic & Diastolic")
plt.show()

# Relationship: TakeMedication vs Severity
plt.figure(figsize=(8,5))
sns.countplot(data=data, x="TakeMedication", hue="Severity", palette="Set1")
plt.title("TakeMedication vs Severity")
plt.show()

# Age group vs Stages

plot_data = pd.read_csv('patient_data.csv')

# Create numeric columns for the pairplot
plot_data['Systolic_num']  = plot_data['Systolic'].map({'100 - 110': 105, '111 - 120': 115, '121 - 130': 125, '130+': 135})
plot_data['Diastolic_num'] = plot_data['Diastolic'].map({'70 - 80': 75, '81 - 90': 85, '91 - 100': 95, '100+': 105})

sns.pairplot(data=plot_data, 
             vars=['Systolic_num', 'Diastolic_num'],
             hue='Stages',
             palette={'HYPERTENSION (Stage-1)': '#F4A7B9',
                      'HYPERTENSION (Stage-2)': '#8B8B00',
                      'HYPERTENSIVE CRISIS':    '#2E8B8B',
                      'NORMAL':                 '#B0A0D0'},
             plot_kws={'alpha': 0.7},
             diag_kind='kde')

plt.suptitle("Pairplot: Systolic vs Diastolic across Stages", y=1.02)

plt.show()
