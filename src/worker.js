require('./array-polyfill');
const Agent = require('./Agent');
const allProxies = require('./../data/proxies.json');
const products = require('./../data/products.json');
const AppConfig = require('./AppConfig');
const delay = require('./utils/delay');

// const requests = 2000;

const nestedURLs = require('./../data/nestedURLs.json');

// main();

async function main() {
  try {
    console.log('-----------main-------------');
    const {requestsPerWorker, offset} = process.env;
    console.log({requestsPerWorker, offset});
    if (!requestsPerWorker) {
      return;
    }

    const proxies = allProxies.slice(offset, offset + requestsPerWorker);

    if (!proxies.length) {
      console.log(`Empty proxies list. offset=${offset}. requestsPerWorker=${requestsPerWorker}`);
      return;
    }

    await delay(offset * Math.random());
    while (true) {
      proxies.shuffle();
      products.shuffle();

      const params = [];

      for (let ind = 0; ind < requestsPerWorker; ind++) {
          const proxy = proxies.shift();
          proxies.push(proxy);

          const productName = products.shift();
          products.push(productName);
          
          params.push({productName, proxy});
      }
      // console.log(params);

      const agent = new Agent(AppConfig);
      await agent.run(params, nestedURLs, 60*1000);
    }
  }
  catch (err) {
    console.log('ERR 3: ', err);
  }
}

module.exports = main;