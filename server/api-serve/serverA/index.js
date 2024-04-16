const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
// const cors = require('koa2-cors');

const port = 3000;

// Koa允许跨域
// app.use(cors());
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