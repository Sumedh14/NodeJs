const express = require("express");
const fs = require("fs");
const server = express();

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Express</h1>");
  // res.send(`${data}`);
});

server.get("/products", (req, res) => {
  res.send(`${data}`);
  // res.json(`${data}`);
});

server.post("/products", (req, res) => {
  const product = req.body;
  data.push(product);
});

server.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = data.find((product) => product.id === id);
  res.json(product);
  // res.json(data);
});

server.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = data.findIndex((pr) => pr.id === id);
  data.splice(productIndex, 1, { ...req.body, id });
  res.json(data);
});

server.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = data.findIndex((pr) => pr.id === id);
  const product = data[productIndex];
  data.splice(productIndex, 1, { ...product, ...req.body });
  res.json(data);
});

server.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = data.findIndex((pr) => pr.id === id);
  data.splice(productIndex, 1);
  res.json(data);
});

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
