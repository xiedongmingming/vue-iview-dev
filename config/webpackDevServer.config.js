'use strict';

// WEBPACKDEVSERVER配置

const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const config = require('./webpack.dev.config');
const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = function (proxy, allowedHost) {// WEBPACKDEV服务器配置


	console.log("测试配置属性值: " + !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true')


	return {
		disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
		// disableHostCheck: true,
		compress: true,// 配置是否启用GZIP压缩

		clientLogLevel: 'none',// 配置客户端的日志等级: none、error、warning、info

		contentBase: paths.appPublic,
		// By default files from `contentBase` will not trigger a page reload.
		watchContentBase: false,
		// Enable hot reloading server. It will provide /sockjs-node/ endpoint
		// for the WebpackDevServer client so it can learn when the files were
		// updated. The WebpackDevServer client is included as an entry point
		// in the Webpack development configuration. Note that only changes
		// to CSS are currently hot reloaded. JS changes will refresh the browser.
		hot: true,
		inline: true,
		open: true, // 用于在DEVSERVER启动且第一次构建完时自动用我们的系统的默认浏览器去打开要开发的网页
		// openPage: 打开指定URL的网页
		// It is important to tell WebpackDevServer to use the same "root" path
		// as we specified in the config. In development, we always serve from /.
		publicPath: config.output.publicPath,
		// WebpackDevServer is noisy by default so we emit custom message instead
		// by listening to the compiler events with `compiler.plugin` calls above.
		quiet: true,
		// Reportedly, this avoids CPU overload on some systems.
		// https://github.com/facebookincubator/create-react-app/issues/293
		watchOptions: {
			ignored: /node_modules/,
		},
		// Enable HTTPS if the HTTPS environment variable is set to 'true'
		https: protocol === 'https',
		host: host,
		overlay: false,
		historyApiFallback: {
			// Paths with dots should still use the history fallback.
			// See https://github.com/facebookincubator/create-react-app/issues/387.
			disableDotRule: true,
		},
		public: allowedHost,
		proxy,
		setup(app) {
			// This lets us open files from the runtime error overlay.
			// This service worker file is effectively a 'no-op' that will reset any
			// previous service worker registered for the same host:port combination.
			// We do this in development to avoid hitting the production cache if
			// it used the same host and port.
			// https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
			app.use(noopServiceWorkerMiddleware());
		},
	};
};
