const express = require("express");
const app = express();
const port = 3000;
const homeRouter = require("./routes/home.route");
const productRouter = require("./routes/product.route")
app.use(express.static("assets"));
app.use(express.static("images"));
app.set("view engine", "ejs");
app.set("views", "views");
app.use("/", homeRouter);
app.use("/product", productRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
