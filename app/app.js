const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const router = require('./routes');
const logger = require('./libs/logger');

const { errorHandler } = require('./middlewares');

const app = new Koa();

app.use(bodyParser());
app.use(errorHandler());
app.use(cors());

app.use(router());


app.listen(3000, () => logger.info('server started 3000'));
