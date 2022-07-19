import { spawn } from 'child_process';

const child = spawn('ls', ['-lh', '/usr']);

// readable stream
child.stdout.on('data', (data) => {
  console.log('stdout', data.toString());
});

child.stderr.on('data', (data) => {
  console.log('stderr', data.toString());
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
