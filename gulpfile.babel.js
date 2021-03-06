// import path from 'path'
import del from 'del'
import gulp, { src, dest, series, parallel } from 'gulp'
import gulpBabel from 'gulp-babel'
import gulpUglify from 'gulp-uglify'
import gulpRename from 'gulp-rename'
import gulpIf from 'gulp-if'
import gulpHtmlMin from 'gulp-htmlmin'
import gulpFileInclude from 'gulp-file-include'
import gulpCleanCss from 'gulp-clean-css'
import gulpPlumber from 'gulp-plumber'
import gulpNotify from 'gulp-notify'
const gulpSass = require('gulp-sass')(require('sass'))
import gulpPostcss from 'gulp-postcss'
import gulpZip from 'gulp-zip'
import gulpCache from 'gulp-cache'
import gulpImagemin from 'gulp-imagemin'
import imageminPngquant from 'imagemin-pngquant'
import gulpEslint from 'gulp-eslint'
import gulpStripDebug from 'gulp-strip-debug'
// import gulpSequence from 'gulp-sequence'
// import browserSync from 'browser-sync'
// import gulpConcat from 'gulp-concat'
import gulpConnect from 'gulp-connect'
import gulpOpen from 'gulp-open'
import os from 'os'

import config from './config/index.js'

// NODE_ENV development
const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production'
const taskEslint = series(eslint, function(cb) {
  console.log('taskEslint: end')
  cb()
})

const taskNoop = function(cb){
  cb()
}

const useEslint = config.useEslint ? taskEslint : taskNoop
function onError(error) {
  const title = error.plugin + ' ' + error.name
  const msg = error.message
  const errContent = msg.replace(/\n/g, '\\A ')

  gulpNotify.onError({
    title: title,
    message: errContent,
    sound: true //为true时，控制台报错，会在电脑右下角有弹窗提示
  })(error)

  //在监听的文件发生变化后自动编译
  this.emit('end')
}
function images() {
  console.log('taskImages: begin')
  return src(config.dev.images)
    .pipe(gulpPlumber(onError))
    .pipe(
      gulpCache(
        gulpImagemin({
          progressive: true, // 无损压缩JPG图片
          svgoPlugins: [{ removeViewBox: false }], // 不移除svg的viewbox属性
          use: [imageminPngquant()] // 使用pngquant插件进行深度压缩
        })
      )
    )
    .pipe(gulp.dest(config.build.images))
}
const taskImages = series(images, function(cb) {
  console.log('taskImages: end')
  cb()
})

function eslint() {
  console.log('taskEslint: begin')
  return src(config.dev.script)
    .pipe(gulpPlumber(onError))
    .pipe(gulpIf(isProduction, gulpStripDebug()))
    .pipe(gulpEslint({ configFle: './.eslintrc.js' }))
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError())
    .pipe(gulpConnect.reload())
}

function scripts(){
  console.log('taskScripts: begin')
  return src(config.dev.script)
    .pipe(gulpPlumber(onError))
    .pipe(
      gulpIf(
        isProduction,
        gulpBabel({
          presets: ['env'],
        })
      )
    )
    .pipe(gulpIf(isProduction, gulpUglify()))
    .pipe(gulp.dest(config.build.script))
    .pipe(gulpConnect.reload())

}
const taskScript = series(useEslint, scripts, function(cb) {
  console.log('taskScripts: end')
  cb()
})

function assets(){
  return gulp.src(config.dev.assets)
    .pipe(gulp.dest(config.build.assets))
    .pipe(gulpConnect.reload())

}

const taskAssets = series(useEslint, assets, function(cb){
  console.log('taskAssets: end')
  cb()
})

function staticTask(){
  console.log('taskStatic: begin')
  return gulp.src(config.dev.static)
    .pipe(gulp.dest(config.build.static))
    .pipe(gulpConnect.reload())

}

const taskStatic = series(staticTask, function(cb){
  console.log('taskStatic: end')
  cb()
})

