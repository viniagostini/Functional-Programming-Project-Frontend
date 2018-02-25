const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json()); // support json encoded bodies

// some data for the API

let user = {
  id: 1,
  name: "Nome Usuario",
  email: "Email Usuario",
  code: ""
}

let users = [user];

/*
USAR ISSO POSTERIORMENTE: https://github.com/nodejitsu/node-http-proxy
 */

// the "index" route, which serves the Angular app
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'/dist/index.html'));
});

// the GET "foods" API endpoint
app.get('/api/profile', function (req, res) {
  res.send(user);
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
