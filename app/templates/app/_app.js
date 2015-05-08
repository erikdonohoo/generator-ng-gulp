'use strict';

angular.module('<%= appName %>', [
	'ngSanitize'<% if (useRouting) { %>,
	'<%= appName %>.routes'<% } %><% if (useMaterialDesign) { %>,
	'ngMaterial'<% } %>
])

.run([
	'$rootScope',
	'$http',
function ($scope, $http) {

	// Expose app version info
	$http.get('version.json').success(function (v) {
		$scope.version = v.version;
		$scope.appName = v.name;
	});
}]);

angular.module('<%= appName %>.templates', []);
