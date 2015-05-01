'use strict';

function <%= camelCaseName%>($scope) {
	$scope.stuff = [1, 2, 3];
}

angular.module('<%= appName %>.<%= moduleName %>')
.controller('<%= camelCaseName %>Ctrl', ['$scope', <%= camelCaseName %>]);
