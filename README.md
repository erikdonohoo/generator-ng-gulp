# generator-mtc-app-gulp

### Goals

* [ ] Allow re-running generator to get updates
* [ ] Allow for writing in es6 if desired (Look at generator-gulp-angular for how to handle.  Will be tough with coverage)
* [x] Should allow for creating components (even nested components)
* [x] When making component, allow choosing (filter/service/controller) etc.
* [x] Should generate test for each matching component piece
* [ ] Should be fully tested

### Think About
* [ ] Improve `gulp test --debug` to not have to restart when files change
* [ ] Check back in on protractor 2.0.0 to see if it will work with pages with no `ng-app`
* [ ] Add back CI tasks (if needing to be different) when Bamboo is up
* [ ] When bower task occurs, write any main js files into karma.conf.js
* [ ] Add new angular router option when available
* [ ] Make provider component
