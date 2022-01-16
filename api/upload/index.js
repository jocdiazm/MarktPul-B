const { Router }= require('express')
const multer = require('multer')
const { uploadSingleHandler } = require('./upload.controller')

const router = Router()
const upload = multer({ dest:'./temp'})

// app.use(multer({storage}).single('product'));

router.post('/file', upload.single('image'), uploadSingleHandler )

module.exports = router
