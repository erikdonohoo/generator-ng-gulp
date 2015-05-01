'use strict';

describe('<%= camelCaseName %> service', function () {
	beforeEach(module('<%= appName %>.<%= moduleName %>'));

	var <%= camelCaseName %>Service;
	beforeEach(inject(['<%= camelCaseName %>Service',
		function (service) {
			<%= camelCaseName %>Service = service;
		}
	]));

	it('should get 1', function () {
		expect(<%= camelCaseName %>Service.doThing()).toBe(1);
	});
});
