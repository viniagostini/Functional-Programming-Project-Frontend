const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var httpProxy = require('http-proxy');

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

var proxyOptions = {
  changeOrigin: true
};

httpProxy.prototype.onError = function (err) {
  console.log(err);
};

const apiProxy = httpProxy.createProxyServer(proxyOptions);

apiProxy.on('error', function(err, req, res) {
  res.end();
});

var apiForwardingUrl = 'http://localhost:3000';

// the GET "foods" API endpoint
app.all('/api/*', function (req, res) {
  console.log('POST');
  console.log(req.body);
  console.log(req.originalUrl);

  req.url = req.originalUrl;

  console.log(req.headers);

  apiProxy.web(req, res, {target: apiForwardingUrl});

});


// the "index" route, which serves the Angular app
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'/dist/index.html'));
});

// HTTP listener
app.listen(4200, function () {
  console.log('Example listening on port 4200!');
});

module.exports = app;
