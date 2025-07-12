const productsModel = require("../models/products.model");

exports.getHome = (req, res) => {
  // Get Products
  // Render index.ejs
  // productsModel.getAllProducts().then((products) => {
  //   res.render("index", {
  //     products: products
  //   });
  // });

  // Get Category
  // if category && category !== "all"
  //           filter
  // else
  //           render all
  let category = req.query.category;
  let validCategories = ["Clothes", "Phones", "Watches"];
  let productsPromise;
  if (category && validCategories.includes(category)) productsPromise =  productsModel.getProductsByCategory(category);
  else productsPromise = productsModel.getAllProducts();
  productsPromise.then((products) => res.render("index", { products: products }));
};
