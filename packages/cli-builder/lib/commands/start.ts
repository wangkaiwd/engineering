import detectPort from 'detect-port';
import Service from '../Service';
import type { StartOptions } from '../types';
import inquirer from 'inquirer';

const start = async (options: StartOptions) => {
  // port is string, need convert to number
  const port = Number(options.port);
  const newPort = await detectPort(port);

  if (newPort === port) {
    const service = new Service(options);
    await service.start();
  } else {
    const { continueWithNewPort } = await inquirer.prompt({
      type: 'confirm',
      name: 'continueWithNewPort',
      message: `port ${port} was in used, would you run server with port ${newPort}`,
      default: true
    });
    if (continueWithNewPort) {
      options.port = String(newPort);
      const service = new Service(options);
      await service.start();
    } else {
      process.exit(1);
    }
  }
};

export default start;
