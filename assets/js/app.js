(function() {
	var app = angular.module('manual', ['omAccordion']);

	app.filter('html5Entities', ['$sce', function(value) {
		return value.replace(/[\u00A0-\u9999<>\&\'\"]/gim, function(i) {
			return '&#' + i.charCodeAt(0) + ';';
		});
	}]);

	// Display HTML from JSON
	app.filter('to_trusted', ['$sce', function($sce) {
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}]);

	app.filter('createarray', function() {
		return function(val, propertyList) {
			var propNames = propertyList.split(',');
			return lastArray(val, propNames, 0);
		};
	});

	var lastArray = function(arr, propertyNames, index) {
		var res = [];
		if (!Array.isArray(arr)) {
			return res;
		}
		for (var i = 0; i < arr.length; i++) {
			var val = arr[i][propertyNames[index]];
			if (index !== propertyNames.length - 1) {
				if (val.length) {
					res.push(val[0]);
				}
				var x = index + 1;
				res = res.concat(lastArray(val, propertyNames, x));
			} else {
				res = res.concat(val);
			}
		}
		return res;
	};

	// Patterns display
	app.directive('ngType', function() {
		return {
			controller: function($scope) {}
		};
	});
	app.directive('patterns', function() {
		return {
			restrict: 'E',
			require: '^ngType',
			scope: {
				ngType: '@'
			},
			templateUrl: '../patterns.html',
			controller: function($scope, $http, $sce) {
				var theType = $scope.ngType;
				$http.get('json/' + theType + '.json')
					.then(function(result) {
						$scope.patternsArray = Object.keys(result.data).map(function(key) {
							return result.data[key];
						});
					});
			},
			controllerAs: 'patterns'
		};
	});

	// Left menu
	app.directive('navigation', function() {
		return {
			restrict: 'E',
			templateUrl: '../navigation.html',
			controller: function($scope, $http) {
				$http.get('../assets/js/om-nav.json')
					.then(function(result) {
						$scope.navArray = Object.keys(result.data).map(function(key) {
							return result.data[key];
						});
					});
			},
			controllerAs: 'navigation'
		};
	});

	app.directive('sidebar', function() {
		return {
			restrict: 'E',
			templateUrl: 'sidebar.html',
			controller: function($scope, $http) {
				$http.get('assets/js/om-nav.json')
					.then(function(result) {
						$scope.sidebarArray = Object.keys(result.data).map(function(key) {
							return result.data[key];
						});
					});
			},
			controllerAs: 'sidebar'
		};
	});

	// Everything pattern menu
	app.directive('everything', function() {
		return {
			restrict: 'E',
			templateUrl: 'everything.html',
			controller: function($scope, $http) {
				$http.get('assets/js/om-nav.json')
					.then(function(result) {
						$scope.everything = result.data;
					});
			},
			controllerAs: 'everything'
		};
	});

	app.directive('everybutton', function() {
		return {
			restrict: 'E',
			templateUrl: '../every-button.html',
			controller: function($scope, $http) {
				$http.get('../assets/js/om-nav.json')
					.then(function(result) {
						$scope.everybutton = result.data;
					});
			},
			controllerAs: 'everybutton'
		};
	});

	// Code view
	app.directive('prism', function() {
		return {
			restrict: 'A',
			link: function($scope, element, attrs) {
				element.ready(function() {
					Prism.highlightAll();
				});
			}
		};
	});

	// Static pattern display (non-responsive)
	app.directive('patternstatic', function() {
		return {
			restrict: 'E',
			require: '^ngType',
			scope: {
				ngType: '@'
			},
			templateUrl: '../patternStatic.html',
			controller: function($scope, $http) {
				var theType = $scope.ngType;
				$http.get('json/' + theType + '.json')
					.then(function(result) {
						$scope.patternsArray = Object.keys(result.data).map(function(key) {
							return result.data[key];
						});
					});
			},
			controllerAs: 'patterns'
		};
	});

	// Prototypes display
	app.directive('prototypes', function() {
		return {
			restrict: 'E',
			templateUrl: '../prototypes/prototypes.html',
			controller: function($scope, $http) {
				$http.get('../assets/js/om-nav.json')
					.then(function(result) {
						$scope.everybutton = result.data;
					});
			}
		};
	});

	app.controller('prototypesCtrl', function($scope, $http) {
		$http.get('../prototypes/prototypes.json')
			.then(function(result) {
				$scope.prototypes = Object.keys(result.data).map(function(key) {
					return result.data[key];
				});
			});
	});

	// Show/hide
	app.controller('ToggleCtrl', function($scope) {
		$scope.status = false;
		$scope.toggle = function() {
			$scope.status = !$scope.status;
		};
	});


	// Tabs controls
	app.controller("PanelController", function() {
		var panel = this;
		panel.tab = 1;

		panel.selectTab = function(setTab) {
			panel.tab = setTab;
		};
		panel.isSelected = function(checkTab) {
			return panel.tab === checkTab;
		};
	});


	// Individual patterns
	app.controller('alertCtrl', ['$scope', function($scope) {
		$scope.headingText = 'Success!';
		$scope.paragraphText = "Car Saved to your Favorites.";
	}]);

	app.controller('alertErrorCtrl', ['$scope', function($scope) {
		$scope.headingText = 'Error Alert';
		$scope.paragraphText = "What you've done has caused an error! Shame on you!";
	}]);

	app.controller('windshieldText', ['$scope', function($scope) {
		$scope.windshieldText = "It's easy. Let's go.";
	}]);

	app.controller('articleHeader', ['$scope', function($scope) {
		$scope.articleHeading = 'Best of 2015 Winner, Car: 2015 Mercedes-Benz C-Class';
		$scope.bylineAuthor = 'Cars.com Editors';
		$scope.bylineDate = 'September 29, 2015';
	}]);

	app.controller('thisYear', function($scope) {
		$scope.getDatetime = new Date();
	});

	app.controller('infoCtrl', ['$scope', function($scope) {
		$scope.infoText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
		$scope.infoLink = "This alert explained";
	}]);

	app.controller('linkParent', ['$scope', function($scope) {
		$scope.linkParentText = "Research this vehicle";
		$scope.linkParentUrl = "http://www.google.com";
	}]);

	// if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker
    //         .register('./service-worker.js')
    //         .then(function() {
    //             console.log('Service Worker Registered');
    //         });
    // }

})();
