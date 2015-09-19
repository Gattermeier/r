var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../operations/db');

var generated = generated || 0;
var called = called || 0;

router.get(['/stats', '/usage'], function(req, res, next) {

  async.parallel([
    function(cb) {
      db.get('generated', function(err, value) {
        generated = value;
        cb(null, generated);
      });
    },
    function(cb) {
      db.get('called', function(err, value) {
        called = value;
        cb(null, called);
      });
    }
  ], function(err, results) {
    res.json({
      code: 200,
      status: 'success',
      data: [{
        generated: generated,
        called: called
      }],
      timestamp: new Date()
    });
  });

})

module.exports = router;