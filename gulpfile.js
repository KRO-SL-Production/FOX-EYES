'use stick';

var gulp = require('gulp');
var gulpZip = require('gulp-zip');
var gulpUnzip = require('gulp-unzip');
var q = require('queue')();
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

    function due(command) {
        return function (cb) {
            exec(command)
                .then(function (result) {
                    console.log(result.stdout, result.stderr);
                    cb();
                })
                .catch(function (err) {
                    console.error('ERROR: ', err);
                });
        }
    }

    q.push(
        due('git add .'),
        due('git commit -m \'save\''),
        due('git push origin master:master')
    );
    q.start(function (err) {
        cb();
    });
});