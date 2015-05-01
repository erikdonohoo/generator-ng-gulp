'use strict';

function <%= camelCaseName %>Directive() {
	return {
		templateUrl: '<%= templatePath %>',
		link: function ($scope) {
			$scope.stuff = 'This is the <%= moduleName %> directive';
		}
	};
}

angular.module('<%= appName %>.<%= moduleName %>')
.directive('<%= camelCaseName %>', [<%= camelCaseName %>Directive]);
