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

router
  .post("/", upload.single("image"), imageUploade)
  .post("/m", imageUpload.createImage)
  .get("/", imageUpload.getAllImage);

exports.router = router;

// exports.imagFile = { upload, imageUploade };
