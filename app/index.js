'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('underscore.string');
var exec = require('child_process').exec;

var Generator = module.exports = yeoman.generators.Base.extend({
	constructor: function () {
		yeoman.generators.Base.apply(this, arguments);
		this.argument('appName', {type: String, required: false});
		this.appName = this.appName || path.basename(process.cwd());
		this.appName = _.slugify(_.humanize(this.appName));
		this.humanAppName = _.titleize(_.humanize(this.appName));

		// Data
		this.appPath = 'app';
		this.pkg = require('../package.json');
	}
});

Generator.prototype.welcome = function welcome() {
	if (!this.options['skip-welcome-message']) {

		this.log(yosay(
			'Welcome to ' + chalk.red('ng-gulp') + '!'
		));

		this.log(
			'Let me guide you down the path of ' +
			chalk.red.underline('awesomeness') + '\n\n'
		);
	}
};

Generator.prototype.askForRouting = function askForRouting() {
	var done = this.async();

	function routing (props) {
		return props.useRouting;
	}

	this.prompt([{
		type: 'confirm',
		name: 'useRouting',
		message: 'Do you want to use a router? (ngRoute/ui-router)'
	}, {
		type: 'list',
		name: 'router',
		message: 'Which router?',
		choices: ['ngRoute', 'ui-router'],
		when: routing
	}], function (props) {

		// Set values
		for (var key in props) {
			if (props.hasOwnProperty(key)) {
				this[key] = props[key];
			}
		}

		if (this.router === 'ui-router') {
			this.routerProvider = '$urlRouterProvider';
		} else {
			this.routerProvider = '$routeProvider';
		}

		done();
	}.bind(this));
};

Generator.prototype.askForMaterial = function askForMaterial() {
	var done = this.async();

	this.prompt([{
		type: 'confirm',
		name: 'useMaterialDesign',
		message: 'Do you want to use ' + chalk.red('angular-material') + '?'
	}], function (props) {
		this.useMaterialDesign = props.useMaterialDesign;
		done();
	}.bind(this));
};

Generator.prototype.askForFontAwesome = function askForFontAwesome() {
	var done = this.async();

	this.prompt([{
		type: 'confirm',
		name: 'useFontAwesome',
		message: 'Do you want to use ' + chalk.blue('font-awesome') + '?'
	}], function (props) {
		this.useFontAwesome = props.useFontAwesome;
		done();
	}.bind(this));
};

Generator.prototype.askToCommitBower = function askToCommitBower() {
	var done = this.async();

	this.prompt([{
		type: 'confirm',
		name: 'commitBower',
		default: false,
		message: 'Do you plan on commiting files in ' +
			chalk.red('bower_components') + '?'
	}], function (props) {
		this.commitBower = props.commitBower;
		done();
	}.bind(this));
};

Generator.prototype.askForLess = function askForLess() {
	var done = this.async();
	this.prompt([{
		type: 'confirm',
		name: 'useLess',
		message: 'Do you want to use LESS for css?'
	}], function (results) {
		this.useLess = results.useLess;
		done();
	}.bind(this));
};

Generator.prototype.write = function write() {
	this.template('app/_index.html', 'app/index.html');
	this.template('app/_app.js', 'app/app.js');
	this.template('app/_version.json', 'app/version.json');
	this.template('_bower.json', 'bower.json');
	this.template('_package.json', 'package.json');
	this.template('_.gitignore', '.gitignore');
	this.template('_protractor.conf.js', 'protractor.conf.js');
	this.template('_karma.conf.js', 'karma.conf.js');
	this.template('test/e2e/_base.js', 'test/e2e/base.js');
	this.template('_gulpfile.js', 'gulpfile.js');

	this.copy('.bowerrc', '.bowerrc');
	this.copy('.editorconfig', '.editorconfig');
	this.copy('.jscsrc', '.jscsrc');
	this.copy('.jshintrc', '.jshintrc');
	this.copy('.gitattributes', '.gitattributes');
	this.copy('.jshintignore', '.jshintignore');
	this.copy('app/assets/images/github.png', 'app/assets/images/github.png');

	// Routing files
	if (this.useRouting) {
		this.template(
			'app/modules/routes/_routes.module.js',
			'app/modules/routes/routes.module.js'
		);
		this.template(
			'app/modules/routes/_routes.config.js',
			'app/modules/routes/routes.config.js'
		);
	}

	// Less
	if (this.useLess) {
		this.template('app/_app.less', 'app/app.less');
	} else {
		this.template('app/_app.less', 'app/app.css');
	}
};

Generator.prototype.install = function install() {
	this.installDependencies();
};

Generator.prototype.end = function end() {
	this.log('\n\nGreat! Now let me do so final touch ups...\n\n');
	this.spawnCommand('gulp', ['bower']);

	// Save app name, router info
	this.config.set('appName', this.appName);
	this.config.set('router', {
		useRouter: this.useRouting,
		routerName: this.router
	});
	this.config.set('useLess', this.useLess);

	// Make initial home route if routing
	if (this.useRouting) {
		var log = this.log;
		exec('yo ng-gulp:route home /', function (err, stdout) {
			log(stdout);
		});
	}
};
