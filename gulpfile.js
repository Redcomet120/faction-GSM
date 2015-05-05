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

var jsFiles = ['./js/*.js', './js/views/*.js', './js/models/*.js', './js/login/*.js'];

gulp.task('lint', function() {
    return gulp.src(jsFiles)
        .pipe(jshint({
            linter: jsx.JSXHINT
        }))
        .pipe(jshint.reporter('default'));
});

gulp.task('html', function() {
    return gulp.src('html/*.html')
        .pipe(gulp.dest('static'));
});

gulp.task('scripts', function() {
    browserify('./js/login/index.js')
        .transform([
            reactify,
            strictify
        ])
        .bundle()
        .pipe(source('login.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./static/js'));

    return browserify('./js/views/init.js')
        .transform([
            reactify,
            strictify
        ])
        .bundle()
        .pipe(source('index.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./static/js'));
});

gulp.task('watch', function() {
    gulp.watch(jsFiles, ['lint', 'scripts']);
    gulp.watch('./html/*.html', ['html']);
});

gulp.task('default', ['lint', 'html', 'scripts']);
