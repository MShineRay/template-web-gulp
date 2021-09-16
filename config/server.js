// const proxy = require('http-proxy-middleware')
// const { createProxyMiddleware } = require('http-proxy-middleware');
//
// const jsonProxy = createProxyMiddleware('/api', {
//   target: 'https://xxx/api',
//   changeOrigin: true,
//   pathRewrite: {
//     '^/api': '',
//   },
//   logLevel: 'debug',
// })

export default {
  server: {
    baseDir: './dist',
    // middleware: [jsonProxy],
  },
  open: true,
  ui: false,
  ghostMode: false,
  port: '9527',
}
