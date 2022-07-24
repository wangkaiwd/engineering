import npmlog, { LogLevels } from 'npmlog';
import { CLI_NAME } from './constant';
import chalk from 'chalk';

// 1. has fixed prefix
// 2. can change log level dynamic
// 3. log with color
// 4. todo: can log object ?
// Usage:
// log[level](message)
// log(message)
//
type CliLogLevels = 'silly' | 'verbose' | 'info' | 'http' | 'warn' | 'error'
type LevelFn = (message: string, ...args: any[]) => void
type LogProps = {
  [k in CliLogLevels]: LevelFn;
} & { (message: string, ...args: any[]): void; }

const prefix = CLI_NAME;

const colorMap = {
  silly: 'white',
  verbose: 'white',
  info: 'cyan',
  http: 'blue',
  warn: 'yellow',
  error: 'red'
} as const;

const logLevels: CliLogLevels[] = ['silly', 'verbose', 'info', 'http', 'warn', 'error'];

const levelFnCreator = (level: CliLogLevels) => {
  return (message: string, ...args: any[]) => {
    const colorMessage = chalk[colorMap[level]](message);
    return npmlog[level](prefix, colorMessage, ...args);
  };
};

const cliLog = levelFnCreator('info') as LogProps;

logLevels.forEach(level => {
  cliLog[level] = levelFnCreator(level);
});

export default cliLog;

