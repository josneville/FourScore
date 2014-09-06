var FourScore = angular.module('FourScore.routes', ['ngRoute']);

FourScore.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : '/views/input.html',
		controller : 'input'
	}).when('/analyze', {
		templateUrl : '/views/analyze.html',
		controller : 'analyze'
	});
});