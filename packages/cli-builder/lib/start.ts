import { StartOptions } from './types.js';
import detectPort from 'detect-port';
import DevService from './DevService';

const start = async (options: StartOptions) => {
  const { port } = options;
  const portNumber = Number(port);
  const newPort = await detectPort(portNumber);
  if (newPort === portNumber) {
    const service = new DevService(options);
    service.start();
  } else {
    // port was occupied, try new port ?
  }
};

export default start;
