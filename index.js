import Koa from "koa";
import Router from "koa-router";
import BodyParser from "koa-bodyparser";
import Logger from "koa-logger";
import fetch from "node-fetch";

const app = new Koa();
const router = new Router();

app.use(BodyParser());
app.use(Logger());

router
  .get("/", async (ctx, next) => (ctx.body = "hello world!"))
  .post("/", async ctx => {
    const { api } = ctx.request.body;
    await fetch(api)
      .then(res => res.json())
      .then(json => (ctx.body = json))
      .catch(err => (ctx.body = err));
  });
// .all("/", async ctx => (ctx = "Success!"));

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
