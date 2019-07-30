declare interface Array<T> {
  randomElement(): T;
  randomElementDelete(): T;
  __find(callback: () => any): T;
  shuffle(): T[];
}

declare interface Math {
  getRandomNumber(min: number, max: number): number;
}

// eslint-disable-next-line no-extend-native
Array.prototype.randomElement = function() {
  return this[Math.floor(Math.random() * this.length)];
};

// eslint-disable-next-line no-extend-native
Array.prototype.randomElementDelete = function() {
  const randomIndex = Math.floor(Math.random() * this.length);
  const randomElement = this[randomIndex];
  this.splice(randomIndex, 1);
  return randomElement;
};

// eslint-disable-next-line no-extend-native
Array.prototype.__find = function(callback) {
  if (!this) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }
  const list = Object(this);
  // Makes sures is always has an positive integer as length.
  const length = list.length >>> 0;
  const thisArg = arguments[1];
  for (let i = 0; i < length; i++) {
    const element = list[i];
    if ((callback.call as any)(thisArg, element, i, list)) {
      return element;
    }
  }
};

// eslint-disable-next-line no-extend-native
Array.prototype.shuffle = function() {
  // eslint-disable-next-line one-var
  let currentIndex = this.length;
  let temporaryValue;
  let randomIndex;

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

Math.getRandomNumber = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};
