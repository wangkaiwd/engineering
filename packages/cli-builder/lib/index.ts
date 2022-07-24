import { Command } from 'commander';
import start from './start';
import pkg from '../package.json';

const program = new Command();

program
  .name('sppk')
  .version(pkg.version);

program
  .command('start', 'start a server for develop')
  .option('-p, --port <port-number>', 'specify port number for server', '3000')
  .action(async (options) => {
    await start(options);
  });

program.parse();
