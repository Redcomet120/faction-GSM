var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsx = require('jshint-jsx');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var strictify = require('strictify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var scss = require('gulp-sass');

var jsFiles = [
    './js/*.js',
    './js/init/*.jsx',
    './js/models/*.js',
    './js/views/*.js',
    './js/views/dongs/*.js',
    './js/views/footer/*.js',
    './js/views/login/*.js',
    './js/views/topbar/*.js'
];

gulp.task('lint', function() {
    return gulp.src(jsFiles)
        .pipe(jshint({
            linter: jsx.JSXHINT
        }))
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    browserify('./js/views/login/index.js')
        .transform([
            reactify,
            strictify
        ])
        .bundle()
        .pipe(source('login.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./static/js'));

    return browserify('./js/views/dongs/index.js')
        .transform([
            reactify,
            strictify
        ])
        .bundle()
        .pipe(source('index.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./static/js'));
});

gulp.task('css', function() {
    return gulp.src('./css/app.scss')
        .pipe(scss())
        .pipe(gulp.dest('./static/css'));
});

gulp.task('watch', function() {
    gulp.watch(jsFiles, ['lint', 'scripts']);
});

gulp.task('default', ['lint', 'scripts', 'css', 'watch']);
