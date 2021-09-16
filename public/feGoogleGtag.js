/**
 * 根据环境动态加载google库
 * TODO
 *  Global site tag (gtag.js) - Google Analytics
 * 公共账号 trackId
 * dev：G-dev
 * test：G-test
 * online: G-online
 */
;(function () {
  //根据域名动态设置 trackId
  var envTrackId = ''
  switch (window.location.hostname) {
    case 'dev.hostname.com':// dev
      envTrackId = 'G-dev'
      break;
    case 'test.hostname.com':// test
      envTrackId = 'G-test'
      break;
    case 'online.hostname.com':// online
      envTrackId = 'G-online'
      break;
    default :
      envTrackId = 'G-online'
      break;
  }

  try {
    var t = new Date().getTime()
    var f = document.createElement('script')
    f.type = 'text/javascript'
    f.async = true
    f.src = 'https://www.googletagmanager.com/gtag/js?id=' + envTrackId + '&t=' + t
    var e = document.getElementsByTagName('script')[0]
    e.parentNode.insertBefore(f, e)
  } catch (error) {
  }
})()
