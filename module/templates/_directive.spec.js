'use strict';

describe('<%= camelCaseName %> directive', function () {
	beforeEach(module('<%= appName %>.<%= moduleName %>'));

	var $compile, $scope;
	beforeEach(inject(['$compile', '$rootScope',
		function ($comp, $root) {
			$compile = $comp;
			$scope = $root.$new();
		}
	]));

	it('should make show content', function () {
		var el = $compile('<<%= moduleName %>></<%= moduleName %>>')($scope);
		$scope.$digest();
		expect(angular.element(el[0].querySelector('div')).text()).toBe('This is the <%= moduleName %> directive');
	});
});
