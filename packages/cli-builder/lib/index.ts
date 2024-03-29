import { Command } from 'commander';
import start from './commands/start';
import { CLI_NAME, VERSION } from './shared/constant';
import { setLogLevel } from './shared/logger';
import inspect from './commands/inspect';
import type { CreateOptions } from './types';
import create from './commands/create';

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
  .command('create <project-name>')
  .description('create project with project name')
  .option('-b, --bare', 'create bare project')
  .action(async (name: string, options: CreateOptions) => {
    await create(name, options);
  });

program
  .command('start')
  .description('start a server for develop')
  .option('-p, --port [port-number]', 'specify port number for server', '3000')
  .action(async (options) => {
    await start(options);
  });

program
  .command('inspect')
  .description('inspect webpack config')
  .action(() => {
    inspect();
  });

program.parse();
