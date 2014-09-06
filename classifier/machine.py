from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import TruncatedSVD
from sklearn.decomposition import PCA
from sklearn.preprocessing import Normalizer
from sklearn import metrics
from sklearn.cluster import KMeans, MiniBatchKMeans
import pandas as pd
import warnings
import nltk
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction import DictVectorizer
from sklearn import linear_model
from sklearn.naive_bayes import MultinomialNB
from sklearn.naive_bayes import BernoulliNB
from sklearn.naive_bayes import GaussianNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.svm import LinearSVC
from sklearn.svm import l1_min_c
from sklearn.svm import SVC
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.multiclass import OneVsRestClassifier
from sklearn.multiclass import OneVsOneClassifier
from sklearn.metrics import accuracy_score
from sklearn import preprocessing
import numpy as np

warnings.filterwarnings("ignore", category=DeprecationWarning, module="pandas", lineno=570) 
class Machine:
    def __init__(self):
        self.classifier, self.bin_labels = make_svm()

def get_data(data_type='trial'):
	x_train = []
	y_train = []
	with open('../datasets/'+data_type+'/affectivetext_'+data_type+'.emotions.simple', 'r') as f:
		for line in f:
			line_split = line.split(' ')
			y_train.append(line_split[1].rstrip())
	with open('../datasets/'+data_type+'/affectivetext_'+data_type, 'r') as x:
		for line in x:
			line_split = line.split(' ')
			x_train.append(' '.join(line_split[1:]).rstrip())
	return x_train, y_train 

                 
def make_svm(): #Trains the SVM
    X_train, y_train_text = get_data('trial')
 
 
    lb = preprocessing.LabelBinarizer()
    Y = lb.fit_transform(y_train_text) 
    classifier = Pipeline([
        ('vectorizer', CountVectorizer()),
        ('tfidf', TfidfTransformer()),
        ('clf', OneVsRestClassifier(LinearSVC()))])
 
    classifier.fit(X_train, Y) 
    return classifier, lb
 
if __name__ == "__main__": 
    man = Machine() 
    classifier, labelb = make_svm()
stemmer = PorterStemmer()


def stem_tokens(tokens, stemmer):
    stemmed = []
    for item in tokens:
	stemmed_item = stemmer.stem(item)
	if len(stemmed_item) > 1:
        	stemmed.append(stemmed_item)
    return stemmed

def tokenize(text):
    tokens = nltk.word_tokenize(text)
    stems = stem_tokens(tokens, stemmer)
    return stems


x_t, y_t = get_data()
x, y = get_data('test')

everybody = np.array(x+x_t)
everybody_y = y+y_t

X_train = np.array(x)
y_train = y 


gettysburg=["Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal","Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure", "We are met on a great battle-field of that war","We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live","It is altogether fitting and proper that we should do this","But, in a larger sense, we can not dedicate -- we can not consecrate -- we can not hallow -- this ground","The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract","The world will little note, nor long remember what we say here, but it can never forget what they did here","It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced","It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth"]

classifier = Pipeline([

    #('vectorizer', CountVectorizer(analyzer='word',strip_accents='unicode', stop_words='english', binary=True )),
    ('tfidf', TfidfVectorizer(min_df=4, tokenizer=tokenize, token_pattern=r'\w{1,}', binary=True, analyzer='word')),
    #('scaler', StandardScaler(with_mean=False)),
    #('reduce', TruncatedSVD(n_components=15)),
    #('tfidf', TfidfTransformer()),
    ('clf', MultinomialNB())])


classifier = classifier.fit(everybody, everybody_y)
predicted = classifier.predict(gettysburg)


for item, labels in zip(gettysburg, predicted):
	print '%s => %s\n' % (item, labels)

#print accuracy_score(predicted, y_t)
