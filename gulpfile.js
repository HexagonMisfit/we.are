var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('devSass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('devJs', function() {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('devHtml', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('devAssets', function() {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('watch', function() {
    gulp.watch(['src/sass/*.scss'], ['devSass']);
    gulp.watch(['src/js/*.js'], ['devJs']);
    gulp.watch(['src/*.html'], ['devHtml']);
    gulp.watch(['src/assets/**/*'], ['devAssets']);
});

gulp.task('devBuild', ['devHtml', 'devSass', 'devJs', 'devAssets']);

gulp.task('devWatch', ['devSass', 'devJs', 'devHtml', 'devAssets', 'watch']);