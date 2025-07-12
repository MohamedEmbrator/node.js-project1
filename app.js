const express = require("express");
const app = express();
const port = 3000;
const homeRouter = require("./routes/home.route");
app.use(express.static("assets"));
app.use(express.static("images"));
app.set("view engine", "ejs");
app.set("views", "views");
app.use("/", homeRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
