import type WebpackDevServer from 'webpack-dev-server';

export interface StartOptions {
  port: string;
}

export type Server = InstanceType<typeof WebpackDevServer>

export interface CreateOptions {
  bare: true;
}

export type AsyncFn = (...args: any[]) => Promise<any>
