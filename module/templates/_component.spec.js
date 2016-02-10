'use strict';

describe('<%= camelCaseName %> component', function () {
	beforeEach(module('<%= appName %>.<%= moduleName %>'));

	var component, compController, scope;
	beforeEach(inject(function($rootScope, $componentController) {
			scope = $rootScope.$new();
			compController = $componentController;
		}
	));

	it('should have correct text in stuff', function () {
		component = compController('<%= camelCaseName %>', {$scope: scope});
		expect(component.stuff).toBe('This is the <%= moduleName %> component');
	});
});
