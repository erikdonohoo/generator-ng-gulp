'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');
var _ = require('underscore.string');
var utils = require('../utils.js');

var Generator = module.exports = yeoman.generators.Base.extend({
	constructor: function () {
		yeoman.generators.Base.apply(this, arguments);
		this.argument('routeName', {type: String, required: true});
		this.argument('routeString', {type: String, required: true});
		this.routeString = this.routeString.charAt(0) === '/' ? this.routeString : '/' + this.routeString;
		this.appName = this.config.get('appName');
		var pkg = require('../package.json');
		this.router = this.config.get('router');

		if (!this.router || !this.router.useRouter) {
			this.log(chalk.red('Your ' + chalk.cyan('yo-rc.json') + ' is missing info about what router you are using'));
			this.log(chalk.red('Please add a property to ' + chalk.yellow(pkg.name) + ' that looks like: \n'));
			this.log('"router": {\n\t"useRouter": true,\n\t"routerName": "(ui-router or ngRoute)"\n}');
			this.shouldCancel = true;
		}
	}
});

Generator.prototype.write = function () {

	if (!this.shouldCancel) {
		// Check for and generate module file
		var routePath = path.join('./app/modules/routes/' + this.routeName + '/');
		try {
			// Check if module file exists
			fs.lstatSync(routePath + this.routeName + '.module.js');
		} catch (e) {
			this.copy('_module.js', routePath + this.routeName + '.module.js');
			utils.writeScript('routes/' + this.routeName + '/' + this.routeName + '.module.js', this);
		}

		this.camelCaseName = _.camelize(this.routeName);
		this.routeTemplate = 'modules/routes/' + this.routeName + '/' + this.routeName + '.route.html'
		this.template(
			'_config.js',
			routePath + this.routeName + '.config.js'
		);
		this.template(
			'_route.html',
			routePath + this.routeName + '.route.html'
		);

		utils.writeScript('routes/' + this.routeName + '/' + this.routeName + '.config.js', this);
	}
};
