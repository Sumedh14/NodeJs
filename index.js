require("dotenv").config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/nodejs");
  console.log("Connected successfully");
}

server.use(express.json());
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/usersRouter");
// server.use(express.static(process.env.PUBLIC_DIR));
server.use("/products", productRouter.router);
server.use("/user", userRouter.routes);

server.listen(process.env.PORT, () => {
  console.log("server strated");
});

// const http = require("http");
// const server = http.createServer((req, res) => {
//   console.log("server started");
//   res.setHeader("Content-Type", "application/json");
//   res.end(data);
// });

// server.listen(8080);
