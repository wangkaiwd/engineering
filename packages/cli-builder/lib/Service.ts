import path from 'node:path';
import type { StartOptions } from './types';
import { CONFIG_FILENAME } from './shared/constant';
import DevServer from './webpack/DevServer';

class Service {
  options: StartOptions;

  constructor (options: StartOptions) {
    this.options = options;
  }

  async start () {
    await this.runServer();
    await this.runWatcher();
  }

  runServer = async () => {
    const devServer = new DevServer();
    await devServer.runServer();
  };

  async runWatcher () {
    await this.watch();
  }

  async watch () {
    // const configFilePath = path.resolve(process.cwd(), CONFIG_FILENAME);
    // if (fs.existsSync(configFilePath)) {
    //   const { default: userConfig } = await import(configFilePath);
    //   console.log('useConfig', userConfig);
    // }
    // chokidar.watch(configFilePath).on('all', (eventName, path, stats) => {
    //   console.log('eventName,path,stats', eventName, path, stats);
    // });
  }
}

export default Service;
