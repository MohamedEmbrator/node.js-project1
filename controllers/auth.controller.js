const authModel = require("../models/auth.model");

exports.getSignup = (req, res) => res.render("signup");

exports.postSignup = (req, res) => {
  authModel
    .createNewUser(req.body.username, req.body.email, req.body.password)
    .then(() => {
      res.redirect("/login");
    })
    .catch(() => {
      res.redirect("/signup");
    });
};

exports.getLogin = (req, res) => {
  res.render("login", {
    authError: req.flash("authError")[0]
  });
};

exports.postLogin = (req, res) => {
  authModel
    .login(req.body.email, req.body.password)
    .then((id) => {
      req.session.userId = id;
      res.redirect("/");
    })
    .catch((error) => {
      req.flash("authError", error);
      res.redirect("/login");
    });
};
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
