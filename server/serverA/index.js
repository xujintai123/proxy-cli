const Koa = require('koa');
const Router = require('koa-router');


const startServerA = () => {
    const app = new Koa();
    const router = new Router();

    const port = 3001;

    app.use(router.routes()).use(router.allowedMethods());

    router.get("/api/text", async ctx => {
        ctx.response.type = 'application/json';
        ctx.body = {
            msg: "Hello serverA Interfaces"
        };
    })


    app.listen(port, () => {
        console.log(`server started on ${port}`)
    })
}


module.exports = {
    startServerA,
}