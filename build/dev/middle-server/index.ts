
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { proparehost } from '../utils/propare-host';

import { proxyDataManager } from '../connection-server/data/proxy-data';

const app = express();


export async function initMiddleServer() {
    const port = await proparehost();

    const proxy = createProxyMiddleware({
        target: proxyDataManager.target,
        router: () => {
            console.log('proxyDataManager.target:', proxyDataManager.target);
            return proxyDataManager.target;
        },
        changeOrigin: true,
    });

    // 通配符匹配 https://www.jianshu.com/p/3fa7c6a941f4
    app.use('*', proxy);


    app.listen(port, () => {
        console.log(`MiddleServer started on ${port}`);
    });

    return {
        port,
        host: 'http://127.0.0.1', // 中间代理服务的host固定为 http://127.0.0.1 不会有什么影响
    }
}