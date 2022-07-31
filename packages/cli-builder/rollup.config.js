import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import json from 'rollup-plugin-json';
import pkg from './package.json';
import { builtinModules } from 'module';

const MODE = process.env.MODE;
const isDev = MODE === 'dev';
const external = [
  'fsevents',
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.devDependencies),
  ...builtinModules
];
const createConfig = (input, dir) => {
  return {
    input,
    output: {
      dir,
      format: 'es',
      sourcemap: isDev,
      preserveModules: true
    },
    external,
    plugins: [
      esbuild({ target: 'esnext' }),
      resolve(),
      commonjs(),
      json({ preferConst: true })
    ]
  };
};
export default [
  createConfig('./lib/index.ts', './dist'),
  // build child process
  createConfig('./lib/webpack/DevServer.ts', './dist/lib/webpack'),
];
