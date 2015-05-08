'use strict';

describe('<%= routeName %> route', function () {
	beforeEach(function () {
		browser.get('<%= routeString %>');
	});
	it('should be on <%= routeName %>', function () {
		browser.getCurrentUrl().then(function (url) {
			expect(url).toContain('#<%= routeString %>');
		});
	});
});
