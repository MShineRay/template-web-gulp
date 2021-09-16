'use strict'
exports.__esModule = true
const config = {
  'Try Again': 'حاول مجددا',
  OK: 'حسنا',
  Loading: 'تحميل',
}
exports.default = config

window.feGetI18N__ar = function (langKey) {
  return config[langKey] ? config[langKey] : langKey
}
