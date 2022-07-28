import path from 'node:path';
import { StartOptions } from './types';
import { CONFIG_FILENAME } from './shared/constant';

class DevService {
  private options: StartOptions;

  constructor (options: StartOptions) {
    this.options = options;
  }

  async start () {
    await this.runWatcher();
  }

  async runWatcher () {
    await this.watch();
  }

  async watch () {
    const configFilePath = path.resolve(process.cwd(), CONFIG_FILENAME);
    // if (fs.existsSync(configFilePath)) {
    //   const { default: userConfig } = await import(configFilePath);
    //   console.log('useConfig', userConfig);
    // }
    // chokidar.watch(configFilePath).on('all', (eventName, path, stats) => {
    //   console.log('eventName,path,stats', eventName, path, stats);
    // });
  }
}

export default DevService;
