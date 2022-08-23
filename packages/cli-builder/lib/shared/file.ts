import fs from 'node:fs';
import path from 'node:path';
import fsp from 'node:fs/promises';

export const copyFiles = async (files: string[], srcDir: string, destDir: string) => {
  const promises = files.map(async (file) => {
    const destination = path.resolve(destDir, file);
    const source = path.resolve(srcDir, file);
    await ensureDir(destination);
    await fsp.copyFile(source, destination);
  });
  return Promise.all(promises);
};

export const ensureDir = async (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    const dirname = path.dirname(filePath);
    await fsp.mkdir(dirname, { recursive: true });
  }
};
