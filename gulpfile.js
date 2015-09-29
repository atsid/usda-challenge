'use strict';

var gulp = require('gulp');
var path = require('path');
var webserver = require('gulp-webserver');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var ghPages = require('gulp-gh-pages');

var config = {
  src: {
    all: './',
    siteFiles: ['index.html', 'src/**/*', 'bower_components/**/*'],
    build: 'dist',
    deploy: 'dist/**/*',
    js: 'src/js/**/*.js'
  }
};

/*
 * jshint to check for syntax errors
 */
gulp.task('lint', function () {
  return gulp.src(config.src.js)
      .pipe(jshint({lookup: true}))
      .pipe(jshint.reporter('default'));
});

/*
 * Clean out the build directory so we don't have any excess junk
 */
gulp.task('clean', function (cb) {
  rimraf(config.src.build, cb);
});

/*
 * Copy static content into a single point for deployment, without the extra cruft.
 */
gulp.task('site', function () {
  return gulp.src(config.src.siteFiles, { 'base': '.' }).pipe(gulp.dest(config.src.build));
});

/*
 * Runs all the required tasks to create distributable site package in output folder.
 */
gulp.task('build', function (cb) {
  return runSequence(
      'site',
      cb);
});

//helper for the web server task
function serve(reload) {
  return webserver({
    path: '/usda-challenge',
    livereload: reload,
    defaultFile: 'index.html',
    open: false
  });
}

/*
 * Live-reload server to make the app available (localhost:8000) and auto-refresh when files change.
 */
gulp.task('serve', function() {
  gulp.src(config.src.all)
      .pipe(serve(true));
});

/*
 * Web server to host the app, but from output folder, replicating live deploy with built resources.
 */
gulp.task('serve-dist', function() {
  gulp.src(config.src.build)
      .pipe(serve(false));
});

/*
 * Push the built site content to public gh-pages.
 */
gulp.task('ghpages', function () {
  return gulp.src(config.src.deploy)
      .pipe(ghPages());
});

/**
 * Full deploy cycle.
 */
gulp.task('deploy', function (cb) {
  runSequence(
      'clean',
      'build',
      'ghpages',
      cb);
});

gulp.task('default', ['lint', 'serve']);