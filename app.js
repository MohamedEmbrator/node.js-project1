const express = require("express");
const app = express();
const port = 3000;
app.use(express.static("assets"));
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
