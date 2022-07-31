import path from 'node:path';
import type { StartOptions } from './types';
import type { ChildProcess } from 'child_process';
import { fork } from 'child_process';
import { getDirname, getUserConfigFilePath } from './shared/url';
import fs from 'fs';
import chokidar from 'chokidar';
import cliLog from './shared/logger';

const dirname = getDirname(import.meta.url);

class Service {
  options: StartOptions;
  devServerChildProcess?: ChildProcess;

  constructor (options: StartOptions) {
    this.options = options;
  }

  async start () {
    await this.runServer();
    await this.runWatcher();
  }

  runServer = async () => {
    // must build child process code individually
    this.devServerChildProcess = fork(path.resolve(dirname, './webpack/DevServer.js'), ['--port', this.options.port]);
  };

  async runWatcher () {
    await this.watch();
  }

  watch = async () => {
    const userConfigFile = getUserConfigFilePath();
    if (fs.existsSync(userConfigFile)) {
      const { default: userConfig } = await import(userConfigFile);
      chokidar.watch(userConfigFile).on('change', async () => {
        cliLog('Config file make changes, server is restarting...');
        this.devServerChildProcess?.kill();
        await this.runServer();
      });
    }
  };
}

export default Service;
