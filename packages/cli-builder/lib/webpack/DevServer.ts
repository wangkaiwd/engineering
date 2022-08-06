import path from 'node:path';
import type { Configuration } from 'webpack';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import WebpackChain from 'webpack-chain';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Server, StartOptions } from '../types';
// @ts-ignore
import FriendlyErrorsWebpackPlugin from '@nuxt/friendly-errors-webpack-plugin';
import { getIp } from '../shared/ip';

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
    const webpackChain = new WebpackChain();
    const outputPath = path.resolve(cwd, 'dist');
    // output and input
    webpackChain
      .context(path.resolve(cwd))
      .entry('index')
      .add('./src/index.js')
      .end()
      .mode('development')
      .output
      .filename('main.js')
      .path(outputPath)
      .clear()
      .end();
    // devServer
    webpackChain
      .devServer
      .port(Number(port))
      .end();

    webpackChain
      .stats('errors-only');
    webpackChain
      .plugin('friendly-errors')
      .use(FriendlyErrorsWebpackPlugin, [{
        compilationSuccessInfo: {
          messages: [
            `Your application is running here http://localhost:${port}`,
            `Network: http://${getIp()}:${port}`
          ],
        }
      }]);

    webpackChain
      .plugin('html')
      .use(HtmlWebpackPlugin, []);

    const { devServer, ...restConfig } = webpackChain.toConfig();
    // webpackChain.
    this.webpackConfig = {
      devServer: {
        static: outputPath,
        client: {
          logging: 'error'
        },
        ...devServer
      },
      // disable webpack devServer log
      infrastructureLogging: {
        level: 'none',
      },
      ...restConfig,
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

export default DevServer;
