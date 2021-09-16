// const config = require('./config')
// const path = require('path')
// const gulp = require('gulp')
// const gulpif = require('gulp-if')
// const htmlmin = require('gulp-htmlmin')
// const fileinclude = require('gulp-file-include')
// const sass = require('gulp-sass')
// const postcss = require('gulp-postcss')
// const cleanCSS = require('gulp-clean-css')
// const plumber = require('gulp-plumber')
// const notify = require('gulp-notify') //显示报错信息和报错后不终止当前gulp任务。
// const cache = require('gulp-cache') //使用"gulp-cache"只压缩修改的图片，没有修改的图片直接从缓存文件中读取
// const imagemin = require('gulp-imagemin')
// const pngquant = require('imagemin-pngquant')
// const uglify = require('gulp-uglify')
// const eslint = require('gulp-eslint')
// const stripDebug = require('gulp-strip-debug')
// const babel = require('gulp-babel')
// const sequence = require('gulp-sequence')
// const zip = require('gulp-zip')
// const del = require('del')

import config from './config/index.js'
import path from 'path'
import gulp from 'gulp'
import gulpIf from 'gulp-if'
import gulpHtmlmin from 'gulp-htmlmin'
import gulpFileInclude from 'gulp-file-include'
// import gulpCleanCss from 'gulp-clean-css'
import gulpPlumber from 'gulp-plumber'
import gulpNotify from 'gulp-notify'
import gulpCache from 'gulp-cache'
import imagemin from 'gulp-imagemin'
import imageminPngquant from 'imagemin-pngquant'
import gulpUglify from 'gulp-uglify'
import gulpEslint from 'gulp-eslint'
import gulpStripDebug from 'gulp-strip-debug'
import gulpBabel from 'gulp-babel'
import gulpSequence from 'gulp-sequence'
import gulpZip from 'gulp-zip'
import del from 'del'
import browserSync from 'browser-sync'

// server
// const browserSync = require('browser-sync').create()
const reload = browserSync.reload

// NODE_ENV development
const env = process.env.NODE_ENV || 'development'
const condition = env === 'production'

function respath(dir) {
  console.log('--------' + path.join(__dirname, './', dir) + '-------------')
  return path.join(__dirname, './', dir)
}

function onError(error) {
  const title = error.plugin + ' ' + error.name
  const msg = error.message
  const errContent = msg.replace(/\n/g, '\\A ')

  gulpNotify.onError({
    title: title,
    message: errContent,
    sound: true, //为true时，控制台报错，会在电脑右下角有弹窗提示
  })(error)

  //在监听的文件发生变化后自动编译
  this.emit('end')
}

function cbTask(task) {
  return new Promise((resolve/*, reject*/) => {
    del(respath('dist')).then(paths => {
      console.log(
        `
      +++++++++++++++++++++++++++++
        删除dist目录
      +++++++++++++++++++++++++++++` + paths
      )
      gulpSequence(task, () => {
        console.log(
          `
        +++++++++++++++++++++++++++++
          所有静态资源同步编译完成
        +++++++++++++++++++++++++++++` + task
        )
        resolve()
      })
    })
  })
}

gulp.task('html', () => {
  return gulp
    .src(config.dev.html)
    .pipe(gulpPlumber(onError))
    .pipe(
      gulpFileInclude({
        prefix: '@',
        basepath: respath('src/include/'), //引用文件路径
        indent: true, // 保留文件的缩进
      })
    )
    .pipe(
      gulpIf(
        condition,
        gulpHtmlmin({
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true,
        })
      )
    )
    .pipe(gulp.dest(config.build.html))
})

gulp.task('styles', () => {
  // return gulp.src(config.dev.styles)
  //   .pipe(plumber(onError))
  //   .pipe(sass({
  //     outputStyle: 'compressed'
  //   })).on('error', sass.logError)
  //   .pipe(gulpif(condition, gulpCleanCss({debug: true})))
  //   .pipe(postcss('./.postcssrc.js'))
  //   .pipe(gulp.dest(config.build.styles))
})

gulp.task('images', () => {
  return gulp
    .src(config.dev.images)
    .pipe(gulpPlumber(onError))
    .pipe(
      gulpCache(
        imagemin({
          progressive: true, // 无损压缩JPG图片
          svgoPlugins: [{ removeViewBox: false }], // 不移除svg的viewbox属性
          use: [imageminPngquant()], // 使用pngquant插件进行深度压缩
        })
      )
    )
    .pipe(gulp.dest(config.build.images))
})

gulp.task('eslint', () => {
  return gulp
    .src(config.dev.script)
    .pipe(gulpPlumber(onError))
    .pipe(gulpIf(condition, gulpStripDebug()))
    .pipe(gulpEslint({ configFle: './.eslintrc' }))
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError())
})

const useEslint = config.useEslint ? ['eslint'] : []
gulp.task('script', useEslint, () => {
  return gulp
    .src(config.dev.script)
    .pipe(gulpPlumber(onError))
    .pipe(
      gulpIf(
        condition,
        gulpBabel({
          presets: ['env'],
        })
      )
    )
    .pipe(gulpIf(condition, gulpUglify()))
    .pipe(gulp.dest(config.build.script))
})

gulp.task('assets', useEslint, () => {
  return gulp.src(config.dev.assets).pipe(gulp.dest(config.build.assets))
})

gulp.task('static', () => {
  return gulp.src(config.dev.static).pipe(gulp.dest(config.build.static))
})

gulp.task('clean', () => {
  del('./dist').then(paths => {
    console.log('清空dist目录:\n', paths.join('\n'))
  })
})

gulp.task('watch', () => {
  gulp.watch(config.dev.allhtml, ['html']).on('change', reload)
  gulp.watch(config.dev.styles, ['styles']).on('change', reload)
  gulp.watch(config.dev.script, ['script']).on('change', reload)
  gulp.watch(config.dev.images, ['images']).on('change', reload)
  gulp.watch(config.dev.static, ['static']).on('change', reload)
})

gulp.task('zip', () => {
  return gulp
    .src(config.zip.path)
    .pipe(gulpPlumber(onError))
    .pipe(gulpZip(config.zip.name))
    .pipe(gulp.dest(config.zip.dest))
})

gulp.task('server', () => {
  const task = ['html', 'styles', 'script', 'assets', 'images', 'static']
  cbTask(task).then(() => {
    browserSync.init(config.server)
    console.log('项目启动成功.\n')
    gulp.start('watch')
  })
})

gulp.task('build', () => {
  const task = ['html', 'styles', 'script', 'assets', 'images', 'static']
  cbTask(task).then(() => {
    console.log('编译完成.\n')

    if (config.productionZip) {
      gulp.start('zip', () => {
        console.log('压缩完成.\n')
      })
    }
  })
})

gulp.task('default')
