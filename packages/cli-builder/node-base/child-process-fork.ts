import { fork } from 'child_process';
import path from 'path';

// spawn new Node.js processes
const child = fork(path.resolve(__dirname, './dev-service.ts'));
// IPC
// child.on('message', (message) => {
//   console.log('Parent get message:', message);
// });
//
// child.send({ name: 'parent' });
