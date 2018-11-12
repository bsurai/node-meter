function delay(timeout = 0) {
  return new Promise(resolve => setTimeout(() => resolve(), timeout));
}

module.exports = delay;
