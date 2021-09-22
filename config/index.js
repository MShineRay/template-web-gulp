const path = require('path')
// var template = require("art-template")

function resolveDev(dir) {
  console.log(path.join(__dirname, '../src/', dir))
  return path.join(__dirname, '../src/', dir)
}

function resolveBuild(dir) {
  console.log(path.join(__dirname, '../dist/', dir))
  return path.join(__dirname, '../dist/', dir)
}

module.exports = {
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
  useEslint: true,
  productionZip: false
}
