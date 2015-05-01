'use strict';

describe('app', function () {
	beforeEach(function () {
		browser.get('/');
	});
	it('should be on Home Page', function () {
		expect(browser.getTitle()).toBe('<%= humanAppName %>');
	});
});
