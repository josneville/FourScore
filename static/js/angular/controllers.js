var FourScore = angular.module('FourScore.controllers', []);
FourScore.controller('main', function($scope, $http, $window, $location, $sce){
	if (typeof $scope.splitArray === "undefined" || $scope.splitArray.length == 0){
		$scope.splitArray = [];
	}
	$scope.formatText = function(){
		$('#mainText').val(function(i, val){
			return $scope.splitArray.join('');
		});
	}
	$scope.formatText();
	$scope.analyze = function(){
		$scope.splitArray = $('#mainText').val().match(/([^\.\?\!\n]+|\.+|\?+|\!+|\n+)/g);
		$scope.formatText();
	}
	$scope.disableAnalyze = function(){
		return typeof $scope.mainText === "undefined" || $scope.mainText.length == 0;
	}
});