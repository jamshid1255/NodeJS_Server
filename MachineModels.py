import sys


# print("Hello")
# print("Hello",str(sys.argv[1]))
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


col = [ 'Class_Name','Left_weight','Left_distance','Right_weight','Right_distance']
df = pd.read_csv('dataaaa.csv')
# print(df.head())
# df.info()
# sns.countplot(x=df['Class_Name'])
# sns.countplot(x=df.Class_Name,hue=df['Class_Name'])
# sns.countplot(x=df['Right_weight'],hue=df['Class_Name'])

from sklearn.model_selection import train_test_split
X = df.drop('Class_Name',axis=1)
y = df[['Class_Name']]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3,random_state=42)

from sklearn.tree import DecisionTreeClassifier
clf_model = DecisionTreeClassifier(criterion="gini", random_state=42,max_depth=3, min_samples_leaf=5)   
clf_model.fit(X_train,y_train)
y_predict = clf_model.predict(X_test)

from sklearn.metrics import accuracy_score,classification_report,confusion_matrix
print(accuracy_score(y_test,y_predict))