import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import json from 'rollup-plugin-json';
import pkg from './package.json';
import { builtinModules } from 'module';

const external = [
  'fsevents',
  ...Object.keys(pkg.dependencies),
  ...builtinModules
];
export default {
  input: './lib/index.ts',
  output: {
    dir: './dist',
    format: 'es',
    preserveModules: true
  },
  external,
  plugins: [
    esbuild(),
    resolve(),
    commonjs(),
    json({ preferConst: true })
  ]
};
