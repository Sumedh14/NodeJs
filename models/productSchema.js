const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  id: Number,
  title: String,
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  dimensions: {
    width: Number,
    height: Number,
    depth: Number,
  },
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  reviews: [
    {
      rating: Number,
      comment: String,
      date: Date,
      reviewerName: String,
      reviewerEmail: String,
    },
  ],
  returnPolicy: String,
  minimumOrderQuantity: Number,
  meta: {
    createdAt: Date,
    updatedAt: Date,
    barcode: Number,
    qrCode: String,
  },
  images: [String],
  thumbnail: String,
});

exports.Product = mongoose.model("Product", productSchema);
