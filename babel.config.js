/**
 *
 * @reference https://youzan.github.io/vant/#/zh-CN/quickstart#fang-shi-yi.-zi-dong-an-xu-yin-ru-zu-jian-tui-jian
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        // style: true,
        // 指定样式路径
        // @reference https://youzan.github.io/vant/#/zh-CN/theme#an-xu-yin-ru-yang-shi-tui-jian
        style: name => `${name}/style/less`,
      },
      'vant',
    ],
  ],
}
