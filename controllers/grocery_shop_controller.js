const GroceryShop = require("../models/grocery_shop_model");

class GroceryShopController {
  static index(req, res) {
    GroceryShop.find({})
      .select("-reviews -products")
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err => console.log(err));
  }

  static create(req, res) {
    const newShop = new GroceryShop({
      name: req.body.name,
      description: req.body.desc,
      location: {
        latitude: req.body.lat,
        longitude: req.body.long
      },
      imageUrl: req.body.image
    });
    newShop
      .save()
      .then(doc => res.status(201).json(doc))
      .catch(err =>
        res.status(500).json({
          error: err
        })
      );
  }

  static show(req, res) {
    const id = req.params.id;
    GroceryShop.findById(id)
      .select("-reviews -products")
      .exec()
      .then(doc => {
        if (doc) {
          res.status(200).json(doc);
        } else {
          res.status(404).json({
            error: "No document found"
          });
        }
      })
      .catch(err =>
        res.status(500).json({
          error: err
        })
      );
  }

  static addProduct(req, res) {
    const id = req.params.id;
    GroceryShop.findById(id)
      .exec()
      .then(doc => {
        if (doc) {
          const newProduct = {
            name: req.body.name,
            price: req.body.price
          };
          doc.products.push(newProduct);
          doc.save().then(doc =>
            res.status(200).json({
              product: newProduct,
              addedTo: id
            })
          );
        } else
          res.status(404).json({
            error: "No such document"
          });
      })
      .catch(err =>
        res.status(500).json({
          error: err
        })
      );
  }

  static addReview(req, res) {
    const id = req.params.id;
    GroceryShop.findById(id)
      .exec()
      .then(doc => {
        if (doc) {
          const newReview = {
            name: req.body.name,
            content: req.body.content,
            rating: req.body.rating
          };
          doc.reviews.push(newReview);
          doc.save().then(doc =>
            res.status(200).json({
              review: newReview,
              addedTo: id
            })
          );
        } else
          res.status(404).json({
            error: "No such document"
          });
      })
      .catch(err =>
        res.status(500).json({
          error: err
        })
      );
  }

  static showReviews(req, res) {
    const id = req.params.id;
    GroceryShop.findById(id)
      .select("reviews")
      .exec()
      .then(doc => res.status(200).json(doc))
      .catch(err =>
        res.status(500).json({
          error: err
        })
      );
  }

  static showProducts(req, res) {
    const id = req.params.id;
    GroceryShop.findById(id)
      .select("products")
      .exec()
      .then(doc => res.status(200).json(doc))
      .catch(err =>
        res.status(500).json({
          error: err
        })
      );
  }
}

module.exports = GroceryShopController;
