const Router = require('koa-router');
const multer = require('koa-multer');
const { files } = require('../controllers');
const { verifyToken } = require('../middlewares');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = new Router({ prefix: '/file' });

router.post('/', verifyToken, upload.single('file'), async (ctx) => {
  await files.upload({
    userId: ctx.request.userId,
    buffer: ctx.request.req.file.buffer,
    name: ctx.request.req.file.originalname,
  });
  ctx.body = 'File uploaded';
});

module.exports = router;
