const combineRouters = require('koa-combine-routers');
const fileRouter = require('./files');
const userRouter = require('./users');

const router = combineRouters(
  fileRouter,
  userRouter,
);

module.exports = router;
