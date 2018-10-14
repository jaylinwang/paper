'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var header = require('gulp-header');
var concat = require('gulp-concat');
var addSrc = require('gulp-add-src');
var uglify = require('gulp-uglify');
var prefix = require('gulp-autoprefixer');
var zip = require('gulp-zip');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();

var PORT = {
  GHOST: '2368',
  BROWSERSYNC: '3000'

};

//# Files
//
var dist = (function () {
  return {
    name: pkg.name,
    css: 'assets/css',
    js: 'assets/js',
    image: 'assets/images',
    font: 'assets/fonts',
    vendor: 'assets/vendors',
  };
}());

var src = (function () {
  return {
    sass: {
      main: 'src/scss/app.scss',
      files: ['src/scss/**/**']
    },
    css: {
      main: []
    },
    js: {
      main: ['src/js/common.js']
    },
    font: {
      main: 'src/fonts/**/**'
    },
    vendor: {
      main: 'src/vendors/**/**'
    }
  };
}());

var banner = (function () {
  return ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version <%= pkg.version %>',
    ' * @link    <%= pkg.homepage %>',
    ' * @author  <%= pkg.author.name %> (<%= pkg.author.url %>)',
    ' * @license <%= pkg.license %>',
    ' */'
  ].join('\n');
}());

//# tasks
gulp.task('css', function () {
  gulp.src(src.css.main)
    .pipe(plumber())
    .pipe(addSrc(src.sass.main))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(prefix())
    .pipe(concat(pkg.name + '.min.css'))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(dist.css));
});

gulp.task('js', function () {
  gulp.src(src.js.main)
    .pipe(plumber())
    .pipe(concat(pkg.name + '.min.js'))
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest(dist.js));
});

gulp.task('vendor', function () {
  gulp.src(src.vendor.main)
    .pipe(gulp.dest(dist.vendor));
});

gulp.task('font', function () {
  gulp.src(src.font.main)
    .pipe(gulp.dest(dist.font));
});

gulp.task('server', function () {
  browserSync.init({
    proxy: 'http://127.0.0.1:#{PORT.GHOST}'
  });
});

gulp.task('zip', ['css', 'js', 'vendor', 'font'], function () {
  var targetDir = 'dist/';
  var themeName = require('./package.json').name;
  var filename = themeName + '.zip';

  return gulp.src([
      '**',
      '!node_modules',
      '!node_modules/**',
      '!dist',
      '!dist/**',
      '!src',
      '!src/**',
  ])
      .pipe(zip(filename))
      .pipe(gulp.dest(targetDir));
});

gulp.task('build', ['css', 'js', 'vendor', 'font']);

gulp.task('default', function () {
  gulp.start(['build']);
  gulp.watch(src.js.main, ['js']);
  gulp.watch(src.sass.files, ['css']);
  gulp.watch(src.font.main, ['font']);
  gulp.watch(src.vendor.main, ['vendor']);
});
