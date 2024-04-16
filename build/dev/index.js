const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const path = require('path');

const webpackConfig = require(path.resolve(__dirname, '../../webpack.config.js'));
const compiler = webpack(webpackConfig);

const devServerOptions = { ...webpackConfig.devServer, open: true };
const server = new webpackDevServer(devServerOptions, compiler);

const runServer = () => {
  console.log('Starting server...');
  server.start();
};

runServer();