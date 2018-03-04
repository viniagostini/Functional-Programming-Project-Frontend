const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/*', function(req, res, next) {
  console.log(req.body);
  next();
});


// some data for the API

let user1 = {
  Userid: 1,
  nome: "Fulano de Tal 1",
  email: "fulano@ccc.ufcg.edu.br",
  matricula: "12342435"
}

let user2 = {
  Userid: 2,
  nome: "Fulano de Tal",
  email: "fulano@ccc.ufcg.edu.br",
  matricula: "12342435"
}

let users = [user1, user2];

app.post('/api/profile', function (req, res) {
  console.log("/POST");
  let new_user = {
    "Userid": req.body.Userid,
    "nome": req.body.nome,
    "email": req.body.email,
    "matricula": req.body.matricula
  };
  users.push(new_user);
  console.log(new_user);
  console.log(users);
  res.status(200).json({}).end();
});

// PUT endpoint for editing food
app.get('/api/profile/:id', function (req, res) {
  console.log("/GET");
  let id = req.params.id;
  console.log("id: " + id);
  let user = users.find(user => user.Userid == id);
  console.log(user);
  if(!user){
    res.send(404);
  }else {
    res.send(user);
  }
});

// HTTP listener
app.listen(3000, function () {
  console.log('Example listening on port 4200!');
});

module.exports = app;
