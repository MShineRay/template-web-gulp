// const server = require('./server')
// const path = require('path')

import server from './server.js'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// var template = require("art-template")

function resolveDev(dir) {
  console.log('------'+ path.join(__dirname, '../src/', dir))
  return path.join(__dirname, '../src/', dir)
}

function resolveBuild(dir) {
  console.log('+++++'+ path.join(__dirname, '../dist/', dir))
  return path.join(__dirname, '../dist/', dir)
}
const config = {
  dev: {
    static: './static/**/*',
    html: [resolveDev('/**/*.html'), '!./src/include/**/*'],
    allhtml: resolveDev('/**/*.html'),
    styles: resolveDev('static/styles/*.{scss,css}'),
    script: resolveDev('static/js/**/*.js'),
    assets: resolveDev('static/assets/**/*'),
    images: resolveDev('static/images/**/*.{png,jpg,gif,svg}'),
  },

  build: {
    static: resolveBuild('static'),
    html: resolveBuild(''),
    styles: resolveBuild('static/css'),
    script: resolveBuild('static/js'),
    assets: resolveBuild('static/assets'),
    images: resolveBuild('static/images'),
  },

  zip: {
    name: 'gulpProject.zip',
    path: resolveBuild('**/*'),
    dest: path.join(__dirname, '../')
  },

  // templateTag: {
  //   /**
  //    * 模板引擎设置项：
  //    * cache: 关闭模板引擎渲染缓存
  //    * openTag,closeTag: 修改开关标签
  //    */

  //   template.config("cache", false);
  //   template.config("openTag", "{{{");
  //   template.config("closeTag", "}}}");
  // }

  server,
  useEslint: false,
  productionZip: false
}

// module.exports = config
export default config
