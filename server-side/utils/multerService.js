const multer = require("multer");
const fs = require("fs");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, `${__dirname}/uploads`);
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "_" + Date.now() + "_" + file.originalname
      );
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const deleteFile = (filePath) => {
  fs.unlink(filePath, () => {
    console.log("file deleted");
  });
};

module.exports = {
  upload,
  deleteFile,
};
