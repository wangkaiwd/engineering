import path from 'node:path';
import glob from 'glob';
import { copyFiles } from '../shared/file';
import type { CreateOptions } from '../types';
import { getDirname } from '../shared/url';
import { getPrompts } from '../prompts/getPrompts';
import inquirer from 'inquirer';

interface CreatorOptions extends CreateOptions {
  projectName: string;
}

const dirname = getDirname(import.meta.url);
const cwd = process.cwd();

class Creator {
  private options: CreatorOptions;

  constructor (options: CreatorOptions) {
    this.options = options;
  }

  create = async () => {
    await this.resolvePrompts();
    await this.genTemplate();
  };
  resolvePrompts = async () => {
    const prompts = getPrompts();
    const answer = await inquirer.prompt(prompts);
    console.log('answer', answer);
  };
  genTemplate = async () => {
    const rootPath = path.resolve(cwd, this.options.projectName);
    const templateDir = path.resolve(dirname, '../', '../', '../template');
    const files = glob.sync('./**', { dot: true, cwd: templateDir, nodir: true });
    await copyFiles(files, templateDir, rootPath);
  };
}

export default Creator;
