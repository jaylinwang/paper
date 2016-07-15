'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var header = require('gulp-header');
var concat = require('gulp-concat');
var addSrc = require('gulp-add-src');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();

var PORT = {
    GHOST: '2368',
    BROWSERSYNC: '3000'

};

//# Files
//
var dist = (function() {
    return {
        name: pkg.name,
        css: 'assets/dist/css',
        js: 'assets/dist/js',
        image: 'assets/dist/images',
        font: 'assets/dist/fonts'
    };
}());

var src = (function() {
    return {
        sass: {
            main: 'assets/src/scss/main.scss',
            files: ['assets/src/scss/**/**']
        },
        css: {
            main: []
        },
        js: {
            main: ['assets/src/js/page.js', 'assets/src/js/control.js']
        },
        image: {
            files: ['assets/src/images/**/**']
        },
        font: {
            files: ['assets/src/fonts/**/**']
        }

    };
}());

var banner = (function() {
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
//
gulp.task('css', function() {
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

gulp.task('js', function() {
    gulp.src(src.js.main)
        .pipe(plumber())
        .pipe(concat(pkg.name + '.min.js'))
        .pipe(uglify())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(dist.js));
});

gulp.task('image', function() {
    gulp.src(src.image.files)
        .pipe(imagemin())
        .pipe(gulp.dest(dist.image));

});

gulp.task('font', function() {
    gulp.src(src.font.files)
        .pipe(gulp.dest(dist.font));

});

gulp.task('server', function() {
    browserSync.init({
        proxy: 'http://127.0.0.1:#{PORT.GHOST}'
    });
});

gulp.task('build', ['css', 'js', 'image', 'font']);

gulp.task('default', function() {
    gulp.start(['build']);
    gulp.watch(src.js.main, ['js']);
    gulp.watch(src.sass.files, ['css']);
    gulp.watch(src.font.files, ['font']);
    gulp.watch(src.image.files, ['image']);
});