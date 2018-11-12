// eslint-disable-next-line no-extend-native
Array.prototype.randomElement = function() {
    return this[Math.floor(Math.random() * this.length)];
  };
  
  // eslint-disable-next-line no-extend-native
  Array.prototype.randomElementDelete = function() {
    var randomIndex = Math.floor(Math.random() * this.length);
    var randomElement = this[randomIndex];
    this.splice(randomIndex, 1);
    return randomElement;
  };
  
  // Array.prototype.__find = function(value, key) {
  //   for (var i = 0; i < this.length; i++) {
  //     if (this[i][key] === value) return this[i];
  //   }
  //
  //   return null;
  // };
  
  // eslint-disable-next-line no-extend-native
  Array.prototype.__find = function(callback) {
    if (!this) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    } else if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }
    var list = Object(this);
    // Makes sures is always has an positive integer as length.
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    for (var i = 0; i < length; i++) {
      var element = list[i];
      if (callback.call(thisArg, element, i, list)) {
        return element;
      }
    }
  };
  
  // eslint-disable-next-line no-extend-native
  Array.prototype.shuffle = function() {
    // eslint-disable-next-line one-var
    var currentIndex = this.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = this[currentIndex];
      this[currentIndex] = this[randomIndex];
      this[randomIndex] = temporaryValue;
    }
    return this;
  };
  
  Math.getRandomNumber = function(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };
  