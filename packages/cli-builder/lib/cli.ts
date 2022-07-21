import { Command } from 'commander';
import start from './start';

const program = new Command();

program
  .name('sppk');

program
  .command('start', 'start a server for develop')
  .option('-p, --port <port-number>', 'specify port number for server', '3000')
  .action((options) => {
    start(options);
  });

program.parse();
