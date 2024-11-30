const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
  name: String,
  image: String,
});


exports.ImageSc = mongoose.model("ImageSc", imageSchema);
