const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const {exec} = require("child_process");

gulp.task('dev', function (done) {

    const stream = nodemon({
        script: 'bin/www',
        ext: 'js scss',
        ignore: [
        ],
        exec: 'node --inspect=127.0.0.1:9235',
        tasks: [],
        done: done
    });


    stream
        .on('restart', function () {
            console.log('restarted!');
        })
        .on('crash', function () {
            console.log('Application has crashed!');
            stream.emit('restart', 10); // restart the server in 10 seconds
        });
});
