"use strict"
const prod = require('./webpack.prod.conf');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = Object.assign({},prod,{
    plugins: [
        ...prod.plugins,
        new BundleAnalyzerPlugin()
    ],
});