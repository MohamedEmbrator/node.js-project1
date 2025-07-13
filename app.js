const express = require("express");
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
const homeRouter = require("./routes/home.route");
const productRouter = require("./routes/product.route");
const authRouter = require("./routes/auth.route");
app.use(express.static("assets"));
app.use(express.static("images"));
app.use(flash());

const STORE = new SessionStore({
  uri: "mongodb://localhost:27017/online-shop",
  collection: "sessions"
});

app.use(
  session({
    secret: "this is my secret key to encrypt express session......",
    saveUninitialized: false,
    cookie: {
      maxAge: 1 * 60 * 60 * 1000
    },
    store: STORE
  })
);

app.set("view engine", "ejs");
app.set("views", "views");
app.use("/", homeRouter);
app.use("/product", productRouter);
app.use("/", authRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
