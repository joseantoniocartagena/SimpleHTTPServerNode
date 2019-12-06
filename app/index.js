'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  defaultRoute = require('./routes/default'),
  auth = require('./routes/auth'),
  app = express(),
  port = process.env.PORT || 8081;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(defaultRoute);
app.use(auth);
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
