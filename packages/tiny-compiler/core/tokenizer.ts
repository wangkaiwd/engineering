// get tokens
import type { Token } from '../types';
import { letterReg, numberReg, whitespaceReg } from '../utils/regex';

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
