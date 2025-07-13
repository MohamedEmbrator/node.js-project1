const productsModel = require("../models/products.model");
exports.getProduct = (req, res) => {
  productsModel.getFirstProduct().then((product) => {
    res.render("product", { product });
  });
};
exports.getProductById = (req, res) => {
  let id = req.params.id;
  productsModel.getProductByID(id).then((product) => {
    res.render("product", { product });
  });
};
