const gulp = require("gulp");
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const process = require('process');
const {exec} = require('child_process');
require('electron');
// const electron = require('electron-connect').server.create();
const clean = require('gulp-clean');
let lastpid = 0;
/**
 * 复制任务：将 ./app/src
 */
gulp.task("copy", function (cb) {
    console.log("复制文件到build");
    gulp.src(['./app/src/*.js', './app/src/*index.html'])
        .pipe(gulp.dest('./app/build'));
    gulp.src(['./package.json'])
        .pipe(gulp.dest('./app/build'));
    gulp.src(["./app/src/assets/**/*"])
        .pipe(gulp.dest("./app/build/assets/"));
    gulp.src(["./app/src/node/**/*"])
        .pipe(gulp.dest("./app/build/node/"));
    cb();
});
gulp.task('webpack-react', function (cb) {
    console.log("开始打包！react");
    webpack(webpackConfig, function (err) {
        err && console.log(err);
        cb(err);
    })
});

gulp.task("reload", function (cb) {
    console.log("重新导入！")
    // electron.reload()
    start();
    cb()
});
gulp.task("restart", function (cb) {
    console.log("重新启动！")
    // electron.reload()
    start();
    cb()
});
gulp.task("start", function (cb) {
    console.log("启动！");
    // electron.start();
    start();
    cb()
});

function start() {
    // let p = exec('npm run start-electron', function (error, stdout, stderr) {
    //     if (error) {
    //         console.error('error: ' + error);
    //         return;
    //     }
    //     console.log('stdout: ' + stdout + ' pid:' + p.pid);
    //     console.log('stderr: ' + typeof stderr);
    // });
};
gulp.task("watch-assets", function (cb) {
    //监听对应资源文件的变化，reload
    gulp.watch('./app/src/assets/**/*', gulp.series(['copy']));
    console.log("监听文件资源");
    cb()
});

gulp.task("watch-electron-js", function (cb) {
    //监听对应代码变化 主线程代码, reload
    gulp.watch('./app/src/assets/**/*', gulp.series(['copy' ]));
    gulp.watch('./app/src/*.html', gulp.series(['copy' ]));
    gulp.watch('./app/src/*.js', gulp.series(['copy' ]));
    gulp.watch('./app/src/node/*.js', gulp.series(['copy']));
    console.log("监听主线程资源");
    cb()
});

gulp.task("watch-react-js", function (cb) {
    //监听渲染线程的js代码变化，重新 webpack  后 reload
    gulp.watch(['./app/src/componments/**/*', './app/src/router/**/*'], gulp.series(['webpack-react']));
    console.log("监听渲染线程资源");
    cb();
});

gulp.task("watch", gulp.parallel(["watch-assets", "watch-react-js", "watch-electron-js"]), function (cb) {
    console.log("所有监听开始")
    cb()
});
gulp.task("clean", function (cb) {
    gulp.src("./app/build/*")
        .pipe(clean());
    cb();
    console.log("清除历史文件！");
});
gulp.task("default", gulp.series("clean", "copy", "webpack-react", "start", "watch"));