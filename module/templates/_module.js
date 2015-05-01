'use strict';

angular.module('<%= appName %>.<%= moduleName %>', [
<% if (needsTemplates) { %>	'<%= appName %>.templates'<% } %>
]);
