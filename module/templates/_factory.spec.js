'use strict';

describe('<%= camelCaseName %> factory', function () {
	beforeEach(module('<%= appName %>.<%= moduleName %>'));

	var <%= camelCaseName %>Factory;
	beforeEach(inject(['<%= camelCaseName %>Factory',
		function (factory) {
			<%= camelCaseName %>Factory = factory;
		}
	]));

	it('should get 1', function () {
		expect(<%= camelCaseName %>Factory.doThing()).toBe(1);
	});
});
