# generator-ng-gulp

This generator aims to follow the best angular coding practices and make it easy to have a fully tested and deployable app.

## Usage

Make sure you have `yo` and `generator-ng-gulp` installed

`npm install -g generator-ng-gulp yo`  
`yo ng-gulp <app-name>`

You can replace `<app-name>` with your app's name, or it will use the name of the folder it is in when being run.

### Options

These are limited right now, but plan to grow.  These are the questions the generator asks

* Use angular-material
* Use a router (ngRoute/ui-router)
* Use LESS
* Commit bower_components
* Use font-awesome

## Gulpfile features

**gulp serve**

Serve the app in dev mode, with live css reloading injection as well as for all html/js.  Uses the best live reload available with browser-sync.

**gulp test**

Run all unit tests

**gulp test --debug**

Run unit tests in debug mode so you can click the `debug` button in the browser that pops up.

**gulp test --dev**

Unit test dev mode where all spec and js files are watched and tests are re-run automatically.  Also, your coverage is displayed with browser-sync and updated automatically as you work

**gulp build**

Build all js/css/html/images etc for production.  Placed into `dist/` folder.

**gulp protractor**

Run all e2e tests.

## Sub Generators

There are a couple sub-generators to help with keeping your app structured

All components and sub-modules go in the `app/modules` folder.  Inside this folder is a `routes` folder where all routes are kept.

You can generate sub-modules or routes with sub-generators

### Module Generator

`yo ng-gulp:module <module-path-with-name>`

This generator will allow you to make the following angular components:

* component
* directive
* value
* constant
* config
* service
* factory
* filter
* controller
* decorator
* run

You are presented with options as to which ones you want.  If you decide later you want more, just re-run the sub-generator with the same `<module-path-with-name>` and choose the piece you want.

`<module-path-with-name>` looks something like this:

`core/api/friends`

This would make a friends module in the folder `app/modules/core/api/friends`

`components/navbar`

This would make a navbar module in the folder `app/modules/components/navbar`

`table`

This would make a table module in the folder `app/modules/table`

If these folder don't already exist, they are created.  If you are making extra components in a folder already containing a `*.module.js` file, then it will only add the pieces needed.  Each angular component asked for comes with associated test files, and these new scripts are attached to the index.html automatically.

### Route Generator

> Make sure you designate in the main generator that you want routing if you plan on using this generator

`yo ng-gulp:route <route-name> <route-path-string>`

`<route-name>` gives the route folder a name, as well as the state name if using `ui-router`.

`<route-path-string>` is the string to use for the path. (ie. `/applications/:id`, or `/stuff/:stuffId/thing`)

All routes get added to the `app/modules/routes` folder and automatically added to the `index.html`.  If running `gulp serve` these routes should be immediately visitable.

A new e2e test is created for each route and placed in `test/e2e`.

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
* [ ] When bower task occurs, write any main js files into karma.conf.js
* [ ] Add new angular router option when available
* [ ] Make provider component
* [ ] Page reload after JS change occurs before files are completely written
