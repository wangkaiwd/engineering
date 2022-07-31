import type WebpackDevServer from 'webpack-dev-server';

export interface StartOptions {
  port: string;
}

export type Server = InstanceType<typeof WebpackDevServer>
