import type { Ast } from '../types';

export const codeGenerator = (node: Ast): string => {
  if (node.type === 'NumberLiteral') {
    return node.value;
  }
  if (node.type === 'StringLiteral') {
    return `"${node.value}"`;
  }
  if (node.type === 'Identifier') {
    return node.name;
  }
  if (node.type === 'Program') {
    return node.body.map(codeGenerator).join('\n');
  }
  if (node.type === 'ExpressionStatement') {
    return codeGenerator(node.expression);
  }
  if (node.type === 'CallExpression') {
    return node.callee.name + '(' + node.arguments.map(codeGenerator).join(',') + ')';
  }
  throw new TypeError(node.value);
};
