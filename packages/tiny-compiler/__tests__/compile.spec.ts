import { compile} from '../compile';
import { tokenizer } from '../core/tokenizer';
import { parser } from '../core/parser';

describe('Compiler', () => {
  it('should get tokens', () => {
    const tokens = [
      { type: 'paren', value: '(' },
      { type: 'name', value: 'add' },
      { type: 'number', value: '2' },
      { type: 'number', value: '2' },
      { type: 'paren', value: ')' }
    ];
    expect(tokenizer('(add 2 2)')).toEqual(tokens);
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
    compile('(add 2 (subtract 4 2))');
  });
});
