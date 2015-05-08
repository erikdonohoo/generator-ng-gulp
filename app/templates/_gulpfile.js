'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');
var reload = browserSync.reload;<% if (useLess) { %>
var less = require('gulp-less');<% } %>
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var karma = require('karma');
var htmlToJs = require('gulp-ng-html2js');
var headerfooter = require('gulp-headerfooter');
var merge = require('merge2');
var util = require('gulp-util');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var path = require('path');
var fs = require('fs');
var replace = require('gulp-replace');
var _ = require('lodash');
var autoprefixer = require('gulp-autoprefixer');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var del = require('del');
var RevAll = require('gulp-rev-all');
var imagemin = require('gulp-imagemin');
var protractor = require('gulp-protractor');
var http = require('http');
var express = require('express');
var sync = require('gulp-sync')(gulp);
var server = http.createServer(express().use(express.static(__dirname + '/dist/')));
var watch = require('gulp-watch');

// Add js/css files to bower:css and bower:js blocks in index.html
gulp.task('bower', function () {
	gulp.src('./app/index.html')
		.pipe(wiredep({}))
		.pipe(gulp.dest('./app'));
});

// Process css
<% if (!useLess) { %>var cssGlob = ['app/app.css'];<% } else { %>var cssGlob = ['app/app.less', 'app/modules/**/*.less'];<% } %>
gulp.task('css', function () {
	gulp.src(cssGlob)<% if (useLess) { %>
		.pipe(less())<% } %>
		.pipe(concat('main.css'))
		.pipe(autoprefixer({
			remove: false
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('app/'))
		.pipe(reload({stream: true}));
});

// Put all html partials into a single file
gulp.task('templates', function () {
	return gulp.src('./app/modules/**/*.html')
		.pipe(minifyHtml())
		.pipe(htmlToJs({
			moduleName: '<%= appName %>.templates',
			prefix: 'modules/'
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('./.generated'));
});

// Put all JS in one file
var allPageJs = ['app/app.js', 'app/modules/**/*.+(controller|filter|directive|service|constant|decorator|factory|value|config|run).js'];
var moduleJs = 'app/modules/**/*.module.js';
var nonModuleJs = 'app/modules/**/*.+(controller|filter|directive|service|constant|decorator|factory|value|config|run).js';
gulp.task('js-watch', ['js'], reload);
gulp.task('js', ['templates'], function () {
	return gulp.src(['app/app.js', moduleJs, nonModuleJs])
		.pipe(jscs())
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'))
		.pipe(headerfooter('(function (angular, undefined) {\n', '})(angular);\n'))
		.pipe(gulp.dest('./.generated'));
});

// Run tests
function getFolders(dir) {
	return fs.readdirSync(dir)
		.filter(function (file) {
			return fs.statSync(path.join(dir, file)).isDirectory();
		});
}

function concatTestDir(dir) {
	var folders = getFolders(dir);
	var streams = [];
	folders.map(function (folder) {
		var stream = gulp.src([
			'./' + path.join(dir, folder, '/*.module.js'),
			'./' + path.join(dir, folder, '/*.+(controller|filter|directive|service|constant|decorator|factory|value|config|run).js'),
			'./' + path.join(dir, folder, '/*.spec.js')
		]).pipe(concat(folder + '.concat.js'))
			.pipe(replace('\'use strict\';', ''))
			.pipe(headerfooter('(function () {\'use strict\';\n', '})();\n'))
			.pipe(gulp.dest('.generated/' + dir + '/' + folder));

		streams.push(stream);
		streams.push(concatTestDir(dir + '/' + folder));
	});

	return merge().add(streams);
}

gulp.task('concat-test', function () {
	return concatTestDir('./app/modules');
});

var reRunTest = false;
gulp.task('test', sync.sync(['clean', ['templates', 'concat-test', 'js'], 'test-run']));
gulp.task('test-run', function (done) {
	// Debug?
	var dev = false, debug = false, coverage = false, config = {};
	if (process.argv.indexOf('--dev') !== -1) dev = true;
	if (process.argv.indexOf('--debug') !== -1) debug = true;
	if (process.argv.indexOf('--coverage') !== -1) coverage = true;

	if ([dev, debug, coverage].filter(function (val) { return val; }).length > 1) {
		util.log(util.colors.red.bold('ERROR'));
		util.log('Only one arg is allowed at a time');
		return;
	}

	if (coverage || dev) {
		config = {
			preprocessors: {
				'.generated/app/**/*.concat.js': ['coverage']
			},
			reporters: ['coverage'],
			coverageReporter: {
				reporters: [{
					type: 'html',
					dir: 'coverage',
					subdir: 'html'
				}, {
					type: 'text',
					dir: 'coverage',
					subdir: 'text'
				}]
			}
		};
	}

	karma.server.start(_.extend({
		configFile: __dirname + '/karma.conf.js',
		singleRun: !debug
	}, config), function () {
		if (dev && !reRunTest) {
			reRunTest = true;
			browserSync.init({
				server: {
					baseDir: 'coverage/html'
				}
			});
			gulp.watch('coverage/html/**', {cwd: './'}, reload);
			gulp.watch(['app/modules/**/*.spec.js'].concat(allPageJs), ['test']);
		}
		done();
	});
});

gulp.task('clean', function (done) {
	del([
		'dist/**',
		'.tmp/**',
		'.generated/**'
	], done);
});

// Build task
gulp.task('build', ['build-templates'], function () {

	var revAll = new RevAll({
		dontRenameFile: [/^\/index.html/g]
	});

	// Get all dist files now
	return gulp.src('.tmp/**')
		.pipe(revAll.revision())
		.pipe(gulp.dest('dist/'));
});
gulp.task('build-templates', ['build-setup'], function () {
	return gulp.src(['.tmp/scripts/scripts.js', '.generated/templates.js'])
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('.tmp/scripts'));
});
gulp.task('build-setup', sync.sync(['clean', ['css', 'js', 'bower'], 'build-setup-run']));
gulp.task('build-setup-run', function () {

	return merge(

		// usemin
		gulp.src('app/index.html')
			.pipe(usemin({
				css: [minifyCSS()],
				localcss: [minifyCSS()],
				js: [uglify()],
				localjs: [uglify()],
				html: [minifyHtml()]
			}))
			.pipe(gulp.dest('.tmp/')),

		// Copy other files
		gulp.src('app/version.json')
			.pipe(gulp.dest('.tmp/')),<% if (useFontAwesome) { %>

		// If you use any bower component that
		// has anything other than js/css
		// You will need to copy it to a good dest here
		gulp.src('app/bower_components/font-awesome/fonts/*')
			.pipe(gulp.dest('.tmp/fonts')),<% } %>

		// All other assets kept in assets
		gulp.src('app/assets/**', {base: 'app'})
			.pipe(imagemin())
			.pipe(gulp.dest('.tmp/'))
	);

});

// Protractor
gulp.task('protractor:update', ['build'], protractor.webdriver_update);
gulp.task('protractor:server', function (cb) {
	server.listen(9999, cb);
});
gulp.task('protractor', ['protractor:update', 'protractor:server'], function (done) {
	gulp.src(['test/e2e/**/*.js'], {read: false})
		.pipe(protractor.protractor({
			configFile: './protractor.conf.js',
			args: ['--baseUrl', 'http://localhost:' + server.address().port]
		})).on('error', function (e) {
			server.close();
			console.log(e);
			done();
		}).on('end', function () {
			server.close();
			done();
		});
});

// Reload browser on changes
gulp.task('reload', function () {
	reload();
});
gulp.task('serve', ['css', 'js', 'bower'], function () {
	browserSync.init({
		server: {
			baseDir: ['.generated', 'app']
		},
		port: 9000
	});

	// Reload on js/css/html changes
	gulp.watch([
		'index.html',
		'modules/**/*.html',
		'**/*.+(controller|filter|directive|service|constant|decorator|factory|value|config|run).js'
	], {cwd: 'app'}, reload);
	watch(allPageJs, function () {
		gulp.start('js-watch');
	});
	watch(cssGlob, function () {
		gulp.start('css');
	});
	gulp.watch('bower.json', ['bower']);
});
