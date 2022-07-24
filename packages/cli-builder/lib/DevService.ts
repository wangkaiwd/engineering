import chokidar from 'chokidar';
import path from 'path';
import { StartOptions } from './types';

const CONFIG_FILENAME = 'lib.config.ts';

class DevService {
  private options: StartOptions;

  constructor (options: StartOptions) {
    this.options = options;
  }

  start () {
    this.runWatcher();
  }

  runWatcher () {
    this.watch();
  }

  watch () {
    const configFilePath = path.resolve(__dirname, CONFIG_FILENAME);
    chokidar.watch(configFilePath).on('all', (eventName, path, stats) => {
      console.log('eventName,path,stats', eventName, path, stats);
    });
  }
}

export default DevService;
