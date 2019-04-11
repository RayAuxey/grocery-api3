const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GroceryShop",
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("OrderModel", OrderSchema);
