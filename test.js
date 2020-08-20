const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const name = "vuducvi";
const pass = "anhvipandan";

// bcrypt.genSalt(10, (err, salt) => {
//   console.log("salt:", salt);
//   bcrypt.hash(pass, salt, (err, hash) => {
//     console.log("pass crypt:", hash);
//   });
// });

// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync("vuducvi");
// console.log(salt);
// console.log(hash);
// console.log(
//   bcrypt.compareSync(
//     "vuducvi",
//     "$2a$10$MeE.Wg8uUhDc5EkcZ/MjfuQ/OVYCJEXnBiM/Y2WNhfrVRD9ZmS2ma"
//   )
// );

// var token = jwt.sign({ foo: "bar" }, "454k545");
// jwt.verify(token, "454545", (err, token) => {
//   console.log(token);
// });
// console.log(token);
// // console.log(verity);
