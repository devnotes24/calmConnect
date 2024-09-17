// models/Product.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: { type: String, required: true },
  itemName: { type: String, required: true },
  brandName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  numOfReviews: { type: Number, default: 0 },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  reviewsArray: [
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    }
  ]
},{collection:"productData"});

const createProductModel = (connection) => {
    return connection.model('product', productSchema);
  };
  module.exports = createProductModel;
  