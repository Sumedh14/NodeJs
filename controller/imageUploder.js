const model = require("../models/imageSchema");
const ImageSc = model.ImageSc;

exports.createImage = async (req, res) => {
  const data = req.body;
  try {
    const newImage = await ImageSc.create(data);
    newImage.save();
    res.status(201).json({ data: data, message: "Data Save" });
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
};

exports.getAllImage = async (req, res) => {
  try {
    const images = await ImageSc.find({}).exec();
    res.status(200).json(images);
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
};
