const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
app.use(cors());

// BodyParse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require route
const items = require("./routes/api/items");

// use route
app.use("/api/items", items);

// config DB
mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("connect DB success!"))
  .catch(console.log("connect DB fail!"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server start port ${port}`);
});

app.get("/", (req, res) => {
  res.json("hello!");
});
