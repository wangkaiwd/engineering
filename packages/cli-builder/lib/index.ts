import { Command } from 'commander';
import start from './start';
import { CLI_NAME, VERSION } from './shared/constant';
import { setLogLevel } from './shared/logger';

const program = new Command();

program
  .name(CLI_NAME)
  .version(VERSION)
  .usage(`<command> [options]`);

program
  .option('-d, --debug', 'enable debug mode')
  .hook('preAction', (thisCommand) => {
    const { debug } = thisCommand.opts();
    // must set log level before other logic
    setLogLevel(debug ? 'verbose' : 'info');
  });
// this not execute when add command
// .action((...args) => {
//   console.log('args', args);
// });

program
  // todo: try standalone command
  .command('start')
  .description('start a server for develop')
  .option('-p, --port [port-number]', 'specify port number for server', '3000')
  .action(async (options) => {
    await start(options);
  });

program.parse();
