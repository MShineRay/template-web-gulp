import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import en from './lang/en'
import ar from './lang/ar'

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'en',
  messages: {
    en,
    ar,
  },
})

/**
 * 应用场景：Toast.loading 国际化提示语
 * @param languageKey
 * @param language
 * @returns {*}
 */
window.feGetI18N = function (languageKey, language) {
  return window['feGetI18N__' + language]
    ? window['feGetI18N__' + language](languageKey)
    : languageKey
}
export default i18n
