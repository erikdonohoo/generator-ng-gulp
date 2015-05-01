'use strict';

function <%= moduleName %>Config ($logProvider) {
	$logProvider.debugEnabled(true);
}

angular.module('<%= appName %>.<%= moduleName %>')
.config(['$logProvider', <%= moduleName %>Config]);
