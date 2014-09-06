from flask import Flask, render_template, request
import json
from random import randint
app = Flask(__name__)

@app.route('/')
def main():
	return render_template('index.html')
   # return render_template('index.html') 

@app.route('/analyze')
def analyze():
    return render_template('index.html')

@app.route('/api/runAlgorithm', methods=['POST'])
def run():
	if 'sentences' in request.form:
		# Get the JSON data from the form.
		sentences = request.form['sentences']
		data = json.loads(sentences)
	else:
		return "sentences not found",400
	try:
		returnJawn = json.loads('{"emotions":[]}') #fill returnJawn[emotions] with random numberse from 0 to 5.
		for sentence in data: 
			returnJawn['emotions'].append(randint(0,5))
		return json.dumps(returnJawn)
	except:
		return "Fail for unknown reasons"

if __name__ == "__main__":
	app.debug=True
	app.run()
