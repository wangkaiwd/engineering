## Try Commander

### Option

* options on the command line are not positional, and can be specified before or after other arguments

option usage demo:

```shell
// opts: {debug: true, small: true, pizzaType: cheese} 
-d -s -p cheese
-ds -p cheese
-dsp cheese
-dspcheese
```

following usage will get the same output:

```shell
ts-node options.ts -fds/ a/b/c
ts-node options.ts -fds / a/b/c
ts-node options.ts -fd -s / a/b/c
ts-node options.ts -fd -s/ a/b/c
ts-node options.ts -fd --separator / a/b/c
ts-node options.ts -fd --separator=/ a/b/c
```

option arguments:

### Command

* command will execute `new Command()`
  and [return it](https://github.com/tj/commander.js/blob/82fcb98cc27164a98e0c5f2c6f54621b5bbceef9/lib/command.js#L161)
* description, option which attach to it
  will [return this](https://github.com/tj/commander.js/blob/82fcb98cc27164a98e0c5f2c6f54621b5bbceef9/lib/command.js)

### Terminology

* `variadic`: Taking a variable number of arguments; especially, taking arbitrarily many arguments

If `variadic` argument is the last argument of option, we can leverage `--` get any leave arguments:

```shell
ts-node options-variadic.ts -l a b c d -- args:
# opts { letters: [ 'a', 'b', 'c', 'd' ] }
# args [ 'args' ]
```
