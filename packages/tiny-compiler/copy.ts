// parsing
// lexical analysis
// syntactic analysis
// input
// (add 2 2)                 add(2, 2)
import type { Token } from './types';

const whitespaceReg = /\s/;
const letterReg = /[a-z]/;
const numberReg = /\d/;

// get tokens
export const tokenizer = (input: string) => {
  let current = 0;
  let tokens: Token[] = [];
  while (current < input.length) {
    let char = input[current];
    if (char === '(') {
      tokens.push({ type: 'paren', value: '(' });
      current++;
      continue;
    }
    if (char === ')') {
      tokens.push({ type: 'paren', value: ')' });
      current++;
      continue;
    }
    if (whitespaceReg.test(char)) {
      current++;
      continue;
    }
    // parse element inside ""
    if (char === '"') {
      let value = '';
      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'string', value });
      continue;
    }
    if (letterReg.test(char)) {
      let value = '';
      // parse all letters
      while (letterReg.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'name', value });
      continue;
    }

    if (numberReg.test(char)) {
      let value = '';
      // parse all numbers
      while (numberReg.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'number', value });
      continue;
    }
    throw new TypeError('I dont know what this character is:' + char);
  }
  return tokens;
};

// const tokens = [
//   { type: 'paren', value: '(' },
//   { type: 'name', value: 'add' },
//   { type: 'number', value: '2' },
//   { type: 'number', value: '2' },
//   { type: 'paren', value: ')' }
// ];

// (add 2 (subtract 4 2))    add(2, subtract(4, 2))
// get ast
// {
//   "type": "Program",
//   "body": [
//   {
//     "type": "CallExpression",
//     "name": "add",
//     "params": [
//       {
//         "type": "NumberLiteral",
//         "value": "2"
//       },
//       {
//         "type": "NumberLiteral",
//         "value": "2"
//       }
//     ]
//    }
//  ]
// }
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
      while (token.type !== 'paren' || (token.type === 'paren' && token.value !== ')')) {
        node.params.push(walk());
      }
      return node;
    }

    throw new TypeError(token.type);
  };
  while (current < tokens.length) {
    ast.body.push(walk());
  }
};

export const compile = (source: string) => {
  const tokens = tokenizer(source);
};
