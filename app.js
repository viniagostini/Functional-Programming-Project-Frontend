const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var httpProxy = require('http-proxy');

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json()); // support json encoded bodies

const apiProxy = httpProxy.createProxyServer();

// the "index" route, which serves the Angular app
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'/dist/index.html'));
});

var apiForwardingUrl = 'http://localhost:3000';

// the GET "foods" API endpoint
app.all('/api/*', function (req, res) {
  apiProxy.web(req, res, {target: apiForwardingUrl});
});

// PUT endpoint for editing food
app.put('/api/profile/:id', function (req, res) {
  let id = req.params.id;
  let user = users.find(user => user.id == id);
  user.code = req.body.code;
  res.send(user);
});

// HTTP listener
app.listen(4200, function () {
  console.log('Example listening on port 4200!');
});

module.exports = app;
