import { program } from 'commander';

// option
program
  .option('-f, --first')
  .option('-s, --separator <character>');

program.parse();

// Usage:
// cli.ts -fsa -> { first:true, separator: a }
// serve -p 80
// serve -p80
// serve --port 80
// serve --port=80
const options = program.opts()
console.log('options', options);

// leaving any args not consumed by the program options in the `program.args` array
const leaveArgs = program.args
console.log('args', leaveArgs);

console.log(leaveArgs[0].split(options.separator));
