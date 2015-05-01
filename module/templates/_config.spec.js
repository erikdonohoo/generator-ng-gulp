'use strict';

describe('<%= moduleName %> config function', function () {
	beforeEach(module('<%= appName %>.<%= moduleName %>'));

	var $logProvider;
	beforeEach(module(['$logProvider', function (_$logProvider_) {
		$logProvider = _$logProvider_;
	}]));

	beforeEach(inject);

	it('log should have debugEnabled should be true', function () {
		expect($logProvider.debugEnabled()).toBe(true);
	});
});
