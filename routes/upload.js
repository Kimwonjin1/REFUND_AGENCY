const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});



router.post("/upload", auth, authAdmin, (req, res) => { 
  try {

    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({msg: "파일이 존재하지 않습니다"});

    const file = req.files.file;
   
    if (file.size > 1024 * 1024 * 5) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "5mb 미만으로 해주세요" });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "jpg, png 파일만 허용" });
    }

      cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "refund"}, async(err, result)=>{
        if(err) throw err;  
        removeTmp(file.tempFilePath);

        res.json({public_id: result.public_id, url: result.secure_url })
      })

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
})

router.post('/destroy', (req, res)=>{
    try {
        const {public_id} = req.body;
        if(!public_id) res.status(400).json({msg: '이미지가 선택되지 않았습니다'})

        cloudinary.v2.uploader.destroy(public_id, async(err, result) => {
            if(err) throw err;

            res.json({msg:'이미지가 삭제되었습니다'})
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
})

const removeTmp = (path) => {
    fs.unlink(path, err=> {
        if(err) throw err; 
    })
} 

module.exports = router;
