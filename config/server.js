const { createProxyMiddleware } = require('http-proxy-middleware')

const jsonProxy = createProxyMiddleware('/api', {
  target: 'http://localhost',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  },
  logLevel: 'debug'
})

module.exports = {
  server: {
    baseDir: './dist',
    middleware: [jsonProxy]
  },
  open: true,
  ui: false,
  ghostMode: false,
  port: '9527'
}
