const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const fs = require('fs');
const { error } = require("console");
// ReadStream('path/to/video.mp4');

cloudinary.config({
    cloud_name: 'dsfrh7irk',
    api_key: '817594229144461',
    api_secret: 'unAi9YGWQbejImdS-UU-io00qBQ'
  });

let streamUpload = (req,resourceType) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          { resource_type : resourceType},
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
};


async function upload(req,res){
    try {
      
      // console.log(req);
      console.log(req);
      let temp = req.file.mimetype.split("/");
      console.log(temp[0]);
      console.log(temp);

      console.log("upload file");
        let result = await streamUpload(req,temp[0]);
        console.log(result);
        res.status(200).json({url : result.url});
    } catch (error) {
      console.log(error);
        res.status(500).json("error" + error);
    }
    
}

module.exports = {
    upload
};
