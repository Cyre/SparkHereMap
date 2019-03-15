var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');
var shell = require('shelljs');
var jsonFile = require('jsonfile');
var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__dirname, '/scripts')));
app.use('/', express.static(path.join(__dirname, '/stylesheets')));


app.use("/", require('./routes/index'));

app.listen(3000, function() {
  console.log("Node server started on port 3000.");
});


module.exports = app;

//console.log("SEPARADOR-----------------------------------------")
//console.log(module);
