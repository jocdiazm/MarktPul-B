const fs = require('fs')
const cloudinary = require('cloudinary').v2

async function uploadSingleHandler(req, res) {
  const { file } = req
  console.log('file.path', file.path)
  try{
    const result = await cloudinary.uploader.upload(file.path, { folder:'Markt-Pul/Products'})
    console.log('image', result.url)
    fs.unlinkSync(req.file.path)
    res.status(200).json(result)
  }catch(error){
    res.status(500).json(error)
  }
  res.send(req.file)
}

module.exports = {
  uploadSingleHandler
}
