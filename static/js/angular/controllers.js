var FourScore = angular.module('FourScore.controllers', []);
FourScore.controller('main', function($scope, $http, $window, $location){
	if (typeof $scope.splitArray === "undefined" || $scope.splitArray.length == 0){
		$scope.splitArray = [];
	}
});

FourScore.controller('analyze', function($scope, $http, $window, $location, apiAlgo) {
	if (typeof $scope.$parent.sentenceArray === "undefined" || $scope.$parent.sentenceArray.length == 0){
		$location.path('/');
	}
	apiAlgo.sendSentences(JSON.stringify($scope.$parent.sentenceArray))
		.success(function(data, status, headers, config){
			var emotions = data.emotions;
			$scope.emotions = [];
			for(var i = 0; i < $scope.$parent.sentenceArray.length; i++){
				$scope.$parent.sentenceArray[i].emotions = emotions[i];
				$scope.$parent.sentenceArray[i].max = emotions[i].indexOf(Math.max.apply(Math, emotions[i]));
				$scope.emotions.push({
					"x": i,
					"val_0": Math.round(100 * emotions[i][0]) / 100,
					"val_1": Math.round(100 * emotions[i][1]) / 100,
					"val_2": Math.round(100 * emotions[i][2]) / 100,
					"val_3": Math.round(100 * emotions[i][3]) / 100,
					"val_4": Math.round(100 * emotions[i][4]) / 100,
					"val_5": Math.round(100 * emotions[i][5]) / 100
				});
			}
		}).error(function(data, status, headers, config){

		})
	;
	$scope.getEmotionClass = function(index){
		var emotions = $scope.$parent.sentenceArray[index].emotions;
		var max = emotions.indexOf(Math.max.apply(Math, emotions));
		switch (max){
			case 0:
				return 'alert-red';
			case 1:
				return 'alert-orange';
			case 2:
				return 'alert-yellow';
			case 3:
				return 'alert-turquoise';
			case 4:
				return 'alert-blue';
			case 5:
				return 'alert-purple';
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

	$scope.changeSentence = function(index){
		$scope.$parent.singleSentence = [$scope.$parent.sentenceArray[index]];

		apiAlgo.sendSentences(JSON.stringify($scope.$parent.singleSentence))
			.success(function(data, status, headers, config){
				//window.alert("yo");
				$scope.$parent.sentenceArray[index].emotions = data.emotions[0];
				$scope.$parent.sentenceArray[index].max = data.emotions[0].indexOf(Math.max.apply(Math, data.emotions[0]));
				$scope.emotions[index] = {
					"x": index,
					"val_0": data.emotions[index][0],
					"val_1": data.emotions[index][1],
					"val_2": data.emotions[index][2],
					"val_3": data.emotions[index][3],
					"val_4": data.emotions[index][4],
					"val_5": data.emotions[index][5]
				};
			}).error(function(data, status, headers, config){

			});
	};

	$scope.options = {
	  series: [
	    {
	      y: "val_0",
	      label: "Assertion",
	      color: "#E74C3C",
	      axis: "y",
	      type: "line",
	      thickness: "1px",
	      id: "series_0",
	      drawDots: true
	    },
	    {
	      y: "val_1",
	      label: "Disgust",
	      color: "#E67E22",
	      axis: "y",
	      type: "line",
	      thickness: "1px",
	      id: "series_1",
	      drawDots: true
	    },
	    {
	      y: "val_2",
	      label: "Fear",
	      color: "#F1C40F",
	      axis: "y",
	      type: "line",
	      thickness: "1px",
	      id: "series_2",
	      drawDots: true
	    },
	    {
	      y: "val_3",
	      label: "Hope",
	      color: "#1ABC9C",
	      axis: "y",
	      type: "line",
	      thickness: "1px",
	      id: "series_3",
	      drawDots: true
	    },
	    {
	      y: "val_4",
	      label: "Melancholy",
	      color: "#3498DB",
	      axis: "y",
	      type: "line",
	      thickness: "1px",
	      id: "series_4",
	      drawDots: true
	    },
	    {
	      y: "val_5",
	      label: "Humor",
	      color: "#9B59B6",
	      axis: "y",
	      type: "line",
	      thickness: "1px",
	      id: "series_5",
	      drawDots: true
	    },
	  ],
	  stacks: [],
	  axes: {x: {type: "linear", key: "x"}, y: {type: "linear"}},
	  lineMode: "linear",
	  tension: 0.7,
	  tooltip: {mode: "scrubber"},
	  drawLegend: true,
	  drawDots: false,
	  columnsHGap: 5
	};

	$scope.changeActive = function(index){
		for (var i = 0; i < $scope.$parent.sentenceArray.length; i++) {
			if(i != index){
				$scope.$parent.sentenceArray[i].active = false;
			} else {
				$scope.$parent.sentenceArray[i].active = true;
			}
		};
	};
});

FourScore.controller('input', function($scope, $http, $window, $location){
	$scope.analyze = function(){
		$scope.$parent.sentenceArray = [];
		$scope.$parent.splitArray = $scope.mainText.match(/([^\.\?\!\n]+|\.+|\?+|\!+|\n+)/g);
		for (var i = 0; i < $scope.$parent.splitArray.length; i++) {
			var phrase = $scope.$parent.splitArray[i];
			if(phrase !== '.' && phrase !== '?' && phrase !== '!' && phrase.substring(0,1) !== '\n'){
				var hasSpace = false;
				if (phrase.substring(0, 1) == " "){
					phrase = phrase.substring(1);
					hasSpace = true;
				}
				var active = false;
				if ($scope.$parent.sentenceArray.length == 0){
					active = true;
				}
				$scope.$parent.sentenceArray.push({
					'index' : i,
					'value' : phrase,
					'hasSpace' : hasSpace,
					'active' : active
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
