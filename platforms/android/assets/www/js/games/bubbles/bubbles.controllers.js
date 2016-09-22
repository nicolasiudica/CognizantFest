'use strict';

angular
	.module('bubbles.controllers', ['ionic', 'chart.js']);

angular
	.module('bubbles.controllers')
	.controller('WelcomeCtrl', ['$scope', function ($scope) {}]);

angular
	.module('bubbles.controllers')
	.config(['ChartJsProvider', function (ChartJsProvider) {
		ChartJsProvider.setOptions({
			tooltips: {
				enabled: false
			}
		});
	}]);

angular
	.module('bubbles.controllers')
	.controller('BubbleCtrl', ['$scope', '$interval', '$state', '$ionicPopup', function ($scope, $interval, $state, $ionicPopup) {
		function randomScalingFactor() {
			return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
		}

		function randomRadius() {
			return Math.abs(randomScalingFactor()) / 3;
		}

		function createTheOne() {
			//console.log('====== createTheOne ======');
			/*
			var thisx = randomScalingFactor(),
				thisy = randomScalingFactor(),
				thisr = randomRadius(),
			*/
			var theOne = [{
					x: randomScalingFactor(),
					y: randomScalingFactor(),
					r: randomRadius()
				}];
			//console.log("The One: (x,y) = (" + thisx + "," + thisy + ")");
			//console.log(thisr);
			return theOne;
		}

		function injectTheOne(series, data) {
			//console.log('====== injectTheOne ======');
			if ($scope.theOne == null) {
				$scope.theOne = createTheOne();
			}

			series.push('The One');
			data.push($scope.theOne);
		}

		function findTheOne(points, scope) {
			var i = 0,
				dataset,
				serie,
				theOne = [{
					x: 0,
					y: 0,
					r: 0
				}];

			for (i; i < points.length; i++) {
				// Get current Dataset
				dataset = points[i]._datasetIndex;
				// Get current serie by dataset index
				serie = scope.series[dataset];

				if (serie == 'The One') {
					theOne.x = points[i]._model.x;
					theOne.y = points[i]._model.y;
					theOne.r = points[i]._model.radius;
				}
			}

			return theOne;
		}

		function createChart() {
			//console.log('====== createChart ======');
			var howMany = 30,
				i = 0;
			$scope.series = [];
			$scope.data = [];

			injectTheOne($scope.series, $scope.data);

			$scope.series.push('Others');

			for (i; i < howMany; i++) {
				$scope.data.push([{
					x: randomScalingFactor(),
					y: randomScalingFactor(),
					r: randomRadius()
				}]);
			}
		}
		
		Chart.defaults.global.elements.point.hoverRadius = 0;

		$scope.options = {
			resposive: true,
			maintainAspectRatio: false,
			scales: {
				xAxes: [{
					display: false,
					ticks: {
						max: 150,
						min: -150,
						stepSize: 1
					}
				}],
				yAxes: [{
					display: false,
					ticks: {
						max: 150,
						min: -150,
						stepSize: 1
					}
				}]
			}
		};

		createChart();
		$interval(createChart, 3000);
		
		/****  ****/
		/*********/
		$scope.showPopup = function () {
			$scope.data = {};

			var popup = $ionicPopup.show({
				title: $scope.message,
				scope: $scope,
				templateUrl: 'templates/games/bubbles/popup.html',
				buttons: [{
					text: 'Replay',
					type: 'button-default',
					onTap: function (e) {
						$scope.theOne = null;
						$state.go('canvas');
					}
				}, {
					text: 'Exit',
					type: 'button-positive',
					onTap: function (e) {
						$scope.theOne = null;
						$state.go('bubbles');
					}
				}]
			});
		};

		var badClickCounter = 0;
		var goodClickCounter = 0;

		$scope.whoClicked = function (points, event) {
			var i = 0,
				theOne = findTheOne(points, $scope),
				hitboxX = theOne.x || 0,
				hitboxY = theOne.y || 0,
				hitboxR = theOne.r || 0,

				hitboxMinX = hitboxX - hitboxR - 1,
				hitboxMaxX = hitboxX + hitboxR + 1,

				hitboxMinY = hitboxY - hitboxR - 1,
				hitboxMaxY = hitboxY + hitboxR + 1,

				//clickX = event.offsetX,
				//clickY = event.offsetY,

				validX = (event.offsetX >= hitboxMinX) && (event.offsetX <= hitboxMaxX),
				validY = (event.offsetY >= hitboxMinY) && (event.offsetY <= hitboxMaxY),

				valid = validX && validY;

				var bubbleResultMessages = [
					{
						message: 'One tequila, two tequila, three tequila, floor.',
						img: '',
						resultID: 0
					},
					{
						message: 'You didn´t fall, the floor just needed a hug',
						img: '',
						resultID: 1
					},
					{
						message: 'Go show those sweet moves on the dance floor, trust me... you can dance',
						img: '',
						resultID: 2
					},
					{
						message: 'A man´s got to believe in something. I believe you need another drink.',
						img: '',
						resultID: 3
					},
					{
						message: 'Yo mama´s so fat, the recursive function used to calculate her mass causes a stack overflow!',
						img: '',
						resultID: 4
					},
					{
						message: 'Really? All the bubbles? ALL??? put the phone down a go get a drink',
						img: '',
						resultID: 5
					}
				];

				//console.log("Valid: x = " + validX + " and y = " + validY);
				//console.log("TheOne: (x,y,r) = (" + theOne.x + "," + theOne.y + "," + theOne.r + ")");
				//console.log("Valid: ([m < x < M] , [m < y < M]) = ([" + hitboxMinX + " < x < " + hitboxMaxX + "] , [" + hitboxMinY + " < y < " + hitboxMaxY + "])");
				//console.log("Click: (x,y) = (" + clickX + "," + clickY + ")");

			clicksCounter(valid);

			var state = bubbleResultMessages[goodClickCounter];

			sendResult(state);

			var totalClicks = badClickCounter + goodClickCounter;

			if(totalClicks === 5){
				resetGame();
			}
		};

		function clicksCounter(valid){
			if(valid){
				goodClickCounter += 1;
				$scope.theOne = createTheOne();
				createChart();
				$state.reload('canvas');
			}else{
				badClickCounter += 1;
				createChart();
				$state.reload('canvas');
			}
		}

		function sendResult(state){
			//console.log(state);
			$scope.message = state;
			//$scope.resultID = state.resultID;
			$scope.badClicks = badClickCounter;
			$scope.goodClicks = goodClickCounter;
		}

		function resetGame(){
			badClickCounter = 0;
			goodClickCounter = 0;
			$scope.badClicks = 0;
			$scope.goodClicks = 0;
			$scope.showPopup();
		}
	}]);

