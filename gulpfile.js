const gulp = require("gulp");
const webpack = require('webpack');
const webpackConfig = require('./webpack.config')
/**
 * 复制任务：将 ./app/src
 */
gulp.task("copy", function (cb) {
    console.log("复制完毕");
    console.log(webpackConfig)
    cb();
});
gulp.task('webpack', function (cb) {
    console.log("开始打包！");
    webpack(webpackConfig,function (err) {
        err&&console.log(err);
        cb(err)
    })
});
gulp.task("build", gulp.series('webpack',function (cb) {
    console.log("构建完毕！打包操作！");
    cb();
}));

gulp.task("default", gulp.series("copy", "build"))