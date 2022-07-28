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
export default {
  input: './lib/index.ts',
  output: {
    dir: './dist',
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
