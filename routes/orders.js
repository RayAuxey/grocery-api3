const router = require("express").Router();
const OrderController = require("../controllers/order_controller");

router.post("/newOrder", OrderController.createOrder);
router.get("/user/:id", OrderController.getUserOrders);
router.get("/shop/:id", OrderController.getShopOrders);

module.exports = router;
