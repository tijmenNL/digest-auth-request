var gulp = require('gulp');
var wrap = require('gulp-wrap-umd');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var pump = require('pump');

gulp.task('clean', function(cb) {
	del(['dist/*']);
	return cb();
});

gulp.task('umd', ['clean'], function(cb) {
	pump([
		gulp.src('digestAuthRequest.js'),
		wrap({
			namespace: 'digestAuthRequest',
			exports: 'digestAuthRequest',
			deps: [
			    {
			        name: "crypto-js",
			        paramName: 'CryptoJS'
			    }]
		}),
		gulp.dest('dist')
	],
	uglify(),
	cb);
});

gulp.task('min', ['umd'], function(cb) {
	pump([
		gulp.src('dist/digestAuthRequest.js'),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest('dist')
	],
	cb);
});

gulp.task('build', ['min']);
gulp.task('default', ['build']);
