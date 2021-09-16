/**
 * 设置语言
 */

const mixin = {
  data() {
    return {
      lang: 'en',
      langName: 'English',
      langList: [
        { text: 'English', value: 'en' },
        { text: 'Arabic', value: 'ar' },
      ],
    }
  },
  computed: {
    isAr() {
      return this.$i18n.locale === 'ar'
    },
  },
  methods: {
    localeChange(type = '') {
      console.log(type)
      localStorage.setItem('locale', type)
      this.$i18n && (this.$i18n.locale = type)
      this.$i18n && this.$set(this.$i18n, 'locale', type)
      this.lang = type
      this.langName = this.$_getLangName(type)
      if (type === 'ar') {
        document.body.style.direction = 'rtl'
      } else {
        document.body.style.direction = 'ltr'
      }
      document.querySelector('html').setAttribute('lang', type)
      window.__fe__lang__ = type
    },
    $_getLangName(lang) {
      for (let i = 0, len = this.langList.length; i < len; i++) {
        if (lang === this.langList[i].value) {
          return this.langList[i].text
        }
      }
      return 'English'
    },
  },
  mounted() {
    const locale = localStorage.getItem('locale') || 'en'
    this.localeChange(locale)
  },
}

export default mixin
