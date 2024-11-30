const express = require("express");
const imageUpload = require("../controller/imageUploder");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storageDisk = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storageDisk,
});

const imageUploade = (req, res) => {
  console.log(req.file);
  res.status(200).json({ data: "got data" });
};


const model = require("../models/imageSchema");
const ImageSc = model.ImageSc;

// exports.createImage = async (req, res) => {
//   const data = req.body;
//   console.log('body',data);
//   console.log('name',data.name);
//   console.log('image',data.image);
//   try {
//     const newImage = await ImageSc.create(data);
//     newImage.save();
//     res.status(201).json({ message: "Data Save" });
//   } catch (err) {
//     res.status(409).json({ err: err.message });
//   }
// };

router.post("/", upload.single("image"), imageUploade);
router.post("/m", async (req, res) => {
  const data = req.body;
  console.log('body',data); 
  console.log('name',data.name);
  console.log('image',data.image);
  // try {
  //   const newImage = await ImageSc.create(data);
  //   newImage.save();
  //   res.status(201).json({ message: "Data Save" });
  // } catch (err) {
  //   res.status(409).json({ err: err.message });
  // }
});

exports.router = router;

// exports.imagFile = { upload, imageUploade };
