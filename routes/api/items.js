const express = require("express");
const route = express.Router();

// models export tên gì chọn đúng tên đó hoặc sử dụng export default ở models
const Item = require("../../models/items");

route.get("/", async (req, res) => {
  try {
    const data = await Item.find().sort({ date: -1 });
    return res.json(data);
    // hoặc
    Item.find()
      .sort({ date: -1 })
      .then((data) => res.json(data));
  } catch (e) {
    res.json({ msg: e.message });
  }
});

route.post("/", async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  try {
    const data = await newItem.save();
    return res.json(data);
    // hoặc
    newItem.save().then((data) => res.json(data));
  } catch (error) {
    res.json({ msg: error.message });
  }
});

route.delete("/:id", async (req, res) => {
  // không sử dụng trycatch thì sử dụng catch trong Promise
  Item.findByIdAndDelete(req.params.id)
    .then((data) => res.json({ success: true }))
    .catch((err) => res.status(404).json({ msg: err.message, success: false }));
});

module.exports = route;
