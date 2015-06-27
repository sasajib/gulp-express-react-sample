var gulp = require('gulp');
var gUtil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');

var server = require('gulp-express');
var plumber = require('gulp-plumber');

gulp.task('client', function () {
    'use strict';

    var bundler = watchify(browserify({
            entries: ['src/client/js/app.jsx'],
            extension: ['.jsx'],
            transform: [reactify],
            debug: true,
            cache: {},
            packageCache: {},
            fullPaths: true
        })),
        build = function (file) {
            if (file) {
                gUtil.log('recompiling ' + file);
            }
            return bundler.bundle()
                .on('error', gUtil.log.bind(gUtil, 'browserify error'))
                .pipe(source('main.js'))
                .pipe(gulp.dest('./src/client/js/'));
        };
    build();
    bundler.on('update', build);
});

gulp.task('server:init', function () {
    'use strict';
    gulp.src('src/server/**/*.js').pipe(plumber());
    server.run(['src/server/express.js']);
    server.notify({});
});

gulp.task('server:watch', function () {
    'use strict';
    gulp.src('src/server/**/*.js').pipe(plumber());
    gulp.watch('src/server/**/*.js', function (event) {
        console.info('restarting express');
        server.run();
        server.notify(event);
    });
});
gulp.task('server', ['server:init', 'server:watch']);

gulp.task('default', ['server', 'client']);




