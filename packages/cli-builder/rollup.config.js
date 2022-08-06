import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';

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
// both set rollup sourcemap and typescript sourcemap, sourcemap can work correctly
const createConfig = (input, dir) => {
  return {
    input,
    output: {
      dir,
      format: 'es',
      preserveModules: true,
      sourcemap: isDev
    },
    external,
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            sourceMap: isDev,
          }
        }
      }),
      json({ preferConst: true })
    ]
  };
};
export default [
  createConfig('./lib/index.ts', './dist'),
];
