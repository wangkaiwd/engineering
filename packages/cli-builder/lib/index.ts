import chokidar from 'chokidar';
import path from 'path';

const configFilePath = path.resolve(__dirname, './lib.config.ts');
chokidar.watch(configFilePath).on('all', (eventName, path, stats) => {
  console.log('eventName,path,stats', eventName, path, stats);
});
