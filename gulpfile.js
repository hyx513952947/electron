const gulp = require("gulp");
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const {exec} = require('child_process');
const electron = require('electron-connect').server.create();
const clean = require('gulp-clean');

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
    cb();
});
gulp.task('webpack-react', function (cb) {
    console.log("开始打包！react");
    webpack(webpackConfig, function (err) {
        err && console.log(err);
        cb(err);
    })
});

gulp.task("reload",function(cb){
    console.log("重新导入！")
    electron.reload()
    cb()
});
gulp.task("restart",function(cb){
    console.log("重新启动！")
    electron.reload()
    cb()
});
gulp.task("start",function(cb){
    console.log("启动！");
    electron.start();
    cb()
});
gulp.task("watch-assets", function (cb) {
    //监听对应资源文件的变化，reload
    gulp.watch('./app/src/assets/**/*',gulp.series(['copy','reload']));
    console.log("监听文件资源");
    cb()
});

gulp.task("watch-electron-js", function (cb) {
    //监听对应代码变化 主线程代码, reload
    gulp.watch('./app/src/assets/**/*',gulp.series(['copy','reload']));
    gulp.watch('./app/src/*.html',gulp.series(['copy','reload']));
    gulp.watch('./app/src/*.js',gulp.series(['copy','reload']));
    console.log("监听主线程资源");
    cb()
});

gulp.task("watch-react-js", function (cb) {
    //监听渲染线程的js代码变化，重新 webpack  后 reload
    gulp.watch(['./app/src/componments/**/*','./app/src/router/**/*'],gulp.series(['webpack-react','reload']));
    console.log("监听渲染线程资源");
    cb();
});

gulp.task("watch",gulp.parallel(["watch-assets","watch-react-js","watch-electron-js"]),function (cb) {
    console.log("所有监听开始")
    cb()
});
gulp.task("clean", function (cb) {
    gulp.src("./app/build/*")
        .pipe(clean());
    cb();
    console.log("清除历史文件！");
});
gulp.task("default", gulp.series("clean","copy","webpack-react","start","watch"));