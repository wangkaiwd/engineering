import { Command } from 'commander';

const program = new Command();

program
  .option('-l, --letters <letters...>', 'specify letters')
  // .option('-d, --debug', 'debug');

program.parse();

console.log('opts', program.opts());

// if variadic option is last argument, leverage -- get any leave arguments
console.log('args', program.args);

// ts-node options-variadic.ts -l a b c d -- args:
// opts { letters: [ 'a', 'b', 'c', 'd' ] }
// args [ 'args' ]
