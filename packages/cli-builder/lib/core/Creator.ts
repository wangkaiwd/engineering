import path from 'node:path';
import glob from 'fast-glob';
import { copyFiles } from '../shared/file';
import type { CreateOptions } from '../types';
import { getDirname } from '../shared/url';
import { getPrompts } from '../prompts/getPrompts';
import inquirer from 'inquirer';
import { spawn } from 'node:child_process';
import { promisify } from 'node:util';

const pSpawn = promisify(spawn);

interface CreatorOptions extends CreateOptions {
  projectName: string;
}

const dirname = getDirname(import.meta.url);
const cwd = process.cwd();

class Creator {
  options: CreatorOptions;
  projectRootPath: string;

  constructor (options: CreatorOptions) {
    this.options = options;
    this.projectRootPath = path.resolve(cwd, this.options.projectName);

  }

  create = async () => {
    await this.resolvePrompts();
    await this.genTemplate();
    // install dependencies
    const pkManager = await this.selectPackageManager();
    // npm install
    await pSpawn(pkManager, ['install'], { cwd: this.projectRootPath, stdio: 'inherit' });
  };
  selectPackageManager = async () => {
    const { manager } = await inquirer
      .prompt<{ manager: string }>({
        type: 'list',
        name: 'manager',
        message: 'Select your package manager ?',
        choices: [
          'npm',
          'yarn',
          'pnpm'
        ],
      });
    return manager;
  };
  resolvePrompts = async () => {
    const prompts = getPrompts();
    const answer = await inquirer.prompt(prompts);
  };
  genTemplate = async () => {
    const templateDir = path.resolve(dirname, '../', '../', '../template');
    const files = await glob('./**', { dot: true, cwd: templateDir, onlyFiles: true });
    await copyFiles({ files: files, srcDir: templateDir, destDir: this.projectRootPath, presets: this.options });
  };
}

export default Creator;
