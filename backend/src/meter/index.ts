import cluster from 'cluster';
import os from 'os';
import work from './worker';
import AppConfig from './AppConfig';

const numCPUs = os.cpus().length;
const allProxies: string[] = require('./../../data/proxies.json');

/////////////////
const {requestsPerInterval, maxWorkers} = AppConfig;

const workers = Math.min(maxWorkers, calcNumberOfWorkers(requestsPerInterval, numCPUs));
const offset = Math.max(1, Math.floor(allProxies.length / workers));
const requestsPerWorker = Math.max(1, Math.floor(requestsPerInterval / workers));

////////////////
console.log({requestsPerInterval, workers, length: allProxies.length, offset});
console.log('will start ' + workers + ' workers.');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < workers; i++) {
    console.log('i=', i);
    cluster.fork({
      requestsPerWorker,
      offset: i * offset,
    });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}
else {
  console.log(`Worker ${process.pid} started`);
  work();
}

function calcNumberOfWorkers(requestsPerMinute: number, cpus: number): number {
  const limitOfRequestPerWorker1 = 8;
  const limitOfRequestPerWorker2 = 80;

  let needWorkers = 0;
  while (true) {
    needWorkers++;

    if (needWorkers < cpus && requestsPerMinute <= needWorkers * limitOfRequestPerWorker1) {
      break;
    }
    else if (needWorkers >= cpus && requestsPerMinute <= needWorkers * limitOfRequestPerWorker2) {
      break;
    }
  }
  return needWorkers;
}
