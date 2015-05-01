angular.module('<%= appName %>.routes', [
	<% if (router === 'ngRoute') { %>'ngRoute'
	<% } else if (router === 'ui-router') { %>'ui.router'<% } %>
]);
