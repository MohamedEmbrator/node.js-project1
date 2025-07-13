const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/online-shop";
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model("user", userSchema);

exports.createNewUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => User.findOne({ email: email }))
      .then((user) => {
        if (user) {
          mongoose.disconnect();
          reject("E - mail has already been used");
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then((hashedPassword) => {
        let user = new User({
          username: username,
          email: email,
          password: hashedPassword
        });
        return user.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
};

exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => User.findOne({ email: email }))
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("Email not found");
        } else {
          return bcrypt.compare(password, user.password).then((same) => {
            if (!same) {
              mongoose.disconnect();
              reject("Password is incorrect");
            } else {
              resolve(user._id);
            }
          });
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
};
