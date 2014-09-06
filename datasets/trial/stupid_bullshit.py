word_indices = []
score_indices = []

with open('affectivetext_trial', 'r') as f:
	for line in f:
		li = line.split(' ')
		print li[0]
		word_indices.append(li[0])

with open('affectivetext_trial.emotions.simple', 'r') as f:
	for line in f:
		li = line.split(' ')
		print li[0]
		score_indices.append(li[0])
	

for i in range(0, len(word_indices)):
	print word_indices[i], score_indices[i]

