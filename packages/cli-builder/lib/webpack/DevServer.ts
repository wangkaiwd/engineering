import path from 'node:path';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import type { Server } from '../types';
import type { Configuration } from 'webpack';

const cwd = process.cwd();
const webpackConfig: Configuration = {
  entry: './src/index.js',
  mode: 'development',
  context: path.resolve(process.cwd()),
  output: {
    filename: 'main.js',
    path: path.resolve(cwd, 'dist'),
  },
  devServer: {
    static: path.resolve(cwd, 'dist')
  }
};

class DevServer {
  private server!: Server;

  constructor () {
    this.createServer();
  }

  createServer = () => {
    const compiler = Webpack(webpackConfig);
    this.server = new WebpackDevServer(webpackConfig.devServer, compiler);
  };

  runServer = async () => {
    await this.server.start();
  };
}

export default DevServer;
