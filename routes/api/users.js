// ngăn không cho 2 mật khẩu cùng mã hash
// thời gian hash lâu hơn MD5 hay SHA-512, tránh sử dụng brute-force và rainbow table
// HÃY SỬ DỤNG bcrypt
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const route = express.Router();
const config = require("../../config.json");
const auth = require("../../middleware/auth");

// models export tên gì chọn đúng tên đó hoặc sử dụng export default ở models
const User = require("../../models/users");

// login
route.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ msg: "not found user!" });

    bcrypt.compare(req.body.password, user.password, (err, isTrue) => {
      if (err) return res.status(404).json({ msg: err.message });
      if (!isTrue) return res.status(404).json({ msg: "wrong password!" });
      // payload để làm gì
      jwt.sign(
        { id: user._id },
        config.jwtSecret,
        { expiresIn: 60 * 60 },
        (err, token) => {
          if (err) return res.status(404).json({ msg: err.message });
          return res.json({ token, user });
        }
      );
    });
  } catch (e) {
    return res.status(404).json({ msg: e.message });
  }
});

// register
route.post("/register", (req, res) => {
  const newUser = new User(req.body);

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) return res.status(404).json(err);
      newUser.password = hash;
      newUser
        .save()
        .then((user) => {
          jwt.sign(
            { id: user._id },
            config.jwtSecret,
            { expiresIn: 60 * 60 },
            (err, token) => {
              if (err) return res.status(404).json({ msg: err.message });
              return res.json({ token, user });
            }
          );
        })
        .catch((e) => res.status(404).json({ msg: e.message }));
    });
  });
});

// get current user
route.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) {
    res.json.status(404).json({ msg: e.message });
  }
});

//get all users
route.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.json.status(404).json({ msg: e.message });
  }
});
module.exports = route;
