// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
	'use strict';
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '',

		files: [
			'app/bower_components/angular/angular.js',
			'app/bower_components/angular-mocks/angular-mocks.js',
			'app/bower_components/angular-sanitize/angular-sanitize.js',<% if (router === 'ui-router') { %>
			'app/bower_components/ui-router/release/angular-ui-router.js',<% } else if (router === 'ngRoute') { %>
			'app/bower_components/angular-route/angular-route.js',<% } %><% if (useMaterialDesign) { %>
			'app/bower_components/angular-material/angular-material.js',<% } %>
			'app/app.js',
			'.generated/templates.js'<% if (useRouting) { %>,
			'.generated/app/modules/routes/routes.concat.js'<% } %>,
			'app/modules/**/*.module.js',
			'app/modules/**/*.+(component|controller|filter|directive|service|constant|decorator|factory|value|config|run).js',
			'app/modules/**/*.spec.js',
			'app/app.spec.js'
		],

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['jasmine'],

		// list of files / patterns to exclude
		exclude: [],

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['Chrome'], // Here you can change which browsers you want to test on

		// How long does Karma wait for a message from a browser before disconnecting it (in ms).
		browserNoActivityTimeout: 2000 /* no matter how high you set it, it'll max to 86 seconds... weird */
	});
};
