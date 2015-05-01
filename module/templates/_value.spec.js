'use strict';

describe('<%= camelCaseName %> value', function () {
	beforeEach(module('<%= appName %>.<%= moduleName %>'));

	var <%= camelCaseName %>Value;
	beforeEach(inject(['<%= camelCaseName %>Value',
		function (value) {
			<%= camelCaseName %>Value = value;
		}
	]));

	it('should allow getting and setting of value', function () {
		expect(<%= camelCaseName %>Value.thing).toBe(1);
		<%= camelCaseName %>Value.thing = 2;
		expect(<%= camelCaseName %>Value.thing).toBe(2);
	});
});
