angular.module('protoCarsIOwn').controller('signupCtrl', function($scope, $http, $state, localStorageService) {

	$scope.fakeSignup = function() {
		// set authState to logged in,
		$scope.setItem('authState', 'logged in');
		// redirect back to cars index to show new car
		$state.go('cars.index');
	};

});
