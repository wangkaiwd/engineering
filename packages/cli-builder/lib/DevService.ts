import { StartOptions } from './types';

class DevService {
  private options: StartOptions;

  constructor (options: StartOptions) {
    this.options = options;
  }

  start () {
    console.log('start');
  }

  runWatcher () {

  }
}

export default DevService;
