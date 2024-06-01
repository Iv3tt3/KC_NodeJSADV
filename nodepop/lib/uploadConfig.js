const multer = require('multer');
const path = require('node:path');

// configure storing files to disk
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const storagePath = path.join(__dirname, '..', 'public', 'images');
    callback(null, storagePath);
  },
  filename: function(req, file, callback) {
    try {
      const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
      callback(null, filename);
    } catch (error) {
      callback(error);
    }
  }
})

// configure upload
const upload = multer({ storage: storage });

module.exports = upload;
