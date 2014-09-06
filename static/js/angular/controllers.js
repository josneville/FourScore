var FourScore = angular.module('FourScore.controllers', []);
FourScore.controller('main', function($scope, $http, $window, $location, $sce){
	$scope.analyze = function(){
		//$window.alert($('#mainText').val());
		$scope.splitArray = $('#mainText').val().match(/((?:\S[^\.\?\!]*)[\.\?\!]*)/g);
		//$scope.splitArray = $('#mainText').val().match(/[\.,]+/g);
		$window.alert(JSON.stringify($scope.splitArray));
		$('#mainText').val(function(i, val){
			$scope.splitArray.match(/(?<=\.)(?=\w)/g);
			return $scope.splitArray.join('');
		});
	}
});

FourScore.controller('input', function($scope, $http, $window, $location){

});

FourScore.controller('analyze', function($scope, $http, $window, $location){

});