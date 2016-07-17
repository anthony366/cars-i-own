angular.module('protoCarsIOwn').controller('singleCarCtrl', function($scope, $stateParams, $state, $http) {

	$scope.cid = $stateParams.id;

	// get some json that we need to use for other functions
	$http.get('data/availableCars.json').success(function(data){

		// set the result as a scope var
		$scope.availableCars = data;

		$scope.car = {};
		var getCarInfo = function() {
			// look for myCars right away, create it if it doesn't exist
			if ( $scope.getItem('allMyCars') && $scope.getItem('allMyCars') != []) {
				var allCarsArray = JSON.parse($scope.getItem('allMyCars'));
				var car = {};
				for(i=0; i < allCarsArray.length; i++) {
					if (allCarsArray[i].id == $scope.cid) {
						$scope.car = allCarsArray[i];
					}
				}
			}
		};
		getCarInfo();

		// Add a car
		$scope.addCar = function(make, model, year) {
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
				$state.go('cars.index');
			} else {
				$state.go('signup');
			}
			$scope.setItem('alertActive', true);
		};

		// get all Makes right away
		$scope.allMakes = function() {
			var avail = $scope.availableCars;
			var makes = [];
			for (i = 0; i < avail.length; i++) {
				makes.push(avail[i].make);
			}
			var uniqueMakes = makes.filter(function(elem, pos) {
				return makes.indexOf(elem) == pos;
			});
			return uniqueMakes.sort();
		};

		// get matching models based on make
		$scope.matchingModels = function(make) {
			var avail = $scope.availableCars;
			var models = [];
			for (i = 0; i < avail.length; i++) {
				if (avail[i].make == make) {
					models.push(avail[i].model);
				}
			}
			var uniqueModels = models.filter(function(elem, pos) {
				return models.indexOf(elem) == pos;
			});
			return uniqueModels.sort();
		};

		// get matching years based on model
		$scope.matchingYears = function(model) {
			var avail = $scope.availableCars;
			var years = [];
			for (i = 0; i < avail.length; i++) {
				if (avail[i].model == model) {
					years.push(avail[i].year);
				}
			}
			var uniqueYears = years.filter(function(elem, pos) {
				return years.indexOf(elem) == pos;
			});
			return uniqueYears.sort();
		};

		// get matching trims based on year
		$scope.matchingTrims = function(make, model, year) {
			var avail = $scope.availableCars;
			var trims = [];
			for (i = 0; i < avail.length; i++) {
				if ( avail[i].make == make && avail[i].model == model && avail[i].year == year) {
					// loop through the trims
					var ts = avail[i].trims;
					for( x=0; x < ts.length; x++ ) {
						trims.push(ts[x].trimName);
					}
				}
			}
			return trims.sort();
		};

		// Before I edit a car, I was to pull the values from LS and make them the values on the page
		// Collect the names from the car-edit.html form
		var editformNames = ['make', 'model', 'year', 'trim', 'mileage', 'nickname', 'zipcode', 'vin'];
		// Assign the cars in LS to a var
		var allCarsLS = JSON.parse( $scope.getItem('allMyCars') );
		// Create an empty object, we'll add to it via a loop
		$scope.editform = {};
		// loop through all the cars in the LS var...
		for( i=0; i < allCarsLS.length; i++ ) {
			// if the id matches the current view (via state manager)
			if( allCarsLS[i].id == $scope.cid ) {
				// loop through the names above
				for( x=0; x < editformNames.length; x++ ) {
					var name = editformNames[x];
					// assign the value to the scope
					$scope.editform[name] = allCarsLS[i][name];
				}
				break;
			}
		};

		$scope.editCar = function() {
			// Pull form values, merge them with existing LS data, write new data to LS
			//get all the filled out form field values, store them in an object;
			var vals = this.editform;
			// kill the form if missing data
			if (!vals.make || !vals.model || !vals.year || !vals.trim || !vals.mileage || !vals.zipcode) {
				return
			}
			// pull local storage
			var allCarsLS = JSON.parse( $scope.getItem('allMyCars') );
			// loop through the LS array
			for( i=0; i < allCarsLS.length; i++ ) {
				// if current iteration is == current car ID
				if ( allCarsLS[i].id == $scope.cid ) {
					// merge the original with the form values
					var merged = Object.assign( allCarsLS[i], vals );
					break;
				}
			}
			// write the update array back into LS
			$scope.setItem('allMyCars', JSON.stringify(allCarsLS));
			// redirect and refresh view
			$state.go('^.single', {}, {reload: true});
		};

		$scope.estimateCar = function() {
			$scope.setItem('estimated', true);
			$state.go('^.single', {}, {reload: true});
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

		$scope.recallSubscribe = function(params) {
			$scope.setItem('recallSubscribed', true);
			if (params) {
				$scope.setItem('recallEmail', params.email);
			}
		};

		$scope.recallUnsubscribe = function() {
			$scope.removeItem('recallSubscribed');
			$scope.removeItem('recallEmail');
		};

		$scope.zipLookup = function(params) {
			if (params) {
				$scope.setItem('myZip', params.zip);
			}
		};

		// TODO: fix console errors here
		$scope.imageSuccess = function($flow) {
			// This is messy as hell, but it works and the review meeting is in 40 minutes :/
			var reader = new FileReader();
			var image = $flow.files[0];
			reader.onload = function(event) {
				var uri = event.target.result;
				$scope.setItem('carimage-' + $scope.cid, uri);
				$scope.imageStrings[i] = uri;
			};
			reader.readAsDataURL(image.file);
			$state.go($state.current, {}, {reload: true});
		};

		$scope.removePhoto = function(car) {
			$scope.removeItem('carimage-' + car.id);
		};

	});

});
