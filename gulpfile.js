'use strict';

/* ------------------------------------------------------------ *\
    # Plugins
\* ------------------------------------------------------------ */
var gulp = require('gulp');

// // templates
var panini = require('panini');

// // styles
// var postcss = require('gulp-postcss');
// var postcssPresetEnv = require('postcss-preset-env');
// var postcssImport = require('postcss-import');
// var cssnano = require('gulp-cssnano');
// var sourcemaps = require('gulp-sourcemaps');

// // scripts
// var uglify = require('gulp-uglify');
// var jshint = require('gulp-jshint');

// // utilities
// var concat = require('gulp-concat');
// var rename = require('gulp-rename');
var del = require("del");

// paths
var paths = {
	markup: {
		src: 'src/markup/',
		dist: 'dist/'
	},
	styles: {
		src: 'src/styles/',
		dist: 'dist/styles/'
	},
	scripts: {
		src: 'scripts/source',
		dist: 'scripts/build'
	}
};

/* ------------------------------------------------------------ *\
    # Task: Handle static pages
\* ------------------------------------------------------------ */
gulp.task('clean:html', function() {
	return del(paths.markup.dist + '*.html');
});

gulp.task('pages', function() {
	return gulp.src(paths.markup.src + '/pages/**/*.html')

	.pipe(panini({
		root: paths.markup.src + '/pages/',
		layouts: paths.markup.src + '/layouts/',
		partials: paths.markup.src + '/partials/'
	}))
	.pipe(gulp.dest(paths.markup.dist));
});

gulp.task('pages:refresh', function(done) {
	panini.refresh();
	done();
});

gulp.task('build:html', function() {
	gulp.series('clean:html', 'pages:refresh', 'pages');
});

/* ------------------------------------------------------------ *\
    # Task: Handle styles
\* ------------------------------------------------------------ */
// gulp.task('build:css:dev', function(done) {
// 	var plugins = [
// 		postcssImport,
// 		postcssPresetEnv
// 	];

// 	return gulp.src(paths.styles.src + '/style.css')

// 	.pipe(sourcemaps.init())
// 	.pipe(postcss(plugins))
// 	.on('error', done)
// 	.pipe(rename('build.css'))
// 	.pipe(sourcemaps.write('.'))
// 	.pipe(gulp.dest(paths.styles.dist));
// });

// gulp.task('build:css:prod', function(done) {
// 	var plugins = [
// 		postcssImport,
// 		postcssPresetEnv
// 	];

// 	return gulp.src(paths.styles.src + '/style.css')

// 	.pipe(sourcemaps.init())
// 	.pipe(postcss(plugins))
// 	.on('error', done)
// 	.pipe(rename('build.css'))
// 	.pipe(cssnano())
// 	.pipe(sourcemaps.write('.'))
// 	.pipe(gulp.dest(paths.styles.dist));
// });

/* ------------------------------------------------------------ *\
    # Task: Combine and compress scripts
\* ------------------------------------------------------------ */
// gulp.task('build:js:dev', function() {
// 	return gulp.src([paths.scripts.src + '/plugins/*.js', paths.scripts.src + '/main.js'])

// 	.pipe(concat('build.js'))
// 	.pipe(gulp.dest(paths.scripts.dist));
// });

// gulp.task('build:js:prod', function() {
// 	return gulp.src([paths.scripts.src + '/plugins/*.js', paths.scripts.src + '/main.js'])

// 	.pipe(concat('build.js'))
// 	.pipe(uglify({compress: {hoist_funs: false, hoist_vars: false}}))
// 	.pipe(gulp.dest(paths.scripts.dist));
// });

/* ------------------------------------------------------------ *\
    # Task: Check main js for errors and optimizations
\* ------------------------------------------------------------ */
// gulp.task('validate:js', function() {
// 	return gulp.src(paths.scripts.src + '/main.js')

// 	.pipe(jshint())
// 	.pipe(jshint.reporter('jshint-stylish', { beep: true }));
// });

/* ------------------------------------------------------------ *\
    # Task: Watch files for changes
\* ------------------------------------------------------------ */
// gulp.task('watch', function() {
// 	gulp.watch(paths.markup.src + '/**/*', ['build:html']);
// 	gulp.watch(paths.styles.src + '/**/*.css', ['build:css:dev']);
// 	gulp.watch(paths.scripts.src + '/**/*.js', ['validate:js', 'build:js:dev']);
// });

/* ------------------------------------------------------------ *\
    # Task: Default
\* ------------------------------------------------------------ */
// gulp.task('default', ['build:html', 'build:css:prod', 'validate:js', 'build:js:prod']);