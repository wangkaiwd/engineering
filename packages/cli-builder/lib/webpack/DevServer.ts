import path from 'node:path';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import type { Server, StartOptions } from '../types';
import type { Configuration } from 'webpack';
import minimist from 'minimist';

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
        port: this.options.port
      }
    };
  };
  createServer = () => {
    const compiler = Webpack(this.webpackConfig);
    this.server = new WebpackDevServer(this.webpackConfig.devServer, compiler);
  };

  runServer = async () => {
    await this.server.start();
  };
}

const devServer = new DevServer({ port: argv.port });
await devServer.runServer();
