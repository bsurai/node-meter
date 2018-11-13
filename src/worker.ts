import './array-polyfill';
import Agent from './Agent';
import {IRequestParams} from './Agent';
import AppConfig from './AppConfig';
import delay from './utils/delay';

const allProxies: string[] = require('./../data/proxies.json');
const products: string[] = require('./../data/products.json');

// const requests = 2000;

const nestedURLs = require('./../data/nestedURLs.json');

// main();

export default async function main() {
  try {
    console.log('-----------main-------------');
    const requestsPerWorker = Number(process.env.requestsPerWorker);
    const offset = Number(process.env.offset);

    console.log({requestsPerWorker, offset});
    if (!requestsPerWorker) {
      return;
    }

    const proxies = allProxies.slice(offset, offset + requestsPerWorker);

    if (!proxies.length) {
      console.log(`Empty proxies list. offset=${offset}. requestsPerWorker=${requestsPerWorker}`);
      return;
    }

    const dalayInterval = offset / 2; // * Math.random();
    await delay(dalayInterval);
    while (true) {
      proxies.shuffle();
      products.shuffle();

      const params = [] as IRequestParams[];

      for (let ind = 0; ind < requestsPerWorker; ind++) {
          const proxy = proxies.shift() as string;
          proxies.push(proxy);

          const productName = products.shift() as string;
          products.push(productName);

          params.push({productName, proxy});
      }
      // console.log(params);

      const agent = new Agent(AppConfig);
      await agent.run(params, nestedURLs, AppConfig.rampUpInterval);
    }
  }
  catch (err) {
    console.log('ERR 3: ', err);
  }
}
