'use stick';

var gulp = require('gulp');
var gulpZip = require('gulp-zip');
var gulpUnzip = require('gulp-unzip');
var q = require('d3-queue');
var exec = require('child-process-promise').exec;
var spawn = require('cross-spawn');

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

gulp.task('save', ['zip'], function (cb) {
    spawn.sync('git', ['add', '.'], {stdio: 'inherit'});
    spawn.sync('git', ['commit', '-m', '\'save\''], {stdio: 'inherit'});
    spawn.sync('git', ['push', 'origin', 'master:master'], {stdio: 'inherit'});
    cb();
});