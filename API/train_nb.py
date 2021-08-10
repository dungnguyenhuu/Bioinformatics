from preprocessing import *
import sklearn
from sklearn import svm
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import train_test_split
from sklearn.model_selection import RepeatedStratifiedKFold
from sklearn.model_selection import GridSearchCV
import pickle

# Input
Xp,ids=prot_feats('./dataset/Training_Positive_Original_488.fasta')
Xn,ids=prot_feats('./dataset/Training_Negative_902.fasta')
yp=np.array([1]*Xp.shape[0])
yn=np.array([-1]*Xn.shape[0])

X = np.concatenate((Xp, Xn))
y = np.concatenate((yp, yn))

## Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=.3, random_state=1)

## Tuning Hyperparameters
# param_grid = {'C': [0.1, 1, 10, 100], 'gamma': [1,0.1,0.01,0.001],'kernel': ['rbf', 'poly', 'sigmoid']}
# grid = dict(C=param_grid['C'], gamma = param_grid['gamma'], kernel = param_grid['kernel'])

# cv = RepeatedStratifiedKFold(n_splits=10, n_repeats=1, random_state=1)
# grid_search = GridSearchCV(estimator=SVC(), param_grid=grid, n_jobs=-1, cv=cv, scoring='precision', error_score=0)
# grid_result = grid_search.fit(X_train, y_train)

# print("Best: %f using %s" % (grid_result.best_score_, grid_result.best_params_))
# means = grid_result.cv_results_['mean_test_score']
# stds = grid_result.cv_results_['std_test_score']
# params = grid_result.cv_results_['params']
# for mean, stdev, param in zip(means, stds, params):
#     print("%f (%f) with: %r" % (mean, stdev, param))

# Training
model = GaussianNB()
model.fit(X_train, y_train)
pickle.dump(model, open('./model/svc_nb.pickle', 'wb'))

print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)
y_pred = model.predict(X_test)

# Evalauate
from sklearn.metrics import confusion_matrix, plot_confusion_matrix
import matplotlib.pyplot as plt 
cm = confusion_matrix(y_test, y_pred)
print(cm)
tn, fp, fn, tp = cm.ravel()
print(tn, fp, fn, tp)

print('Sensitivity = ', tp/(tp+fn))
print('Specificity = ', tp/(tp+fp))
print('Accuracy = ', (tp+tn)/(tp+fp+tn+fn))
print('F-value = ', 2*tp/(2*tp+fp+fn))

print(sklearn.metrics.accuracy_score(y_test, y_pred))
print(sklearn.metrics.precision_score(y_test, y_pred))
print(sklearn.metrics.recall_score(y_test, y_pred))
print(sklearn.metrics.f1_score(y_test, y_pred), end='\n\n')

## Evaluate by CV
# from sklearn.model_selection import KFold, RepeatedStratifiedKFold, cross_val_score
# cv = RepeatedStratifiedKFold(n_splits=5, n_repeats=5, random_state=2)
# scores = cross_val_score(estimator=SVC(), X, y, scoring='accuracy', cv=cv, n_jobs=-1)
# for score in scores:
#     print('Accuracy: %.3f' % score)
# print('Mean: %.3f, Std: %.3f' % (np.mean(scores), np.std(scores)))