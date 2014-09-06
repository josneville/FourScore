var FourScore = angular.module('FourScore.controllers', []);
FourScore.controller('main', function($scope, $http, $window, $location){
	if (typeof $scope.splitArray === "undefined" || $scope.splitArray.length == 0){
		$scope.splitArray = [];
	}
});

FourScore.controller('analyze', function($scope, $http, $window, $location, apiAlgo) {
	apiAlgo.sendSentences(JSON.stringify($scope.$parent.sentenceArray))
		.success(function(data, status, headers, config){
			$scope.emotions = data.emotions;
			for(var i = 0; i < $scope.$parents.sentenceArray.length; i++){
				$scope.$parent.sentenceArray[i].emotions = $scope.emotions[i];
			}
		}).error(function(data, status, headers, config){

		});
	if (typeof $scope.$parent.sentenceArray === "undefined" || $scope.$parent.sentenceArray.length == 0){
		$location.path('/');
	}
	$scope.getEmotionClass = function(emotionType){
		switch (emotionType){
			case 0:
				return 'alert-red';
			case 1:
				return 'alert-orange';
			case 2:
				return 'alert-purple';
			case 3:
				return 'alert-green';
			case 4:
				return 'alert-blue';
			case 5:
				return 'alert-turquoise';
			default :
				return '';
		}
	};
	$scope.return = function(){
		for (var i = 0; i < $scope.$parent.sentenceArray.length; i++){
			//extract the text from each div
			if ($scope.$parent.sentenceArray[i].hasSpace){
				$scope.$parent.splitArray[$scope.sentenceArray[i].index] = " " + $scope.$parent.sentenceArray[i].value;
			}
			else{
				$scope.$parent.splitArray[$scope.sentenceArray[i].index] = $scope.$parent.sentenceArray[i].value;
			}
			
		}
		$location.path('/');
	};
});

FourScore.controller('input', function($scope, $http, $window, $location){
	$scope.analyze = function(){
		$scope.$parent.sentenceArray = [];
		$scope.$parent.splitArray = $scope.mainText.match(/([^\.\?\!\n]+|\.+|\?+|\!+|\n+)/g);
		for (var i = 0; i < $scope.$parent.splitArray.length; i++) {
			var phrase = $scope.$parent.splitArray[i];
			if(phrase !== '.' && phrase !== '?' && phrase !== '!' && phrase.substring(0,1) !== '\n'){
				if (phrase.substring(0, 1) == " "){
					phrase = phrase.substring(1);
					var hasSpace = true;
				}
				$scope.$parent.sentenceArray.push({
					'index' : i,
					'value' : phrase,
					'hasSpace' : hasSpace
				});
			}
		}
		$location.path('/analyze');
	}
	$scope.disableAnalyze = function(){
		return typeof $scope.mainText === "undefined" || $scope.mainText.length == 0;
	}
	$scope.mainText = $scope.$parent.splitArray.join(''); // replace the main text back
});
