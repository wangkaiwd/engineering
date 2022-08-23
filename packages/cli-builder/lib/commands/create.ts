import type { CreateOptions } from '../types';
import { asyncErrorHandleWrapper } from '../shared/asyncErrorHandleWrapper';
import Creator from '../core/Creator';

const create = asyncErrorHandleWrapper(async (name: string, options: CreateOptions) => {
  const creator = new Creator({ ...options, projectName: name });
  await creator.create();
});

export default create;
