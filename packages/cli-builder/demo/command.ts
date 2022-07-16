import { Command } from 'commander';
// export.program = new Command()
// import { program } from 'commander'
// program is global command

const program = new Command();

program
  .option('-d, --debug', 'enable debug mode');

// command will execute new Command() and return it
// and description, option which attach to it will return this
program
  .command('create <name>')
  .description('create something')
  .option('--first', 'this is first')
  .action((name, options) => {
    console.log('args', name, options);
  });

program.parse();

// console.log(program.opts(), program.optsWithGlobals());
