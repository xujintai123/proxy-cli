import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import path from 'path';
import { merge as webpackMerge } from 'webpack-merge';

import { createConnectionServer } from './connection-server';
import { createMiddleServer } from './middle-server';
import { proparehost } from './utils/propare-host';

const runDevServer = async () => {
    const webpackConfig = require(path.resolve(__dirname, '../../webpack.config.js'));

    // 启动代理服务
    const { port: proxyPort, host: proxyHost } = await createMiddleServer();

    const { connectionServerPort } = await createConnectionServer();

    const compiler = webpack(
        webpackMerge(webpackConfig, {
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.CONNECTION_PORT': JSON.stringify(connectionServerPort),
                }),
            ],
        }),
    );

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
