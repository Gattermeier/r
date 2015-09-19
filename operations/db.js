var levelup = require('levelup');
var db = levelup('./mydb');

var ops = [{
  type: 'put',
  key: 'randomNumber',
  value: 22
}, {
  type: 'put',
  key: 'generated',
  value: 0
}, {
  type: 'put',
  key: 'called',
  value: 0
}]

db.batch(ops, function(err) {
  if (err) return console.log('Ooops!', err)
})

module.exports = db;