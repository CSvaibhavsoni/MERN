const mongoose = require("mongoose");
const { ObjectID } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 32,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 2000,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    maxlength: 32,
    required: true,
    trim: true,
  },
  category: {
    type: ObjectID,
    ref: "Category",
    required: true,
  },
  stock: {
    type: Number,
  },
  sold: {
    type: Number,
    default: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
