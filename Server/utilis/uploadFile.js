const multer = require("multer");
const path = require('path');
function getFileName(file) {
    const parts = file.originalname.split(".");
    const extension = parts[parts.length - 1];
    let fileName = file.fieldname + '-' + parts[0];
    if (extension === 'png' || extension === 'jpeg' || extension === 'jpg') {
        fileName += '.' + extension;
    }
    return fileName;
}
 
function getPath() {
    return "./public";
}
exports.injectFileNameAndPath = function ()  {
   
    return (req, res, next) => {
        
        if (req.file) {
            req.file.filePath = getPath();
            req.file.fileName = getFileName(req.file);
        } else if (req.files) {
           req.files.forEach(v => {
            v.fileName = getFileName(v);
            v.filePath = getPath();
           });

        }
        // req.file.fileName = getFileName(req.file);
  
        next();
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, getPath());
     
    },
    filename: function (req, file, cb) {
      

        cb(null, getFileName(file));
    }
  })
  function checkFileType(file, cb){
    
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb("Error: File upload only supports the following filetypes - " + filetypes);
    }
  }
     
  const uploadOnDisk = multer({ storage: storage,    fileFilter: (req, file, cb) => {checkFileType(file, cb) } });
  const uploadOnMemory = multer({ storage: multer.memoryStorage(),    fileFilter: (req, file, cb) => {checkFileType(file, cb) } });

  exports.uploadOnDisk = uploadOnDisk;
 exports.uploadOnMemory = uploadOnMemory;
 exports.getFileName = getFileName;