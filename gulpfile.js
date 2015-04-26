var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var jsFiles = ['js/*.js'];

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
    return gulp.src(jsFiles)
        .pipe(concat('js/index.js'))
        .pipe(gulp.dest('static'))
        .pipe(rename('js/index.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('static'));
});

gulp.task('watch', function() {
    gulp.watch(jsFiles, ['lint', 'scripts']);
});

gulp.task('default', ['lint', 'html', 'scripts', 'watch']);
