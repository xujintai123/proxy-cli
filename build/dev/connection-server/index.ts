import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa2-cors';
import { proxyDataManager } from './data/proxy-data';

const app = new Koa();
const router = new Router();

const connectionServerPort = 25561;

export async function createConnectionServer() {
    // Koa允许跨域
    app.use(cors());
    app.use(router.routes()).use(router.allowedMethods());

    router.get('/change/proxy', async (ctx) => {
        const { target } = ctx.query;
        // 测试用例中的 api server为 'http://127.0.0.1:3001'、'http://127.0.0.1:3002'， 方便调试在这写为固定值
        if (
            ![
                'http://127.0.0.1:3001',
                'http://127.0.0.1:3002',
                'http://localhost:3001',
                'http://localhost:3002',
            ].includes(target as string)
        ) {
            ctx.response.type = 'application/json';
            ctx.body = {
                msg: '您输入的代理地址有误！',
                code: 100,
            };
            return;
        }

        proxyDataManager.changeTarget(ctx.query.target as string);

        ctx.response.type = 'application/json';
        ctx.body = {
            msg: '切换代理地址成功！',
            code: 200,
        };
    });

    app.listen(connectionServerPort, () => {
        console.log(`server started on ${connectionServerPort}`);
    });
}
