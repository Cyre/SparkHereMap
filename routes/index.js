var express = require('express');
var router = express.Router();
var shell = require('shelljs');


router.get('/', function(req, res) {
  res.render('../view/index.ejs');
});

router.post('/', function(req, res) {
  var fecha = req.body.fecha;
  var hora = req.body.hora + ":00";

  console.log("Exit Code Prediction:" + shell.exec("prediction.sh " + fecha + " " + hora).code);
  console.log("Exit Code dataRecoveryHDFS:" + shell.exec("dataRecoveryHDFS.sh " + fecha + " " + hora).code);

  res.render('../view/maps.ejs',{fecha:req.body.fecha , hora:req.body.hora+":00"});
});

router.get('/data/*.json', function(req, res) {
  const data = require("../data/result.json");
  res.status(200).json(data);
});

router.get('*', function(req, res) {
  res.status(404).render('../view/error.ejs');
})

module.exports = router;
