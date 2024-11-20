require('dotenv').config();
const express = require("express");
const server = express();

const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/usersRouter");

server.use(express.json());
server.use(express.static(process.env.PUBLIC_DIR))
server.use("/products", productRouter.routes);
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
