import { tokenizer } from './core/tokenizer';
import { parser } from './core/parser';
import { transformer } from './core/transformer';
import { codeGenerator } from './core/codeGenerator';

export const compile = (source: string) => {
  const tokens = tokenizer(source);
  const ast = parser(tokens);
  const newAst = transformer(ast);
  return codeGenerator(newAst);
};
