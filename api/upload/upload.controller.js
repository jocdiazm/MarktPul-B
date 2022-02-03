const fs = require('fs');
const cloudinary = require('cloudinary').v2;

async function uploadSingleHandler(req, res) {
  console.log(req);
  const { file, body } = req;
  const options = {};
  if (body?.folder) {
    options.folder = body.folder;
  }
  try {
    const result = await cloudinary.uploader.upload(file.path, options);
    fs.unlinkSync(file.path);
    res.status(201).json(result);
  } catch (error) {
    console.log('error', error);
  }
}

async function uploadArrayHandler(req, res) {
  const { files } = req;
  const results = [];
  for (const file of files) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'Markt-Pul/Products',
      });
      fs.unlinkSync(file.path);
      results.push(result);
    } catch (error) {
      console.log('error', error);
    }
  }
  return res.status(201).json(results);
}

module.exports = {
  uploadSingleHandler,
  uploadArrayHandler,
};
