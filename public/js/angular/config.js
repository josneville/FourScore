var FourScore = angular.module('FourScore.config', []);
FourScore.config(function($locationProvider) {
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('!');
});