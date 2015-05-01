'use strict';

function <%= camelCaseName %>Service() {}

<%= camelCaseName %>Service.prototype.doThing = function () {
	return 1;
};

angular.module('<%= appName %>.<%= moduleName %>')
.service('<%= camelCaseName %>Service', [<%= camelCaseName %>Service]);
