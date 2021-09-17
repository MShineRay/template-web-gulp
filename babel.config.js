// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }]
  ],
  env: {
    'test': {
      'plugins': [
        '@babel/plugin-transform-modules-commonjs',
        'transform-es2015-modules-commonjs',
        'syntax-dynamic-import'
      ]// fix:  SyntaxError: Unexpected token 'export'
    }
  }
}
