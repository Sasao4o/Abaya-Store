const multer = require("multer");
const path = require('path');
const AppError = require("./AppError");
const fs = require("fs");
function getFileName(file) {
    let parts = file.originalname.split(".");
    const extension = parts[parts.length - 1];
    parts.pop();
    parts = parts.join(".");
    let fileName = parts;
    if (extension === 'png' || extension === 'jpeg' || extension === 'jpg') {
        fileName += '.' + extension;
    }
    return fileName;
}
 
function getPath(req) {
 
    return req.uploadPath.replace("/public", "");
}
exports.setUploadPath = (uploadPath) => {
  return (req, res, next) => {
      req.uploadPath = uploadPath;
      next();
  }
};

exports.injectFileNameAndPath = function ()  {
 
    return (req, res, next) => {
 
        if (req.file) {
             req.file.filePath = getPath(req);
            req.file.fileName = getFileName(req.file);
        } else if (req.files) {
           req.files.forEach(v => {
            v.fileName = getFileName(v);
            v.filePath = getPath(req);

           });

        }
        // req.file.fileName = getFileName(req.file);
  
        next();
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const destPath = req.uploadPath;
      console.log(destPath);
      if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, {recursive:true});
      }
      cb(null, destPath);
     
    },
    filename: function (req, file, cb) {
      

        cb(null, getFileName(file));
    }
  })
  function checkFileType(req, file, cb){
    
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      req.isUploaded = true;
       cb(null,true);
    } else {
      req.isUploaded = false;   
      cb(null, false);

    }
  }
     
  const uploadOnDisk = multer({ storage: storage,    fileFilter: checkFileType });
  const uploadOnMemory = multer({ storage: multer.memoryStorage(),    fileFilter: checkFileType});

  exports.uploadOnDisk = uploadOnDisk;
 exports.uploadOnMemory = uploadOnMemory;
 exports.checkUploadingStatus = (req,res,next) => {
    if (!req.isUploaded) {
      return next(new AppError('Only .png, .jpg and .jpeg format allowed!',400,true));
    }
    next();
 }
 exports.getFileName = getFileName;
