"use strict";
const base = require("./webpack.base.conf");
const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = Object.assign({}, base, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimizer: [
      new TerserPlugin({        //压缩js
        cache: true,
        parallel: true,
        sourceMap: true
      }),
    ]
  },
  plugins: [
    //限定查找 moment/locale 上下文里符合 /zh-cn/ 表达式的文件，因此也只会打包这几种本地化内容
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "../dist")
    }),
    new CopyWebpackPlugin([
      { from: "public/" } //作用：把public里面的内容全部拷贝到编译目录
    ]),
    ...base.plugins
  ]
});
