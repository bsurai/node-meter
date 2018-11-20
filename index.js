const {exec} = require('child_process');

const cpback = exec('npm run server:dev --prefix ./backend', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
});
cpback.stdout.pipe(process.stdout);
cpback.stderr.pipe(process.stderr);


const cpfront = exec('npm run start --prefix ./frontend', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
});
cpfront.stdout.pipe(process.stdout);
cpfront.stderr.pipe(process.stderr);