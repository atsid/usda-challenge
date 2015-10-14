'use strict';

var gulp = require('gulp');
var path = require('path');
var webserver = require('gulp-webserver');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var ghPages = require('gulp-gh-pages');
var bootlint  = require('gulp-bootlint');
var gutil = require("gulp-util");
var webpack = require("gulp-webpack");
var watch = require("gulp-watch");
var jsx = require("gulp-jsx");

var config = {
  src: {
    all: './',
    siteFiles: ['index.html', 'data/**/*'],
    build: 'build',
    deploy: 'build/**/*',
    jsDir: 'src/js',
    js: 'src/js/**/*.js'
  }
};

/*
 * jshint to check for syntax errors
 */
gulp.task('lint', function () {
  return gulp.src(config.src.js)
      .pipe(eslint({ useEslintrc: true }))
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
});

gulp.task('bootlint', function() {
    return gulp.src('./index.html')
        .pipe(bootlint());
});

/**
 * Packs the UI into a single file
 */
gulp.task("webpack", function(callback) {
    return gulp.src(config.src.js)
        .pipe(jsx({
            factory: 'React.createClass'
        }))
        .pipe(webpack({
            output: {
                filename: 'bundle.js'
            },
            module: {
                loaders: [{
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel'
                }]
            }
        }))
        .pipe(gulp.dest(config.src.build));
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
gulp.task('site', function (cb) {
    return gulp.src(config.src.siteFiles, { 'base': '.' }).pipe(gulp.dest(config.src.build));
});

/*
 * Runs all the required tasks to create distributable site package in output folder.
 */
gulp.task('build', function (cb) {
  return runSequence(
      'lint',
      'webpack',
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

/**
 * Starts the server for the "serve" task
 */
gulp.task('serve-server', function() {
  gulp.src(config.src.all)
      .pipe(serve(true));
});

/**
 * Watches the js for file changes and calls build
 */
gulp.task('watch', function() {
    watch(config.src.js, function() {
        runSequence('build');
    });
});

/*
 * Live-reload server to make the app available (localhost:8000) and auto-refresh when files change.
 */
gulp.task('serve', function(cb) {
    runSequence('watch', 'serve-server');
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

gulp.task('test', ['lint', 'bootlint']);

gulp.task('default', ['test', 'serve']);