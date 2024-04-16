const Koa = require('koa');
const Router = require('koa-router');


const startServerB = () => {
    const app = new Koa();
    const router = new Router();

    const port = 3002;

    app.use(router.routes()).use(router.allowedMethods());

    router.get("/api/text", async ctx => {
        ctx.response.type = 'application/json';
        ctx.body = {
            msg: "Hello serverB Interfaces"
        };
    });


    app.listen(port, () => {
        console.log(`server started on ${port}`)
    });
}

module.exports =  {
    startServerB,
}