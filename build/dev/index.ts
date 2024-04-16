import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import path from 'path';

import { connectionServer } from './connection-server';
import { initMiddleServer } from './middle-server';
import { proparehost } from './utils/propare-host';


const runDevServer = async () => {
  const webpackConfig = require(path.resolve(__dirname, '../../webpack.config.js'));
  const compiler = webpack(webpackConfig);

  // 启动代理服务
  const { port: proxyPort, host: proxyHost } = await initMiddleServer();

  // 启动连接服务（用于将用户切换的代理地址更新到私有变量）
  await connectionServer();

  const devServerPort = await proparehost();

  const devServerOptions = {
    ...(webpackConfig.devServer || {}),
    open: true,
    port: devServerPort,
    client: {
      progress: true,
      overlay: {
        warnings: true,
      },
    },
    proxy: {
      '/api': {
        target: `${proxyHost}:${proxyPort}`,
        changeOrigin: true,
      },
    },
  };
  const server = new webpackDevServer(devServerOptions, compiler);

  server.start();
};

runDevServer();