function taskWatch(){
  gulp.watch(config.dev.allhtml, taskHtml)//.on('change', gulpConnect.reload())
  gulp.watch(config.dev.styles, taskStyles)//.on('change', gulpConnect.reload())
  gulp.watch(config.dev.script, taskScript)//.on('change', gulpConnect.reload())
  gulp.watch(config.dev.images, taskImages)//.on('change', gulpConnect.reload())
  gulp.watch(config.dev.static, taskStatic)//.on('change', gulpConnect.reload())
  // gulp.watch('./src/**/*.*', series(taskBuild, taskReload))//监听src下所有文件
}

// `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。
// 它仍然可以被用在 `series()` 组合中。
const taskClean = function(cb) {
  console.log('taskClean: begin')
  del('./dist').then(() => {
    console.log('taskClean: end')
    cb()
  })
}

function html() {
  console.log('taskHtml: begin')
  return src(config.dev.html)
    .pipe(gulpPlumber(onError))
    .pipe(
      gulpFileInclude({
        prefix: '@',
        basepath: 'src/include/', //引用文件路径
        indent: true // 保留文件的缩进
      })
    )
    .pipe(
      gulpIf(
        isProduction,
        gulpHtmlMin({
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true
        })
      )
    )
    .pipe(gulp.dest(config.build.html))
    .pipe(gulpConnect.reload())
}
const taskHtml = series(html, function(cb) {
  console.log('taskHtml: end')
  cb()
})


function styles() {
  console.log('taskStyles: begin')
  return src(config.dev.styles)
    .pipe(gulpPlumber(onError))
    .pipe(gulpSass({
      outputStyle: 'compressed'
    })).on('error', gulpSass.logError)
    .pipe(gulpIf(isProduction, gulpCleanCss({ debug: true })))
    .pipe(gulpPostcss('./postcss.config.js'))
    .pipe(dest(config.build.styles))
    .pipe(gulpConnect.reload())
}
const taskStyles = series(useEslint, styles, function(cb) {
  console.log('taskStyles: end')
  cb()
})

function zip() {
  console.log('taskZip: begin')
  return src(config.zip.path)
    .pipe(gulpPlumber(onError))
    .pipe(gulpZip(config.zip.name))
    .pipe(dest(config.zip.dest))
}

const taskZip = series(zip, function(cb) {
  console.log('taskZip: end')
  cb()
})

// `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。
// 它也仍然可以被用在 `series()` 组合中。
function buildBegin(cb) {
  // body omitted
  console.log('taskBuild: begin')
  cb()
}

const taskBuild = parallel(
  buildBegin,
  taskHtml,
  taskStyles,
  taskScript,
  taskAssets,
  taskImages,
  taskStatic,
  function(cb) {
    console.log('taskBuild: end')
    if (config.productionZip) {
      taskZip(cb)
    } else {
      cb()
    }
  }
)


function uglifyJS() {
  console.log('taskUglifyJS: begin')
  return src('src/*.js')
    .pipe(gulpBabel())
    .pipe(dest('dist/'))
    .pipe(gulpUglify())
    .pipe(gulpRename({ extname: '.min.js' }))
    .pipe(dest('dist/'))
    .pipe(gulpConnect.reload())
}
const taskUglifyJS = series(useEslint, uglifyJS, function(cb) {
  console.log('taskUglifyJS: end')
  cb()
})


function defaultBegin(cb) {
  console.log('taskDefault: begin')
  cb()
}
const taskDefault = series(defaultBegin, taskClean, taskBuild, gulp.series(taskWatch), function(cb) {
  console.log('taskDefault: end')
  cb()
})


function taskConnect(cb){
  console.log('taskConnect: begin')
  gulpConnect.server({
    root: 'dist',
    livereload: true
  }, function startedCallback(){
    console.log('taskConnect: end')
    cb()
  })
}

// const taskReload = function(){
//   return src('./src/**/*.*')
//     .pipe(gulpConnect.reload())
// }


function taskOpen(){
  console.log('taskOpen: begin')
  const browser = os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : (
      os.platform() === 'win32' ? 'chrome' : 'firefox'))
  const options = {
    uri: 'http://localhost:8080',
    app: browser
  }
  return src('./dist/index.html')
    .pipe(gulpOpen(options))
}

function devBegin(cb){
  console.log('taskDev: begin')
  cb()
}

const taskDev = series(devBegin, taskConnect, taskOpen, taskDefault)

exports.dev = taskDev

exports.uglifyJS = taskUglifyJS
exports.build = taskBuild
exports.default = taskDefault
