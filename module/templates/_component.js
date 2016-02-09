'use strict';

function <%= camelCaseName %>Controller() {
	this.stuff = 'This is the <%= moduleName %> component';
}

angular.module('<%= appName %>.<%= moduleName %>')
.component('<%= camelCaseName %>', {
	templateUrl: '<%= templatePath %>',
	controller: [<%= camelCaseName %>Controller],
	bindings: {}
});
