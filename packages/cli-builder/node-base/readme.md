## Node.js

* stream
* child process
* buffer

### Child Process

* spawn
* fork
  * The returned `ChildProcess` will have an additional communication channel built-in that allows messages to be passed
    back and forth between the parent and child.
  * Keep in mind that spawned Node.js child processes are independent of the parent with exception of the IPC
    communication channel that is established between the two
  * [IPC communication demo](https://nodejs.org/dist/latest-v16.x/docs/api/child_process.html#subprocesssendmessage-sendhandle-options-callback)
