angular.module('protoCarsIOwn').controller('loginCtrl', function($scope, $http, $state, localStorageService) {

	$scope.fakeLogin = function() {
		// set authState to logged in,
		$scope.setItem('authState', 'logged in');
		// redirect back to cars index to show new car
		$state.go('cars.index');
	};

});
