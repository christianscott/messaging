const gulp = require('gulp'),
      sass = require('gulp-sass'),
      jade = require('gulp-jade');

const browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'jade'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/*.scss", ['sass']);
    gulp.watch("src/*.jade", ['jade']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
    gulp.watch("dist/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

gulp.task('jade', function() {
  return gulp.src("src/*.jade")
        .pipe(jade())
        .pipe(gulp.dest("dist"))
});

gulp.task('default', ['serve']);
