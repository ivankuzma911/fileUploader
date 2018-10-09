const Router = require('koa-router');

const router = new Router({ prefix: '/file' });

router.get('/', async (ctx) => {
  ctx.body = 'file routes /';
});

module.exports = router;
