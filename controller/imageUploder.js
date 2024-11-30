const model = require("../models/imageSchema");
const ImageSc = model.ImageSc;

exports.createImage = async (req, res) => {
  const data = req.body;
  console.log('body',data);
  console.log('name',data.name);
  console.log('image',data.image);
  try {
    const newImage = await ImageSc.create(data);
    newImage.save();
    res.status(201).json({ message: "Data Save" });
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
};
