angular.module('protoCarsIOwn').controller('carsCtrl', function($rootScope, $scope, $state, $http) {

	// set initial var for my cars
	$scope.myLocalCars = JSON.parse($scope.getItem('allMyCars'));

	// Reset the success message on state change AWAY from the index page
	// and if the alert is on (no need to do it otherwise)
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		if ( $scope.getItem('alertActive') == true && fromState.name == 'cars.index' ) {
			$scope.setItem('alertActive', false);
		}
	});

	// TODO: DRY this out, the singleCarCtrl has the same function
	// get some json that we need to use for other functions
	$http.get('data/availableCars.json').success(function(data){

		// set the result as a scope var
		$scope.availableCars = data;

		// Add a car
		$scope.quickAddCar = function(make, model, year) {
			console.log('Adding a car...');
			// reset alert state
			$scope.setItem('alertActive', false);
			// first, kill function if form is missing stuff
			if (!make || !model || !year) {
				return
			}
			// if adding the first car, create the LS key TODO: Maybe this can happen automagically
			if ($scope.getItem('allMyCars') == null) {
				$scope.setItem('allMyCars', JSON.stringify([]));
			}
			// find matching car in the available cars list
			var avail = $scope.availableCars;
			var selectedCar = {};
			for (i = 0; i < avail.length; i++) {
				if (avail[i].make == make && avail[i].model == model && avail[i].year) {
					// grab the matching cars ID
					selectedCar = avail[i];
				}
			}
			// Get the array of existing cars from LS
			var allCarsArray = JSON.parse($scope.getItem('allMyCars'));
			// Get the ID of the last car added to the array
			var lastId;
			// If that id exists, increment it and set it as the new cars ID, otherwise set it to 1
			if (allCarsArray.length > 0) {
				lastId = allCarsArray[allCarsArray.length-1].id;
				selectedCar.id = lastId + 1;
			} else {
				selectedCar.id = 1;
			}
			// Add new car object to array
			allCarsArray.push(selectedCar);
			// set local storage with new value
			$scope.setItem('allMyCars', JSON.stringify(allCarsArray));
			// redirect to proper state
			if ( $scope.getItem('authState') == 'logged in' ) {
				$state.go('cars.index', {}, {reload: true});
			} else {
				$state.go('signup');
			}
			$scope.setItem('alertActive', true);
		};

	});

	$scope.deleteCar = function(carId) {
		// get current cars
		var cars = JSON.parse($scope.getItem('allMyCars'));
		// loop through all cars in local storage & delete it if it matches the id
		for( i = 0; i < cars.length; i++ ) {
			if ( cars[i].id == carId ) {
				cars.splice(i, 1);
				break;
			}
		}
		// set local storage with new array
		$scope.setItem('allMyCars', JSON.stringify(cars));
		// redirect to current state (force a reload)
		$state.go('cars.index', {}, {reload: true}); //second parameter is for $stateParams
		// TODO: update increment in the header
	};

	$scope.carName = function(obj) {
		var car = obj;
		var basename = car.year + ' ' + car.make + ' ' + car.model;
		if (car.trim) {
			return basename + ' ' + car.trim;
		} else {
			return basename;
		}
	};

	$scope.closeAlert = function() {
		$scope.setItem('alertActive', false);
	};

	$scope.quickAdd = function(make, model, year) {

	};

});
