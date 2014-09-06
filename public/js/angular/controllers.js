var FourScore = angular.module('FourScore.controllers', []);
FourScore.controller('main', function($scope, $http, $window, $location, $sce){
	$scope.showMainText = function(){
		//$window.alert($('#mainText').val());
		$scope.splitArray = $('#mainText').val().match(/[^\.+\?+\n+\!]+|\.+|\?+|\n+|\!+/g);
		//$scope.splitArray = $('#mainText').val().match(/[\.,]+/g);
		$window.alert(JSON.stringify($scope.splitArray));
		$('#mainText').val(function(i, val){
			return $scope.splitArray.join('');
		});
	}
});