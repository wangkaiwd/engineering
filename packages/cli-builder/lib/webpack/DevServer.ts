import path from 'node:path';
import type { Configuration } from 'webpack';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import type { Server, StartOptions } from '../types';
import minimist from 'minimist';
// @ts-ignore
import FriendlyErrorsWebpackPlugin from '@nuxt/friendly-errors-webpack-plugin';
import os from 'os';

const getIp = () => {
  const networkInterfaces = os.networkInterfaces();
  return networkInterfaces.en7?.[1].address;
};
const argv = minimist(process.argv.slice(2));
const cwd = process.cwd();

class DevServer {
  private server!: Server;
  options: StartOptions;
  private webpackConfig!: Configuration;

  constructor (options: StartOptions) {
    this.options = options;
    this.createWebpackConfig();
    this.createServer();
  }

  createWebpackConfig = () => {
    const { port } = this.options;
    this.webpackConfig = {
      entry: './src/index.js',
      mode: 'development',
      context: path.resolve(process.cwd()),
      output: {
        filename: 'main.js',
        path: path.resolve(cwd, 'dist'),
      },
      devServer: {
        static: path.resolve(cwd, 'dist'),
        port: port,
        client: {
          progress: true
        }
      },
      infrastructureLogging: {
        level: 'none',
      },
      stats: 'errors-only',
      plugins: [
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              `You application is running here http://localhost:${port}`,
              `Network: http://${getIp()}:${port}`
            ],
          }
        })
      ]
    };
  };
  createServer = () => {
    const compiler = Webpack(this.webpackConfig);
    this.server = new WebpackDevServer(this.webpackConfig.devServer, compiler);
    // compiler.hooks.done.tap('DevServer Start', (stats) => {
    //   console.log('done');
    //   console.log();
    //   console.log(chalk.cyan(`Local-localhost:${this.options.port}`));
    //   console.log(chalk.cyan(`Network-${getIp()}`));
    // });
  };

  runServer = async () => {
    await this.server.start();
  };
}

const devServer = new DevServer({ port: argv.port });
await devServer.runServer();
