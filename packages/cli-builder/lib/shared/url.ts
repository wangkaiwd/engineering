import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { CONFIG_FILENAME } from './constant';

export const getFilename = (fileUrl: string) => fileURLToPath(fileUrl);
export const getDirname = (fileUrl: string) => path.dirname(getFilename(fileUrl));

export const getUserConfigFilePath = () => {
  const require = createRequire(process.cwd());
  return require.resolve(path.resolve(process.cwd(), CONFIG_FILENAME), { paths: [path.resolve(process.cwd(), CONFIG_FILENAME)] });
};
