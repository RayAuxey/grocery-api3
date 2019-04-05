// Requires
const express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  cors = require("cors"),
  bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/groceries", {
  useNewUrlParser: true
});

const app = express();
const PORT = process.env.PORT || 6886;

// Controller Import
const GroceryShopController = require("./controllers/grocery_shop_controller");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const url = "/groceries/api/"
app.get(url, GroceryShopController.index);
app.post(url+"newShop", GroceryShopController.create);
app.get(url+":id", GroceryShopController.show);
app.put(url+"addProduct/:id", GroceryShopController.addProduct);
app.put(url+"addReview/:id", GroceryShopController.addReview);
app.get(url+"products/:id", GroceryShopController.showProducts);
app.get(url+"reviews/:id", GroceryShopController.showReviews);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
