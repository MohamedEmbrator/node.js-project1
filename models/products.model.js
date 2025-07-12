const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/online-shop";
const productSchema = mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
  category: String
});

const Product = mongoose.model("product", productSchema);

exports.getAllProducts = () => {
  // Connect to DB
  // Get Products
  // Disconnent
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => Product.find({}))
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((error) => reject(error));
  });
};

exports.getProductsByCategory = (category) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => Product.find({ category: category }))
      .then((products) => {
        mongoose.disconnect();
        resolve(products);
      })
      .catch((error) => reject(error));
  });
};
