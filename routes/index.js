var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/hammer', function(req, res, next){
	res.render('hammer')
})

router.get('match', function(req,res,next){
	res.render('match')
})

router.get('control', function(req, res,next){
	res.render('control')
})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
