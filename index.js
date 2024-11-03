const http = require("http");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const data = fs.readFileSync("data.json");

const server = http.createServer((req, res) => {
  console.log("server started");
  res.setHeader("Content-Type", "application/json");
  res.end(data);
});

server.listen(8080);