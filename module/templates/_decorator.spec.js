'use strict';

describe('<%= camelCaseName %> decorator', function () {

	beforeEach(module('<%= appName %>.<%= moduleName %>'));

	it('should redirect log to info', inject(function ($log) {
		spyOn($log, 'info');

		$log.log('Test');

		expect($log.info).toHaveBeenCalled();
	}));
});
