'use strict';

function doThing() {
	return 1;
}

function <%= camelCaseName %>Factory() {
	return {
		doThing: doThing
	};
}

angular.module('<%= appName %>.<%= moduleName %>')
.factory('<%= camelCaseName %>Factory', [<%= camelCaseName %>Factory]);
