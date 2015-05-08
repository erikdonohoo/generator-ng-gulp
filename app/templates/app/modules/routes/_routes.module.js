angular.module('<%= appName %>.routes', [
	'<%= appName %>.templates'<% if (router === 'ngRoute') { %>,
	'ngRoute'<% } else if (router === 'ui-router') { %>,
	'ui.router'<% } %>
]);
