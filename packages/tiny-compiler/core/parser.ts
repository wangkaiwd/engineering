import type { Token } from '../types';

export const parser = (tokens: Token[]) => {
  const ast = {
    type: 'Program',
    body: [] as any[]
  };
  let current = 0;
  // recursive
  // can't use for loop
  const walk = () => {
    let token = tokens[current];
    if (token.type === 'string') {
      current++;
      return {
        type: 'StringLiteral',
        value: token.value
      };
    }
    if (token.type === 'number') {
      current++;
      return {
        type: 'NumberLiteral',
        value: token.value
      };
    }
    // open parenthesis, close parenthesis
    if (token.type === 'paren' && token.value === '(') {
      token = tokens[++current];
      // open
      const node = {
        type: 'CallExpression',
        name: token.value,
        params: [] as any[]
      };
      token = tokens[++current];
      // close
      //  (add (subtract 4 2) 2)
      // close parenthesis will stop loop
      while (token.type !== 'paren' || (token.type === 'paren' && token.value !== ')')) {
        node.params.push(walk());
        token = tokens[current];
      }
      // handle ")"
      current++;
      return node;
    }

    throw new TypeError(token.type);
  };
  while (current < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
};
