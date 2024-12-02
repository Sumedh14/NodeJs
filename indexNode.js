require("dotenv").config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

server.use(cors());
server.use(express.json({ limit: "1.5mb" }));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/nodejs");
  console.log("Connected successfully");
}

const productRouter = require("./routes/productRouter");
const authRouter = require("./routes/authRouter");
const imageUploaderRouter = require("./routes/imageUploaderRouter");
const userRouter = require("./routes/usersRouter");
// server.use(express.static(process.env.PUBLIC_DIR));

const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    const decode = jwt.verify(token, process.env.SECRET);
    if (decode.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(401);
  }
};

server.use("/auth", authRouter.router);
server.use("/products", auth, productRouter.router);
server.use("/user", auth, userRouter.router);
server.use("/upload", imageUploaderRouter.router);

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
