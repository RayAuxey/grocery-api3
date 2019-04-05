const mongoose = require("mongoose");

const Product = new mongoose.Schema({
  name: String,
  price: Number
});

const Review = new mongoose.Schema({
  name: String,
  content: String,
  rating: Number
});

const GroceryShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    }
  },
  products: [Product],
  reviews: [Review]
});

module.exports = mongoose.model("GroceryShop", GroceryShopSchema);
