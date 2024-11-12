const express = require("express");
const server = express();

const productdata = require("./controller/product");

const index = fs.readFileSync("index.html", "utf-8");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Express</h1>");
  // res.send(`${data}`);
});

server.get("/products", productdata.getProduct);

server.post("/products",productdata.createProduct);

server.get("/products/:id", productdata.findById);

server.put("/products/:id",productdata.updateProduct);

server.patch("/products/:id",productdata.updateProductPatch);

server.delete("/products/:id", productdata.deleteProduct);

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
