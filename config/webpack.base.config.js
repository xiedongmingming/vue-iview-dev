// WEBPACK基础配置文件

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');// CSS加载器

module.exports = {
	entry: {// 所有模块的入口--WEBPACK从入口开始递归解析出所有依赖的模块
		main: './src/main',
		vendors: './src/vendors'
	},
	output: {// 将入口所依赖的所有模块打包成一个BUNDLE.JS输出
		// filename: 'bundle.js'
		path: path.join(__dirname, '../dist')
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						less: ExtractTextPlugin.extract({
							use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
							fallback: 'vue-style-loader'
						}),
						css: ExtractTextPlugin.extract({
							use: ['css-loader', 'autoprefixer-loader'],
							fallback: 'vue-style-loader'
						})
					}
				}
			},
			{
				test: /iview\/.*?js$/,
				loader: 'babel-loader'
			},
			{
				test: /vue-particles\/.*?js$/,
				loader: 'babel-loader'
			},
			{// ES6语法处理
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader?minimize', 'autoprefixer-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.less/,
				use: ExtractTextPlugin.extract({
					use: ['autoprefixer-loader', 'less-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(gif|jpg|png)\??.*$/,
				loader: 'file-loader',
				options: {
					name: '/assets/img/[hash].[ext]',
				}
			},
			{
				test: /\.(html|tpl)$/,
				loader: 'html-loader'
			}
		]
	},
	resolve: {// RESOLVE配置WEBPACK如何寻找模块所对应的文件
		extensions: ['.js', '.vue'],// 在导入语句没带文件后缀时WEBPACK会自动带上后缀去尝试访问文件是否存在
		alias: {// 通过别名来将原导入路径映射成一个新的导入路径
			// 通过$符号来缩小范围到只命中以关键字结尾的导入语句
			// 'react$': '/path/to/react.min.js'
			'vue': 'vue/dist/vue.esm.js',
			'@pages': path.join(__dirname, '../src/components/pages'),
			'@common': path.join(__dirname, '../src/components/common'),
			'@util': path.join(__dirname, '../src/libs'),
		}
	}
};