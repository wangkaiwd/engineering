import type { StartOptions } from './types';
import DevServer from './webpack/DevServer';

class Service {
  options: StartOptions;

  constructor (options: StartOptions) {
    this.options = options;
  }

  async start () {
    await this.runServer();
  }

  runServer = async () => {
    const devServer = new DevServer(this.options);
    await devServer.run();
  };
}

export default Service;
