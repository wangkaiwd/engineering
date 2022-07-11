import { program } from 'commander';

// option
//
program
  .option('-f, --first')
  .option('-s, --separator <character>');

program.parse(process.argv);

// Usage:
// cli.ts -fsa -> { first:true, separator: a }
// serve -p 80
// serve -p80
// serve --port 80
// serve --port=80
console.log('options', program.opts());

