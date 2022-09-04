import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { CONFIG_FILENAME } from './constant';

export const getFilename = (fileUrl: string) => fileURLToPath(fileUrl);
export const getDirname = (fileUrl: string) => path.dirname(getFilename(fileUrl));

export const loadFileConfig = async () => {
  const context = process.cwd();
  const require = createRequire(context);
  const fileConfigPath = require.resolve(path.resolve(context, CONFIG_FILENAME), { paths: [path.resolve(context, CONFIG_FILENAME)] });
  const { default: fileConfig } = await import(fileConfigPath);
  return {
    fileConfigPath,
    fileConfig
  };
};
