'use strict';

function <%= moduleName %>Run($rootScope) {
	$rootScope.<%= moduleName %>DumbList = [1, 2, 3];
}

angular.module('<%= appName %>.<%= moduleName %>')
.run(['$rootScope', <%= moduleName %>Run]);
