const Router = require('koa-router');
const multer = require('koa-multer');
const { File } = require('../models').models;

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = new Router({ prefix: '/file' });

router.post('/', upload.single('file'), async (ctx) => {
  await File.create({ file: ctx.request.req.file.buffer });
  ctx.body = 'File uploaded';
});

module.exports = router;
