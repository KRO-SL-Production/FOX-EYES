'use stick';

var gulp = require('gulp');
var gulpZip = require('gulp-zip');
var gulpUnzip = require('gulp-unzip');
var exec = require('child-process-promise').exec;

gulp.task('zip', function () {
    return gulp.src('src/design/*')
        .pipe(gulpZip('design.zip'))
        .pipe(gulp.dest('src'));
});

gulp.task('unzip', function () {
    return gulp.src('src/design.zip')
        .pipe(gulpUnzip())
        .pipe(gulp.dest('src/design'));
});

gulp.task('save', function (cb) {
    exec('git add . && git commit -m \'save\' && git push origin master:master')
        .then(function (result) {
            var stdout = result.stdout;
            var stderr = result.stderr;
            console.log('stdout: ', stdout);
            console.log('stderr: ', stderr);
        })
        .catch(function (err) {
            console.error('ERROR: ', err);
        })
});