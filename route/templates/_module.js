'use strict';

angular.module('<%= appName %>.routes').requires.push('<%= appName %>.routes.<%= routeName %>');
angular.module('<%= appName %>.routes.<%= routeName %>', [
	'<%= appName %>.templates',
	'<%= appName %>.routes',
	<% if (router.routerName === 'ui-router') { %>'ui.router'<% } else { %>'ngRoute'<% } %>
]);
