from sklearn.pipeline import Pipeline
from scipy.interpolate import interp1d
from scipy.interpolate import UnivariateSpline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import TruncatedSVD
from sklearn import metrics
import nltk
from nltk.stem.porter import PorterStemmer
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.multiclass import OneVsRestClassifier
from sklearn.multiclass import OneVsOneClassifier
from sklearn.metrics import accuracy_score
from sklearn import preprocessing
import numpy as np
from speeches import *


stemmer = PorterStemmer()
def smoothListGaussian(list,degree=5):  

     window=degree*2-1  
     weight=np.array([1.0]*window)  
     weightGauss=[]  
     for i in range(window):  
         i=i-degree+1  
         frac=i/float(window)  
         gauss=1/(np.exp((4*(frac))**2))  
         weightGauss.append(gauss)  
     weight=np.array(weightGauss)*weight  
     smoothed=[0.0]*(len(list)-window)  
     for i in range(len(list)):  
         smoothed[i]=sum(np.array(list[i:i+window])*weight)/sum(weight)  
     return smoothed  

def stem_tokens(tokens, stemmer):
    stemmed = []
    for item in tokens:
	stemmed_item = stemmer.stem(item)
	newstring = ""
	for each_letter in stemmed_item:
		if each_letter.isalpha():
			newstring +=each_letter
	if len(newstring) > 1:
        	stemmed.append(newstring)
    return stemmed

def tokenize(text):
    tokens = nltk.word_tokenize(text)
    stems = stem_tokens(tokens, stemmer)
    return stems

class Machine:

	def get_data(self, data_type='trial'):
		x_train = []
		y_train = []
		with open('./datasets/'+data_type+'/affectivetext_'+data_type+'.emotions.simple', 'r') as f:
			for line in f:
				line_split = line.split(' ')
				y_train.append(line_split[1].rstrip())
		with open('./datasets/'+data_type+'/affectivetext_'+data_type, 'r') as x:
			for line in x:
				line_split = line.split(' ')
				x_train.append(' '.join(line_split[1:]).rstrip())
		return x_train, y_train 

	def make_svm(self): #Trains the SVM
		x, y = self.get_data()
		x_t, y_t = self.get_data('test')

		everybody = np.array(x+x_t+kennedy+lincoln+lannister+king)
		everybody_y = y+y_t+kennedy_y+lincoln_y+lannister_y+king_y

		classifier = Pipeline([
			#('vectorizer', CountVectorizer(analyzer='word',strip_accents='unicode', stop_words='english', binary=True )),
    			('tfidf', TfidfVectorizer(min_df=2, strip_accents='unicode', stop_words='english', tokenizer=tokenize, token_pattern=r'\w{1,}', binary=True, sublinear_tf=1, analyzer='word')),
    			#('scaler', StandardScaler(with_mean=False)),
    			#('reduce', TruncatedSVD(n_components=15)),
    			#('tfidf', TfidfTransformer()),
    			('clf', MultinomialNB())])

		self.classifier = classifier.fit(everybody, everybody_y)
	
	def predict(self, vector):
		return self.classifier.predict(vector)

	def get_probs(self, vector):
		list_ang = []
		list_dis = []
		list_fear = []
		list_hope = []
		list_sad = []
		list_surp = []
		probabilities = self.classifier.predict_proba(vector)
		for item in probabilities:
			list_ang.append(item[0])
			list_dis.append(item[1])
			list_fear.append(item[2])
			list_hope.append(item[3])		
			list_sad.append(item[4])
			list_surp.append(item[5])
		'''
		list_ang = smoothListGaussian(list_ang)	
		list_dis = smoothListGaussian(list_dis)	
		list_fear = smoothListGaussian(list_fear)	
		list_hope = smoothListGaussian(list_hope)	
		list_sad = smoothListGaussian(list_sad)	
		list_surp = smoothListGaussian(list_surp)	
		list_ang = interp1d(np.arange(len(list_ang)), list_ang, kind='cubic')

		list_dis = interp1d(np.arange(len(list_dis), list_dis))
		list_fear = interp1d(np.arange(len(list_ang), list_fear))
		list_hope = interp1d(np.arange(len(list_ang), list_hope))
		list_sad = interp1d(np.arange(len(list_ang), list_sad))
		list_surp = interp1d(np.arange(len(list_ang), list_surp))
		new_probs = []
		for i in range(0, len(list_ang)):
			new_probs.append([list_ang[i], list_dis[i], list_fear[i], list_hope[i], list_sad[i], list_surp[i]])
		'''	
		for item in probabilities:
			item[3] = item[3] - .1 #Arbitrary "hope" de-scale
		#return new_probs
		return probabilities
			
if __name__ == "__main__": 
    man = Machine() 
    man.make_svm()
    print accuracy_score(man.predict(lincoln), lincoln_y)
    print accuracy_score(man.predict(lannister), lannister_y)
    print accuracy_score(man.predict(king), king_y)
    print accuracy_score(man.predict(kennedy), kennedy_y)
