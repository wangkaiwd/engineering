## Feature

* check minimal `node.js` version
* restart server when configuration files make changes

### Some commonly used package

* minimist
* execa
* semver
* chalk
* npmlog
* fs-extra
* detect-port
* chokidar

### Record

#### nodejs es module
 
* [mandatory file extensions](https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_mandatory_file_extensions)
* [pure-esm-package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package)

Ecmascript modules in nodejs that a file extension must be provided when using the `import` keyword to resolve relative
or absolute specifiers. So I think wo have two choice:

* Manual add file extensions for every `import` keyword specifiers, we can complete this by `IDE`
* Auto add file extensions by compiler such as `webpack`,`rollup`,`vite` and so on

Problems:

* __filename,__dirname work correctly in ts but occur error in js
* Why use `spawn` to spawn a child process ? (need `stdio` ?)

#### Error handle

```ts
// make use information of stats object
webpck((err,stats) => {
  // error and error stack in stats
  // warning
  console.log('stats',stats.toJson({all:false, errors:true, warning: true}))
})
```

#### Plugin mechanism

Core webpack config:
* vue plugin to support vue

study:
*  umi plugin vs vue-cli plugin

#### all babel plugin and preset which associate with react

### Rollup

Why use rollup to generate bundle ?

Note: rollup can not compile file that own shebang characters.

Plugin:

* esbuild
* json

Options:

* external
* preserveModules
