var FourScore = angular.module('FourScore.controllers', []);
FourScore.controller('main', function($scope, $http, $window, $location){
	if (typeof $scope.splitArray === "undefined" || $scope.splitArray.length == 0){
		$scope.splitArray = [];
	}
	
	$scope.analyze = function(){
		$scope.splitArray = $('#mainText').val().match(/([^\.\?\!\n]+|\.+|\?+|\!+|\n+)/g);
		$scope.sentenceArray = [];
		for (var i = 0; i < $scope.splitArray.length; i++) {
			var phrase = $scope.splitArray[i];
			if(phrase !== '.' && phrase !== '?' && phrase !== '!' && phrase.substring(0,1) !== '\n'){
				$scope.sentenceArray.push({
					'index' : i,
					'value' : phrase
				});
			}
		}

		$location.path('/analyze');
	}
	$scope.disableAnalyze = function(){
		return typeof $scope.mainText === "undefined" || $scope.mainText.length == 0;
	}
	$scope.test = 'blah';
});

FourScore.controller('analyze', function($scope, $http, $window, $location) {
	// body...
	//$window.alert(JSON.stringify($scope.sentenceArray));

});

FourScore.controller('input', function($scope, $http, $window, $location){

	$('#mainText').val(function(i, val){
		return $scope.splitArray.join('');
	});
});