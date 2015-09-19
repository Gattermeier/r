var db = require('../operations/db');

db.get('generated', function(err, value) {
  generated = value;
})

db.get('randomNumber', function(err, value) {
  randomNumber = value;
})

var update = function(randomNumber, generated) {
  db.batch([{
    type: 'put',
    key: 'randomNumber',
    value: randomNumber
  }, {
    type: 'put',
    key: 'generated',
    value: generated
  }]);
}

var random = {
  generateRandomNumber: function(randomNumber) {
    generated++;
    var randomNumber = (randomNumber / 7) * 10;
    return (randomNumber - Math.floor(randomNumber));
  },
  getRandomArray: function(count, length) {
    var randomArray = [];
    for (var i = 0; i < count; i++) {
      randomNumber = this.generateRandomNumber(randomNumber);
      randomArray.push(randomNumber.toFixed(length));
    };

    console.log('last random number:', randomNumber);
    update(randomNumber, generated);

    return randomArray;
  }
}

module.exports = random;