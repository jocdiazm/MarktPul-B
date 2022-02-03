const { Router } = require('express');
const multer = require('multer');
const {
  uploadSingleHandler,
  uploadArrayHandler,
} = require('./upload.controller');

const router = Router();
const upload = multer({ dest: './temp' });

router.post('/file', upload.single('imageMain'), uploadSingleHandler);
router.post('/product', upload.single('image'), uploadSingleHandler);
router.post('/products', upload.any(), uploadArrayHandler);
router.post('/market', upload.single('image'), uploadSingleHandler);
router.post('/avatar', upload.single('picture'), uploadSingleHandler);

module.exports = router;
