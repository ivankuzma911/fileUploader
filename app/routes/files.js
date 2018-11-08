const Router = require('koa-router');
const multer = require('koa-multer');
const { files } = require('../controllers');
const { verifyToken } = require('../middlewares');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = new Router({ prefix: '/file' });

router.get('/', verifyToken, files.list);
router.get('/:id', verifyToken, files.getById);

router.post('/encodeFiles', verifyToken, files.encodeFiles);
router.post('/', verifyToken, upload.single('file'), files.upload);


router.delete('/:id', verifyToken, files.deleteById);

module.exports = router;
