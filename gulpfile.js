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
    exec('git add . && git commit -m \'save\'')
        .then(function (result) {
            console.log(result.stdout, result.stderr);
            cb();
            exec('git push origin master:master')
                .then(function (result) {
                    console.log(result.stdout, result.stderr);
                })
                .catch(function (err) {
                    console.error('ERROR: ', err);
                });
        })
        .catch(function (err) {
            console.error('ERROR: ', err);
        });
});