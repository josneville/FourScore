var FourScore = angular.module('FourScore.config', []);
FourScore.config(function($locationProvider, $httpProvider) {
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('!');
});