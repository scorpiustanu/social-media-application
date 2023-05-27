const express = require("express");
const { upload} = require("../controllers/uploadfile");
const multer = require("multer");

const router = express.Router();

let fileUpload = multer();

router.post("/",fileUpload.single('file'),upload);

 
  
  
  
  
  
  
  

module.exports = router;