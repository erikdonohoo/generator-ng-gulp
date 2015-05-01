'use strict';

function <%= moduleName %>Filter() {
	return function (list) {
		return angular.copy(list).reverse();
	};
}

angular.module('<%= appName %>.<%= moduleName %>')
.filter('<%= camelCaseName %>', [<%= moduleName %>filter]);
