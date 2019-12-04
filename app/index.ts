import express = require("express");
const app: express.Application = express(),
  port: number = 8081;
app.get("/", function(req, res) {
  res.writeHead(200, "application/json");
  res.end('OK');
});
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
