angular.module('<%= appName %>.routes')

.config([
	'<%= routerProvider %>',<% if (router === 'ui-router') { %>
	'$stateProvider',<% } %>
function (<%= routerProvider %><% if (router === 'ui-router') { %>, $stateProvider<% } %>) {
	'use strict';
<% if (router === 'ui-router') { %>
	$stateProvider
		.state('home', {
			url: '/',
			template: '<div>Home</div>'
		});

	$urlRouterProvider.otherwise('/');<% } else if (router === 'ngRoute') { %>
	$routeProvider
		.when('/', {
			template: '<div>Home</div>'
		})
		.otherwise({redirectTo: '/'});<% } %>
}]);
