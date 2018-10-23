const Koa = require('koa');
const router = require('./routes');
const logger = require('./libs/logger');

const app = new Koa();

app.use(router());

app.listen(3000, () => logger.info('server started 3000'));
