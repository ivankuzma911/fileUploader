const Koa = require('koa');
const router = require('./routes');

const app = new Koa();

app.use(router());

app.listen(3000, () => console.log('server started 3000'));
