import { Command } from 'commander';
import detect from 'detect-port';

interface ProgramOptions {
  port: string;
}

// can get args from parent process
// console.log('process', process.argv);
const program = new Command();

program
  .option('-p, --port <port-number>', 'specify port number', '8000');

program.parse();

const { port } = program.opts<ProgramOptions>();
const portNumber = Number(port);
detect(portNumber).then((ensuredPort) => {
  if (portNumber === ensuredPort) {
    console.log(`port: ${port} was not occupied`);
  } else {
    console.log(`port: ${port} was occupied, try port ${ensuredPort}`);
  }
}).catch((err) => {
  console.log('err', err);
});

// IPC
// process.on('message', (message) => {
//   console.log('Child got message: ', message);
// });
//
// process.send?.({ name: 'child' });
