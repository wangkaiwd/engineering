import net from 'net';

const server = net.createServer();

server.on('connection', (...args) => {
  console.log('args', args);
});

server.listen(8000, () => {
  console.log('opened server on', server.address());
});
