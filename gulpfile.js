'use stick';

var gulp = require('gulp');
var gulpZip = require('gulp-zip');
var gulpUnzip = require('gulp-unzip');
var q = require('d3-queue');
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

gulp.task('save', ['zip'], function (cb) {

    function due(command, next) {
        console.log('Run command: ' + command);
        exec(command)
            .then(function (result) {
                console.log(result.stdout, result.stderr);
                next();
            })
            .catch(function (err) {
                console.error('ERROR: ', err);
            });
    }

    q.queue()
        .defer(due, 'git add .')
        .defer(due, 'git commit -m \'save\'')
        .defer(due, 'git push origin master:master')
        .awaitAll(function (error) {
            if (error) throw error;
            console.log("Goodbye!");
            cb();
        });
});