
import Koa from 'koa';
import Router from 'koa-router';

import { proparehost } from './utils/propare-host';

const app = new Koa();
const router = new Router();


app.use(router.routes()).use(router.allowedMethods());


router.get("/api/text", async ctx => {
    ctx.response.type = 'application/json';
    ctx.body = {
        msg: "Hello serverA Interfaces"
    };
});


async function initServer() {
    const port = await proparehost();


    app.listen(port, () => {
        console.log(`server started on ${port}`);
    })
}

initServer();