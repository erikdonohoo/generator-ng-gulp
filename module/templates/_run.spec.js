'use strict';

describe('<%= moduleName %> run function', function () {
	beforeEach(module('<%= appName %>.<%= moduleName %>'));

	var $rootScope;
	beforeEach(inject(['$rootScope',
		function ($scope) {
			$rootScope = $scope;
		}
	]));

	it('should add dumb list to scope', function () {
		expect($rootScope.<%= moduleName %>DumbList).toEqual([1, 2, 3]);
	});
});
