import { compile, tokenizer } from './copy';
import { compiler } from './index';

describe('Compiler', () => {
  it('should get tokens', () => {
    const tokens = [
      { type: 'paren', value: '(' },
      { type: 'name', value: 'add' },
      { type: 'number', value: '2' },
      { type: 'number', value: '2' },
      { type: 'paren', value: ')' }
    ];
    // expect(tokenizer('(add 2 2)')).toBe(tokens);
    // compiler('(add 2 2)');
  });
  it('should todo', () => {
    compiler(' (add 2 (subtract 4 2))');
  });
});
