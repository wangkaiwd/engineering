import path from 'node:path';
import glob from 'fast-glob';
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
    const projectRootPath = path.resolve(cwd, this.options.projectName);
    const templateDir = path.resolve(dirname, '../', '../', '../template');
    const files = await glob('./**', { dot: true, cwd: templateDir, onlyFiles: true });
    await copyFiles({ files: files, srcDir: templateDir, destDir: projectRootPath, presets: this.options });
  };
}

export default Creator;
