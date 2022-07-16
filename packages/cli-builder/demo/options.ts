import { program } from 'commander';

// option
program
  .option('-f, --first')
  .option('-s, --separator <character>')
  .option('-d, --debug');

program.parse();

// Usage:
// serve -p 80
// serve -p80
// serve --port 80
// serve --port=80

// {debug: true, small: true, pizzaType: cheese}
// -d -s -p cheese
// -ds -p cheese
// -dsp cheese
// -dspcheese

// only obtain global program options
// can't obtain options under some subcommand scope
const options = program.opts();
console.log('options', options);

// leaving any args not consumed by the program options in the `program.args` array
const leaveArgs = program.args;
console.log('args', leaveArgs);

// following usage will get the same output
// ts-node options.ts -fds/ a/b/c
// ts-node options.ts -fds / a/b/c
// ts-node options.ts -fd -s / a/b/c
// ts-node options.ts -fd -s/ a/b/c
// ts-node options.ts -fd --separator / a/b/c
// ts-node options.ts -fd --separator=/ a/b/c
console.log(leaveArgs[0].split(options.separator));
