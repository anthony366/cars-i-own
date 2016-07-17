angular.module('protoCarsIOwn', ['ui.router', 'LocalStorageModule', 'flow']);

// routes
angular.module('protoCarsIOwn').config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/cars/all');
	$stateProvider
		.state('car', {
			url: '/car/:id',
			templateUrl: 'car/car.html',
			controller: 'singleCarCtrl'
		})
		.state('car.single', {
			url: '/dashboard',
			templateUrl: 'car-single/car-single.html'
		})
		.state('car.edit', {
			url: '/edit',
			templateUrl: 'car-edit/car-edit.html'
		})
		.state('car.estimate', {
			url: '/estimate',
			templateUrl: 'car-estimate/car-estimate.html'
		})
		.state('caradd', {
			url: '/add',
			templateUrl: 'car-add/car-add.html',
			controller: 'singleCarCtrl'
		})
		.state('cars', {
			url: '/cars',
			templateUrl: 'cars/cars.html',
			controller: 'carsCtrl'
		})
		.state('cars.index', {
			url: '/all',
			templateUrl: 'cars-index/cars-index.html',
			controller: 'carsCtrl'
		})
		.state('signup', {
			url: '/fake-sign-up',
			templateUrl: 'signup/signup.html',
			controller: 'signupCtrl'
		})
		.state('login', {
			url: '/fake-log-in',
			templateUrl: 'login/login.html',
			controller: 'loginCtrl'
		});
});

// local storage
angular.module('protoCarsIOwn').config(function(localStorageServiceProvider) {
	localStorageServiceProvider
		.setPrefix('carsIOwn')
		.setStorageType('localStorage')
		.setDefaultToCookie(true)
		.setNotify(true, true);
});

angular.module('protoCarsIOwn').controller('carsIOwnCtrl', function($rootScope, $scope, localStorageService, $stateParams) {

	// fix dumb scrolling issues
	$rootScope.$on('$stateChangeSuccess', function() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	});

	// warn people that cookies are not configured
	if (localStorageService.getStorageType() != 'localStorage') {
		alert('Just a heads up, this prototype isn\'t configured to work with anything but Localstorage. If you do not have that it likely wont fallback to cookies properly. Or maybe it will, who knows...');
	}

	$scope.setItem = function(key, val) {
		return localStorageService.set(key, val);
	};

	$scope.getItem = function(key) {
		return localStorageService.get(key);
	};

	$scope.removeItem = function(key) {
		return localStorageService.remove(key);
	};

	var authKey = 'authState';

	$scope.logIn = function() {
		$scope.setItem(authKey, 'logged in');
	};

	$scope.logOut = function() {
		$scope.setItem(authKey, 'logged out');
	};

	$scope.isLoggedIn = function() {
		if ($scope.getItem(authKey) == 'logged in') {
			return true;
		}
	}

	$scope.username = 'cargeek2';

	$scope.myLocalCars = JSON.parse($scope.getItem('allMyCars'));

	$scope.cid = $stateParams.carId;

	$scope.carThumb = function(car) {
		if (car) {
			if ($scope.getItem('carimage-' + car.id)) {
				return $scope.getItem('carimage-' + car.id);
			} else {
				return car.thumb;
			}
		}
	};

});

angular.module('protoCarsIOwn').directive('format', function($filter) {
	return {
		require: '?ngModel',
		link: function(scope, elem, attrs, ctrl) {
			if (!ctrl) {
				return;
			}
			ctrl.$formatters.unshift(function() {
				return $filter('number')(ctrl.$modelValue);
			});
			ctrl.$parsers.unshift(function(viewValue) {
				var plainNumber = viewValue.replace(/[\,\.]/g, ''),
					b = $filter('number')(plainNumber);
				elem.val(b);
				return plainNumber;
			});
		}
	}
});

angular.module('protoCarsIOwn').directive('allowPattern', [allowPatternDirective]);

function allowPatternDirective() {
	return {
		restrict: "A",
		compile: function(tElement, tAttrs) {
			return function(scope, element, attrs) {
				// I handle key events
				element.bind("keypress", function(event) {
					var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
					var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.
					// If the keyCode char does not match the allowed Regex Pattern, then don't allow the input into the field.
					if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
						event.preventDefault();
						return false;
					}
				});
			};
		}
	};
}

// stupid datestamp
angular.module('protoCarsIOwn').controller('thisYear', function($scope) {
	$scope.getDatetime = new Date();
});
