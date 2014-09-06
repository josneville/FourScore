var FourScore = angular.module('FourScore.services', []);

FourScore.factory('apiAlgo', function($location, $http){
	return {
		sendSentences : function(sentenceArr){
			return $http({
				url : '/api/runAlgorithm',
				data : {
					"sentences" : sentenceArr
				},
				method : "POST"
			});
		}
	};
});