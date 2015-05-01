'use strict';

function <%= camelCaseName %>RouteConfig (<% if (router.routerName === 'ui-router') { %>$stateProvider<% } else { %>$routeProvider<% } %>) {
	<% if (router.routerName === 'ui-router') { %>$stateProvider
		.state('<%= routeName %>', {
			url: '<%= routeString %>',
			templateUrl: '<%= routeTemplate %>',
			controller: ['$scope', '$stateParams',
				function ($scope, $stateParams) {
					$scope.$stateParams = $stateParams;
				}
			]
		});
<% } else { %>	$routeProvider
		.when('<%= routeString %>', {
			templateUrl: '<%= routeTemplate %>',
			controller: ['$scope', '$routeParams',
				function ($scope, $routeParams) {
					$scope.$routeParams = $routeParams;
				}
			]
		});<% } %>
}

angular.module('<%= appName %>.routes.<%= routeName %>')
.config([<% if (router.routerName === 'ui-router') { %>'$stateProvider'<% } else { %>'$routeProvider'<% } %>, <%= camelCaseName %>RouteConfig]);
