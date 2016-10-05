var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sass = require('gulp-sass');

gulp.task('js', function(){
  gulp.src(['ng/module.js', 'ng/**/*.svc.js','ng/**/*.js'])
  .pipe(concat('app.js'))
  // .pipe(ngAnnotate())
  // .pipe(uglify())
  .pipe(gulp.dest('assets'))
});

gulp.task('styles', function(){
  gulp.src('css/main.sass')
  .pipe(sass())
  .pipe(gulp.dest('assets/styles'))
})

gulp.task('watch:js', ['js'], function(){
  gulp.watch(['ng/**/*.*.js', 'ng/**/*.js'], ['js']);
})

gulp.task('watch:css', function(){
  gulp.watch('css/**/*.sass', ['styles']);
})

gulp.task('dev', ['watch:css', 'watch:js']);


gulp.task('prod', ['js', 'styles']);
gulp.task('default', ['js', 'styles', 'dev']);
