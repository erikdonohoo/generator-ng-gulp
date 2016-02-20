'use strict';

var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');
var _ = require('underscore.string');
var utils = require('../utils.js');

var nameRegex = /\/?([^\/]+)\/$/;

var Generator = module.exports = yeoman.generators.Base.extend({
	constructor: function () {
		yeoman.generators.Base.apply(this, arguments);
		this.argument('modulePath', {type: String, required: true});

		this.modulePath = this.modulePath.charAt(this.modulePath.length - 1) === '/' ?
			this.modulePath : this.modulePath + '/';

		this.modulePath = this.modulePath.toLowerCase();

		this.moduleName = nameRegex.exec(this.modulePath)[1];

		this.appName = this.config.get('appName');
		this.useLess = this.config.get('useLess');

		// Data
		this.pkg = require('../package.json');
	}
});

Generator.prototype.askForComponents = function () {
	var done = this.async();

	this.prompt([{
		type: 'checkbox',
		name: 'components',
		message: 'What types of files do you need?',
		choices: [{
			name: 'Component',
			value: 'component'
		},{
			name: 'Controller',
			value: 'controller'
		}, {
			name: 'Filter',
			value: 'filter'
		}, {
			name: 'Service',
			value: 'service'
		}, {
			name: 'Factory',
			value: 'factory'
		}, {
			name: 'Directive',
			value: 'directive'
		}, {
			name: 'Constant',
			value: 'constant'
		}, {
			name: 'Decorator',
			value: 'decorator'
		}, {
			name: 'Run',
			value: 'run'
		}, {
			name: 'Config',
			value: 'config'
		}, {
			name: 'Value',
			value: 'value'
		}]
	}], function (props) {
		this.components = props.components;
		done();
	}.bind(this));
};

Generator.prototype.write = function () {

	// Check for and generate module file
	var modulePath = path.join('./app/modules/' + this.modulePath);
	try {
		// Check if module file exists
		fs.lstatSync(modulePath + this.moduleName + '.module.js');
	} catch (e) {
		this.needsTemplates = this.components.indexOf('directive') !== -1 || this.components.indexOf('component') !== -1;
		this.copy('_module.js', modulePath + this.moduleName + '.module.js');
		utils.writeScript(this.modulePath + this.moduleName + '.module.js', this);
	}

	this.camelCaseName = _.camelize(this.moduleName);
	this.components.forEach(function (component) {
		this.templatePath = path.join('modules/', this.modulePath) + this.moduleName + '.' + component + '.tpl.html';
		this.template(
			'_' + component + '.js',
			modulePath + this.moduleName + '.' + component + '.js'
		);

		if (component !== 'constant') {
			this.template(
				'_' + component + '.spec.js',
				modulePath + this.moduleName + '.' + component + '.spec.js'
			);
		}

		if (component === 'directive' || component === 'component') {
			if(component === 'component') {
				this.template(
					'_componenttpl.html',
					'app/' + this.templatePath
				);
			}
			else {
				this.template(
					'_tpl.html',
					'app/' + this.templatePath
				);
			}
			this.template(
				'_.less',
				this.useLess ? modulePath + this.moduleName + '.less' :
					modulePath + this.moduleName + '.css'
			);
		}

		utils.writeScript(this.modulePath + this.moduleName + '.' + component + '.js');
	}.bind(this));
};
