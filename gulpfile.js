var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var strictify = require('strictify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var jsFiles = ['./js/*.js'];

gulp.task('lint', function() {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('html', function() {
    return gulp.src('html/index.html')
        .pipe(concat('index.html'))
        .pipe(gulp.dest('static'));
});

gulp.task('scripts', function() {
    return browserify('./js/init.js')
        .transform([
            reactify,
            strictify
        ])
        .bundle()
        .pipe(source('index.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./static/js'));
});

gulp.task('login', function() {
    return browserify('./js/login.js')
        .transform([
            reactify,
            strictify
        ])
        .bundle()
        .pipe(source('login.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./static/js'));
});

gulp.task('htmllogin', function() {
    return gulp.src('html/login.html')
        .pipe(concat('login.html'))
        .pipe(gulp.dest('static'));
});


gulp.task('watch', function() {
    gulp.watch(jsFiles, ['lint', 'scripts', 'login']);
    gulp.watch('./html/*.html', ['html']);
});

gulp.task('default', ['lint', 'html', 'htmllogin', 'scripts', 'login']);
