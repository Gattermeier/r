var express = require('express');
var router = express.Router();

var db = require('../operations/db');
var called = called || 0;

var r = require('../operations');

// get variables once: 
db.get('called', function(err, value) {
  called = value;
  console.log('called value: ', value);
});

router.all('/*', function(req, res, next) {
  called++;
  db.put('called', called);
  next();
});

router.get('/', function(req, res, next) {
  var randomArray = [];

  var count = parseInt(req.query.count) || 1;
  var length = parseInt(req.query.length) || 20;
  length = Math.max(Math.min(length, 20), 1);
  count = Math.max(Math.min(count, 2000), 1);

  var randomArray = r.getRandomArray(count, length);

  res.json({
    code: 200,
    status: 'success',
    data: randomArray,
    timestamp: new Date()
  });

})


module.exports = router;