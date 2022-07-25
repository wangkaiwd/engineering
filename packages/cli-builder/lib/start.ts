import { StartOptions } from './types.js';
import detectPort from 'detect-port';
import DevService from './DevService';
import cliLog from './shared/logger';

const start = async (options: StartOptions) => {
  const { port } = options;
  const portNumber = Number(port);
  const newPort = await detectPort(portNumber);
  if (newPort === portNumber) {
    const service = new DevService(options);
    service.start();
  } else {
    // port was occupied, try new port ?
    cliLog(`port ${portNumber} was occupied, try new port ${newPort}`);
    cliLog.verbose('this is verbose message');
  }
};

export default start;
