import type { AsyncFn } from '../types';

export const asyncErrorHandleWrapper = (fn: AsyncFn) =>
  (...args: any[]) =>
    fn(...args).catch((error: any) => {
      console.log('error', error);
    });
