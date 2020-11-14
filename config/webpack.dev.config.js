// WEBPACK配置文件

const webpack = require('webpack');

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const merge = require('webpack-merge');

const webpackBaseConfig = require('./webpack.base.config.js');

const fs = require('fs');

const autoMergeJs = require('../scripts/autoMergeJs');

// fs.open('../src/config/env.js', 'w', function(err, fd) {
//     const buf = 'export default "development";';
//     fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
// });

// fs.open('../src/config/env.js', 'w', function (err, fd) {
//
// 	const buf = 'export default "development";';
//
// 	fs.write(fd, buf, 0, 'utf-8', function (err, written, buffer) {
// 	});
//
// });

// fs.open('../src/config/env.js', 'w', function (err, fd) {
//
// 	const buf = 'export default "development";';
//
// 	fs.write(fd, buf, 0, 'utf-8', function (err, written, buffer) {
//
// 	});
//
// });

// const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = merge(webpackBaseConfig, {
	devtool: '#source-map',
	output: {
		publicPath: '/dist/',// 指定资源文引用的目录(如果你的资源存放在CDN上这里可以填CDN的网址)
		filename: '[name].js',
		chunkFilename: '[name].chunk.js'
	},
	module: {
		rules: [
			{
				test: /\.(woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=2048'
			},
		]
	},
	plugins: [
		new autoMergeJs(),
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({// 所有页面都会用到的公共代码被提取到COMMON代码块中
			name: 'vendors',
			filename: 'vendors.js'
		}),
		new HtmlWebpackPlugin({// 打包输出HTML
			title: "个人综合管理系统",
			// 两个主要作用:
			// 1. 为HTML文件中引入的外部资源如SCRIPT、LINK动态添加每次COMPILE后的HASH防止引用缓存的外部文件问题
			// 2. 可以生成创建HTML入口文件(比如单页面可以生成一个HTML文件入口).配置N个HTML-WEBPACK-PLUGIN可以生成N个页面入口
			filename: './index.html', // 输出的HTML的文件名称
			// 特别注意：添加EJS-LOADER
			template: '!!ejs-loader!./src/template/index.ejs',// HTML模板所在的文件路径--根据自己指定的模板文件来生成特定的HTML文件: html jade ejs hbs
			favicon: path.resolve('./assets/favicon.ico'),// ICON(浏览器缓存ICON)--><link rel="shortcut icon" href="example.ico">
			// inject: false
			// INJECT有四个值: true body head false
			// true:  默认值(SCRIPT标签位于HTML文件的BODY底部)
			// body:  SCRIPT标签位于HTML文件的BODY底部
			// head:  SCRIPT标签位于HTML文件的HEAD中
			// false: 不插入生成的JS文件(这个几乎不会用到的)
		})
	]
});