const OrderModel = require("../models/order_model");
const GroceryShop = require("../models/grocery_shop_model");
const UserModel = require("../models/user_model");

const ObjectId = require("mongoose").Types.ObjectId;

class OrderController {
  static createOrder(req, res) {
    let totalPrice;
    let unitPrice;
    let quantity;
    console.log(req.body.quantity);
    GroceryShop.findById(req.body.shopId)
      .populate("products")
      .select("products -_id")
      .exec()
      .then(response => {
        console.log("Here");
        response.products.forEach(product => {
          if ("" + product._id == "" + req.body.productId) {
            console.log(product);
            unitPrice = product.price;
            quantity = req.body.quantity;
            console.log(quantity);
            totalPrice = unitPrice * quantity;
            console.log("" + unitPrice + " " + quantity + " " + totalPrice);
            const newOrderModel = new OrderModel({
              product: ObjectId(req.body.productId),
              quantity: quantity,
              unitPrice: unitPrice,
              user: ObjectId(req.body.userId),
              shop: ObjectId(req.body.shopId),
              totalPrice: totalPrice
            });
            console.log("Created");
            newOrderModel
              .save()
              .then(doc => res.status(201).json(doc))
              .catch(err =>
                res.status(500).json({
                  Error: err
                })
              );
          }
        });
      })
      .catch(err =>
        res.status(501).json({
          Error: err
        })
      );
  }

  static getUserOrders(req, res) {
    const id = req.params.id;
    OrderModel.find({
      user: id
    })
      .populate("product", "name")
      .populate("user", "name")
      .populate("shop", "name")
      .exec()
      .then(orders => {
        res.status(200).json(orders);
      });
  }

  static getShopOrders(req, res) {
    const id = req.params.id;
    OrderModel.find({
      shop: id
    })
      .populate("product", "name")
      .populate("user", "name")
      .populate("shop", "name")
      .exec()
      .then(orders => {
        res.status(200).json(orders);
      });
  }
}

module.exports = OrderController;
