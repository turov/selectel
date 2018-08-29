var gulp = require('gulp');
var server = require('browser-sync').create();
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var del = require('del');
var cssmin = require('gulp-csso');
var jsmin = require('gulp-minify');
var imagemin = require('gulp-imagemin');
var run = require('run-sequence');

gulp.task('html', function () {
  gulp.src('source/pug/index.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('source'))
});

gulp.task('style', function () {
  gulp.src('source/stylus/style.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest('source/css'))
    .pipe(cssmin())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest("source/css"));
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('source/img'));
});

gulp.task('jsmin', function () {
  gulp.src('source/js/*.js')
    .pipe(jsmin())
    .pipe(gulp.dest('source/js'))
});

gulp.task('del-min', function () {
  return del('source/js/*-min.js');
});

gulp.task('pug-watch', ['html'], function (done) {
  server.reload();
  done();
});
gulp.task('stylus-watch', ['style'], function (done) {
  server.reload();
  done();
});

gulp.task('serve', ['html', 'style'], function () {
  server.init({
    server: 'source/'
  });

  gulp.watch('source/stylus/**/*.styl', ['stylus-watch']);
  gulp.watch('source/pug/**/*.pug', ['pug-watch']);
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task("copy", function () {
  return gulp.src([
    'source/*.html',
    'source/img/**',
    'source/css/**',
    'source/js/*.js'
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task('build', function (done) {
  run(
    'clean',
    'html',
    'style',
    'del-min',
    'jsmin',
    'copy',
    done
  )
  ;
});

gulp.task('gh-pages', function () {b
  gulp.src('build/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('docs'))
});