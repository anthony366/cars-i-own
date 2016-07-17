var myApp = angular.module('protoCarsIOwn', []);

// Tabs controls
myApp.controller("PanelController", function() {
	var panel = this;
	panel.tab = 1;

	panel.selectTab = function(setTab) {
		panel.tab = setTab;
	};
	panel.isSelected = function(checkTab) {
		return panel.tab === checkTab;
	};
});

myApp.controller('thisYear', function($scope) {
	$scope.getDatetime = new Date();
});
