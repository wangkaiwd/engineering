import detectPort from 'detect-port';
import Service from './Service';
import cliLog from './shared/logger';
import type { StartOptions } from './types';

const start = async (options: StartOptions) => {
  const { port } = options;
  const portNumber = Number(port);
  const newPort = await detectPort(portNumber);
  if (newPort === portNumber) {
    const service = new Service(options);
    await service.start();
  } else {
    // port was occupied, try new port ?
    cliLog(`port ${portNumber} was occupied, try new port ${newPort}`);
  }
};

export default start;
