angular.module('<%= appName %>.routes')

.config([
	'<%= routerProvider %>',
function (<%= routerProvider %>) {
	'use strict';
<% if (router === 'ui-router') { %>
	$urlRouterProvider.otherwise('/');<% } else if (router === 'ngRoute') { %>
	$routeProvider.otherwise({redirectTo: '/'});<% } %>
}]);
