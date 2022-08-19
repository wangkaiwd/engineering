import type { Ast } from '../types';
import { traverser } from './traverser';

export const transformer = (ast: Ast) => {
  const newAst = {
    type: 'Program',
    body: []
  };
  ast._context = newAst.body;
  traverser(ast, {
    NumberLiteral: {
      enter (node: any, parent: any) {
        parent._context.push({ type: 'NumberLiteral', value: node.value });
      }
    },
    StringLiteral: {
      enter (node: any, parent: any) {
        parent._context.push({ type: 'StringLiteral', value: node.value });
      }
    },
    CallExpression: {
      enter (node: any, parent: any) {
        let expression: any = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name
          },
          arguments: []
        };
        node._context = expression.arguments;
        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression
          };
        }
        parent._context.push(expression);
      }
    }
  });
  return newAst;
};
