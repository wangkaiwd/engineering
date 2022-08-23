import type { CreateOptions } from '../types';
import { asyncErrorHandleWrapper } from '../shared/asyncErrorHandleWrapper';
import inquirer from 'inquirer';
import path from 'node:path';
import glob from 'glob';
import { getDirname } from '../shared/url';
import fsp from 'node:fs/promises';
import fs from 'node:fs';
import { copyFiles } from '../shared/file';

const dirname = getDirname(import.meta.url);
const cwd = process.cwd();
const create = asyncErrorHandleWrapper(async (name: string, options: CreateOptions) => {
  const answer = await inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'Select features',
        name: 'features',
        choices: [
          { name: 'Babel', value: 'babel' },
          { name: 'Router', value: 'router' },
          { name: 'Typescript', value: 'typescript' },
        ],
      },
    ]);

  console.log('answer', answer);
  const rootPath = path.resolve(cwd, name);
  const templateDir = path.resolve(dirname, '../', '../', '../template');
  const files = glob.sync('./**', { dot: true, cwd: templateDir, nodir: true });
  await copyFiles(files, templateDir, rootPath);
});

export default create;
