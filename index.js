const express = require("express");
const server = express();

const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/usersRouter");

server.use(express.json());

server.use("/products", productRouter.routes);
server.use("/user", userRouter.routes);

server.listen(8080, () => {
  console.log("server strated");
});

// const http = require("http");
// const server = http.createServer((req, res) => {
//   console.log("server started");
//   res.setHeader("Content-Type", "application/json");
//   res.end(data);
// });

// server.listen(8080);
