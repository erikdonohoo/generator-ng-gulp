var <%= camelCaseName %>Constant = {
	name: '<%= moduleName %>'
};

angular.module('<%= appName %>.<%= moduleName %>')
.constant(<%= moduleName %>Constant, [<%= camelCaseName %>Constant]);
