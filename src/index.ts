import cluster from 'cluster';
import os from 'os';
import work from './worker';
import AppConfig from './AppConfig';

const numCPUs = os.cpus().length;
const allProxies: string[] = require('./../data/proxies.json');

/////////////////
const {requestsPerInterval, maxWorkers} = AppConfig;

let startWorkers = Math.min(maxWorkers, calcNumberOfWorkers(requestsPerInterval, numCPUs));
let offset = Math.max(1, Math.floor(allProxies.length / startWorkers));
let requestsPerWorker = Math.max(1, Math.floor(requestsPerInterval/startWorkers));

////////////////
console.log({requestsPerInterval, startWorkers, length: allProxies.length, offset});

const workers = startWorkers; // Math.min(startWorkers, numCPUs);
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

function calcNumberOfWorkers(requestsPerMinute: number, numCPUs: number): number {
  const limitOfRequestPerWorker1 = 8;
  const limitOfRequestPerWorker2 = 80;

  let startWorkers = 0;
  while (true) {
    startWorkers++;

    if (startWorkers < numCPUs && requestsPerMinute <= startWorkers*limitOfRequestPerWorker1) {
      break;
    }
    else if (startWorkers >= numCPUs && requestsPerMinute <= startWorkers*limitOfRequestPerWorker2) {
      break;
    }
  }
  return startWorkers;
}
