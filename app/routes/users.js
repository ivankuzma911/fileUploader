const Router = require('koa-router');

const router = new Router({ prefix: '/users' });
const { users } = require('../controllers');

router.post('/register', async (ctx) => {
  await users.create(ctx.request.body);

  ctx.body = 'User succesfully created';
});

router.post('/login', async (ctx) => {
  const token = await users.login(ctx.request.body);
  ctx.body = token;
});

module.exports = router;
