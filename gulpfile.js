var _ = require('lodash');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsx = require('jshint-jsx');
//var uglify = require('gulp-uglify');
var browserify = require('browserify');
var strictify = require('strictify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var scss = require('gulp-sass');
var packageJSON  = require('./package');
var jshintConfig = packageJSON.jshintConfig;

jshintConfig.lookup = false;

var jsFiles = [
    './models/*.js',
    './views/components/dongs/*.js',
    './views/components/footer/*.js',
    './views/components/login/*.js',
    './views/components/server-list/*.js',
    './views/components/topbar/*.js'
];
var coreFiles = [
    './*.js',
    './core/*.js',
    './core/helpers/*.js'
];

gulp.task('lint', function() {
    gulp.src(jsFiles)
        .pipe(jshint(
            _.extend({}, jshintConfig, { linter: jsx.JSXHINT })
        ))
        .pipe(jshint.reporter('default'));
    return gulp.src(coreFiles)
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    browserify('./views/components/login/index.js')
        .transform([
            reactify,
            strictify
        ])
        .bundle()
        .pipe(source('login.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./static/js'));

    return browserify('./views/components/dongs/index.js')
        .transform([
            reactify,
            strictify
        ])
        .bundle()
        .pipe(source('index.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./static/js'));
});

gulp.task('styles', function() {
    return gulp.src('./styles/app.scss')
        .pipe(scss())
        .pipe(gulp.dest('./static/css'));
});

gulp.task('watch', function() {
    gulp.watch(jsFiles.concat(coreFiles), ['lint', 'scripts']);
});

gulp.task('default', ['lint', 'scripts', 'styles']);
