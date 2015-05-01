'use strict';

describe('<%= camelCaseName %> filter', function () {
	beforeEach(module('<%= appName %>.<%= moduleName %>'));

	var filter;
	beforeEach(inject(['<%= camelCaseName %>Filter',
		function (f) {
			filter = f;
		}
	]));

	it('should reverse a list', function () {
		expect(filter([1, 2, 3])).toEqual([3, 2, 1]);
	});
});
