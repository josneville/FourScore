from flask import Flask, render_template, request
import json
from random import randint
from machine import Machine
app = Flask(__name__)

classifier = Machine() 
classifier.make_svm()


@app.route('/')
def main():
	return render_template('index.html')
   # return render_template('index.html') 

@app.route('/analyze')
def analyze():
    return render_template('index.html')

@app.route('/api/runAlgorithm', methods=['POST', 'GET'])
def run():
	if 'sentences' in request.json:
		# Get the JSON data from the form.
		sentences = request.json['sentences']
		entireData = json.loads(sentences)
		data = []
		for sentence in entireData:
			data.append(sentence['value'])
		probs = classifier.get_probs(data)
	else:
		return "sentences not given", 400
	returnJawn = []; #fill returnJawn[emotions] with random numberse from 0 to 5.
	to_return = {'emotions': probs.tolist()}
	return json.dumps(to_return),200

if __name__ == "__main__":
	app.debug=True
	app.run()
