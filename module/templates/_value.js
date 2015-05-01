'use strict';

var _<%= camelCaseName %>Value = 1;
var <%= camelCaseName %>Value = {
	get thing() {
		return _<%= camelCaseName %>Value;
	},
	set thing(val) {
		return _<%= camelCaseName %>Value = val;
	}
};

angular.module('<%= appName %>.<%= moduleName %>')
.value('<%= camelCaseName %>Value', <%= camelCaseName %>Value);
