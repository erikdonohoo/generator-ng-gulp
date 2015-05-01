'use strict';

describe('<%= camelCaseName %>Ctrl', function () {

	beforeEach(module('<%= appName %>.<%= moduleName %>'));

	var ctrl, $scope;
	beforeEach(inject(['$rootScope', '$controller',
		function ($rootScope, $controller) {
			$scope = $rootScope.$new();
			ctrl = $controller('<%= camelCaseName %>Ctrl', {
				$scope: $scope
			});
		}
	]));

	it('should have a list of stuff', function () {
		expect($scope.stuff).toBeDefined();
		expect($scope.stuff.length).toBe(3);
	});
});
