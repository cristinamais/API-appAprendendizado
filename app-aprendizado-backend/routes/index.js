var express = require('express');
var router = express.Router();
var alunosModel = require('../model/alunosModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    
  } catch (error) {
    console.log(error);
    resp.status(500).json(error) 
  }
});


router.post('/', function(req, res, next) {
  try {
    
  } catch (error) {
    console.log(error);
    resp.status(500).json(error) 
  }
});



module.exports = router;
