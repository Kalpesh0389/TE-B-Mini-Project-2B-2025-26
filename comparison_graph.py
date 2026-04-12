import matplotlib.pyplot as plt
import numpy as np
import os

# Data
models = ['Logistic Regression', 'Random Forest', 'Decision Tree', 'Naive Bayes', 'KNN']
metrics = ['Accuracy', 'Precision', 'Recall', 'F1-Score']

# Scores from AnalysisReport.jsx
scores = {
    'Accuracy': [0.97, 0.95, 0.88, 0.92, 0.92],
    'Precision': [1.00, 0.89, 0.56, 0.69, 1.00],
    'Recall': [0.82, 0.73, 0.82, 0.82, 0.45],
    'F1-Score': [0.90, 0.80, 0.67, 0.75, 0.62]
}

x = np.arange(len(models))  # the label locations
width = 0.2  # the width of the bars

fig, ax = plt.subplots(figsize=(14, 8))

# Plot bars
rects1 = ax.bar(x - 1.5*width, scores['Accuracy'], width, label='Accuracy', color='#0d6efd')
rects2 = ax.bar(x - 0.5*width, scores['Precision'], width, label='Precision', color='#ffc107')
rects3 = ax.bar(x + 0.5*width, scores['Recall'], width, label='Recall', color='#198754')
rects4 = ax.bar(x + 1.5*width, scores['F1-Score'], width, label='F1-Score', color='#d63384')

# Add some text for labels, title and custom x-axis tick labels, etc.
ax.set_ylabel('Scores')
ax.set_title('Comparison of Machine Learning Models Performance')
ax.set_xticks(x)
ax.set_xticklabels(models)
ax.set_ylim(0, 1.1)
ax.legend(loc='upper center', bbox_to_anchor=(0.5, -0.05), ncol=4)

# Function to add labels on top of bars
def autolabel(rects):
    for rect in rects:
        height = rect.get_height()
        ax.annotate(f'{height:.2f}',
                    xy=(rect.get_x() + rect.get_width() / 2, height),
                    xytext=(0, 3),  # 3 points vertical offset
                    textcoords="offset points",
                    ha='center', va='bottom', fontsize=9)

autolabel(rects1)
autolabel(rects2)
autolabel(rects3)
autolabel(rects4)

fig.tight_layout()

plt.show()
