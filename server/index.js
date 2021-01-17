const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  console.log(ctx.request.url);
  if(ctx.request.url == '/admin'){
    ctx.body = 'Hello World1';
  } else {
    ctx.body = 'Hello World2';
  }
  
});

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
});