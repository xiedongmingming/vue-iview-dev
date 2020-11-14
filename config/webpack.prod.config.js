// WEBPACK配置文件

const webpack = require('webpack');

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const merge = require('webpack-merge');

const webpackBaseConfig = require('./webpack.base.config.js');

const fs = require('fs');

// fs.open('./src/config/env.js', 'w', function (err, fd) {
//
//     const buf = 'export default "production";';
//
//     fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {
//
//     });
//
// });

fs.open('./src/config/env.js', 'w', function (err, fd) {

	const buf = 'export default "production";';

	fs.write(fd, buf, 0, 'utf-8', function (err, written, buffer) {

	});

});

module.exports = merge(webpackBaseConfig, {
	output: {
		filename: 'js/[name].[hash].js',
		chunkFilename: 'js/[name].[hash].chunk.js'
	},
	module: {
		rules: [{
			test: /\.(woff|svg|eot|ttf)\??.*$/,
			loader: 'file-loader',
			options: {
				name: '/assets/font/[hash].[ext]',
			}
		},
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'assets/css/[name].[hash].css',
			allChunks: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			filename: 'js/vendors.[hash].js'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new HtmlWebpackPlugin({
			title: "个人综合管理系统",
			filename: './index.html',
			template: '!!ejs-loader!./src/template/index.ejs',
			inject: false
		})
	]
});