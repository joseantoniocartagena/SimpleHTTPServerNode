'use strict'
const router = require('express').Router,
  routes = router();
  
routes.get("/signin", (req, res) => {
  res.writeHead(200, "application/json");

  return res.end("200. OK");
});
routes.get("/login", (req, res) => {
  res.writeHead(200, "application/json");
  return res.end("/auth/signin/ Status 200. OK");
});
routes.get("/logout", (req, res) => {
  res.writeHead(200, "application/json");
  return res.end("/auth/signin/ Status 200. OK");
});
module.exports = routes;
