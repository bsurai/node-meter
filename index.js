const {spawn} = require('child_process');

const cpback = spawn('npm', ['run', 'server:dev', '-prefix', './backend']);
cpback.stdout.pipe(process.stdout);
cpback.stderr.pipe(process.stderr);
cpback.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
cpback.on('error', (error) => {
  console.error(`spawn error: ${error}`);
});

const cpfront = spawn('npm', ['run', 'start', '-prefix', './frontend']);
cpfront.stdout.pipe(process.stdout);
cpfront.stderr.pipe(process.stderr);
cpfront.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
cpfront.on('error', (error) => {
  console.error(`spawn error: ${error}`);
});