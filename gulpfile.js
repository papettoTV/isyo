'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

var b = browserify({
  entries: ['./client/public/js/index.js'],
  // transform: ['babelify'],
  cache: {},
  packageCache: {},
  plugin: [watchify]
})
.transform(babelify,{presets: ["react",'es2015']})
.on('update', bundle)
.on('log', gutil.log)

function bundle(){
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error')  )
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./client/public/'))
    .pipe(gulp.dest('./client/public/dist/'));
}

gulp.task('js', bundle);
gulp.task('default', ['js']);
