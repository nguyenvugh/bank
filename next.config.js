const withAntdLess = require("next-plugin-antd-less")

module.exports = withAntdLess({
  // optional
  modifyVars: { "@primary-color": "#04f" },
  // optional
  lessVarsFilePath: "./styles/global.less",
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},

  // Other Config Here...
  lessLoaderOptions: {
    javascriptEnabled: true,
  },

  webpack(config) {
    return config
  },

  future: {
    // if you use webpack5
    webpack5: true,
  },
})
