import { Command } from 'commander';
import start from './start';
import { CLI_NAME, VERSION } from './shared/constant';
import cliLog from './shared/logger';
import chalk from 'chalk';

const program = new Command();

program
  .name(CLI_NAME)
  .version(VERSION)
  .usage(`<command> [options]`);

program
  .option('-d, --debug', 'enable debug mode')
  .action((options) => {
    // fixme: why this not log ?
    cliLog(options.debug);
  });

program
  // todo: try standalone command
  .command('start')
  .description('start a server for develop')
  .option('-p, --port [port-number]', 'specify port number for server', '3000')
  .action(async (options) => {
    await start(options);
  });

program.parse();
