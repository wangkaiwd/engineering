import fs from 'node:fs';
import path from 'node:path';
import fsp from 'node:fs/promises';
import ejs from 'ejs';

interface CopyFilesParams {
  files: string[];
  presets: Record<string, any>;
  srcDir: string;
  destDir: string;
  withEjs?: boolean;
}

export const copyFiles = async ({ files, srcDir, destDir, withEjs = true, presets }: CopyFilesParams) => {
  const promises = files.map(async (file) => {
    const destination = path.resolve(destDir, file);
    const source = path.resolve(srcDir, file);
    let template = await fsp.readFile(source, { encoding: 'utf8' });
    await ensureDir(destination);
    if (withEjs) {
      template = await ejs.render(template, presets, { async: true });
    }
    await fsp.writeFile(destination, template);
  });
  return Promise.all(promises);
};

export const ensureDir = async (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    const dirname = path.dirname(filePath);
    await fsp.mkdir(dirname, { recursive: true });
  }
};
