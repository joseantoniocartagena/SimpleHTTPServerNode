'use strict';
const router = require('express').Router,
  routes = router();
routes.get('*', (req, res) => {
  res.writeHead(404, 'application/json');
  res.end("Sorry we couldn't find that page");
});

module.exports = routes;
