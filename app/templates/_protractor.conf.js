'use strict';
exports.config = {

	// IMPORTANT
	// We explicityly use protractor 1.8.0, and gulp-protractor 0.0.12 because of this
	// https://github.com/angular/protractor/issues/2095
	// When fixed move to protractor#~2.0.0 and gulp-protractor#~1.0.0

	multicapabilities: {
		browserName: 'chrome'
	},

	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000
	}
};
