import path from 'node:path';
import type { Configuration } from 'webpack';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import WebpackChain from 'webpack-chain';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Server, StartOptions } from '../types';
// @ts-ignore
import FriendlyErrorsWebpackPlugin from '@nuxt/friendly-errors-webpack-plugin';
import WebpackBar from 'webpackbar';
import { getIp } from '../shared/ip';
import chalk from 'chalk';

import { loadFileConfig } from '../shared/url';

const cwd = process.cwd();
const outputPath = path.resolve(cwd, 'dist');

class DevServer {
  private server!: Server;
  options: StartOptions;
  webpackChain!: WebpackChain;
  private webpackConfig!: Configuration;

  constructor (options: StartOptions) {
    this.options = options;
  }

  resolveUserConfig = async () => {
    const { fileConfig } = await loadFileConfig();
    fileConfig.webpackChain(this.webpackChain);
  };
  createWebpackConfig = () => {
    const { port } = this.options;
    const webpackChain = this.webpackChain = new WebpackChain();
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
            ` App running at`,
            ` - Local: ${chalk.cyan(`http://localhost:${port}`)}`,
            ` - Network: ${chalk.cyan(`http://${getIp()}:${port}`)}`,
          ],
        }
      }]);

    webpackChain
      .plugin('html')
      .use(HtmlWebpackPlugin, []);
    webpackChain
      .plugin('progress')
      .use(WebpackBar);
  };
  createServer = () => {
    const { devServer, ...restConfig } = this.webpackChain.toConfig();
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
        level: 'error',
      },
      ...restConfig,
    };
    const compiler = Webpack(this.webpackConfig);
    this.server = new WebpackDevServer(this.webpackConfig.devServer, compiler);
  };

  run = async () => {
    this.createWebpackConfig();
    await this.resolveUserConfig();
    this.createServer();
    await this.server.start();
  };
}

export default DevServer;
