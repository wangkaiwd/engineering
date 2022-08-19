import { compile } from '../compile';
import { tokenizer } from '../core/tokenizer';
import { parser } from '../core/parser';

describe('Compiler', () => {
  const tokens = [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'number', value: '2' },
    { type: 'paren', value: ')' }
  ];
  it('should get tokens', () => {
    expect(tokenizer('(add 2 2)')).toEqual(tokens);
  });
  it('should get ast', () => {
    expect(parser(tokens)).toMatchInlineSnapshot(`
        Object {
          "body": Array [
            Object {
              "name": "add",
              "params": Array [
                Object {
                  "type": "NumberLiteral",
                  "value": "2",
                },
                Object {
                  "type": "NumberLiteral",
                  "value": "2",
                },
              ],
              "type": "CallExpression",
            },
          ],
          "type": "Program",
        }
    `);
  });
  it('should compile code correctly', () => {
    expect(compile('(add 2 (subtract 4 2))')).toBe('add(2,subtract(4,2))');
  });
});
