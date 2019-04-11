const mongoose = require("mongoose");

const Review = new mongoose.Schema({
  name: String,
  content: String,
  rating: Number
});

const GroceryShopSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
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
  imageUrl: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  reviews: [Review]
});

module.exports = mongoose.model("GroceryShop", GroceryShopSchema);
