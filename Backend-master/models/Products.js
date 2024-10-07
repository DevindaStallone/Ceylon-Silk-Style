const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  sizes: [String],
  price: { type: Number, required: true },
  image: { type: String }, // Optional image field
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  soldOut: { type: Boolean, default: false },
  outOfStockSizes: [String], // To track sizes that are out of stock
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
