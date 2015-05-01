'use strict';

function <%= camelCaseName %>Decorator($provide) {
	// redirect log to info
	$provide.decorator('$log', ['$delegate', function ($delegate) {
		$delegate.log = function log() {
			$delegate.info.apply(this, arguments);
		};

		return $delegate;
	}]);
}

angular.module('<%= appName %>.<%= moduleName %>')
.config(['$provide', <%= camelCaseName %>Decorator]);
