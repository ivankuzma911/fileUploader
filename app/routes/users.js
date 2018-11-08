const Router = require('koa-router');

const router = new Router({ prefix: '/users' });
const { users } = require('../controllers');

router.post('/register', users.register);

router.post('/login', users.login);

module.exports = router;
