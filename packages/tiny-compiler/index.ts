//                LISP                      C
// 2 + 2          (add 2 2)                 add(2, 2)
// 4 - 2          (subtract 4 2)            subtract(4, 2)
// 2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))

function tokenizer (input: string) {
  let current = 0;
  let tokens = [];
  while (current < input.length) {
    let char = input[current];
    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '(',
      });
      current++;
      continue;
    }
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      });
      current++;
      continue;
    }
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = '';
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'number', value });
      continue;
    }
    if (char === '"') {
      let value = '';
      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({ type: 'string', value });
      continue;
    }
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'name', value });

      continue;
    }
    throw new TypeError('I dont know what this character is: ' + char);
  }
  return tokens;
}

function parser (tokens: any[]) {
  let current = 0;

  function walk (): any {
    let token = tokens[current];
    if (token.type === 'number') {
      current++;
      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }
    if (token.type === 'string') {
      current++;

      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }
    if (
      token.type === 'paren' &&
      token.value === '('
    ) {
      token = tokens[++current];
      let node: any = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };

      token = tokens[++current];
      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
        ) {
        node.params.push(walk());
        token = tokens[current];
      }
      current++;
      return node;
    }
    throw new TypeError(token.type);
  }

  let ast: any = {
    type: 'Program',
    body: [],
  };
  while (current < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
}

function traverser (ast: any, visitor: any) {

  function traverseArray (array: any, parent: any) {
    array.forEach((child: any) => {
      traverseNode(child, parent);
    });
  }

  function traverseNode (node: any, parent: any) {

    let methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {

      case 'Program':
        traverseArray(node.body, node);
        break;

      case 'CallExpression':
        traverseArray(node.params, node);
        break;

      case 'NumberLiteral':
      case 'StringLiteral':
        break;

      default:
        throw new TypeError(node.type);
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverseNode(ast, null);
}

function transformer (ast: any) {

  let newAst = {
    type: 'Program',
    body: [],
  };

  ast._context = newAst.body;

  traverser(ast, {

    NumberLiteral: {

      enter (node: any, parent: any) {

        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        });
      },
    },

    StringLiteral: {
      enter (node: any, parent: any) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        });
      },
    },

    CallExpression: {
      enter (node: any, parent: any) {

        let expression: any = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        };

        node._context = expression.arguments;

        if (parent.type !== 'CallExpression') {

          expression = {
            type: 'ExpressionStatement',
            expression,
          };
        }

        parent._context.push(expression);
      },
    }
  });
  return newAst;
}

function codeGenerator (node: any): any {

  switch (node.type) {

    case 'Program':
      return node.body.map(codeGenerator)
        .join('\n');

    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression)
      );

    case 'CallExpression':
      return (
        codeGenerator(node.callee) +
        '(' +
        node.arguments.map(codeGenerator)
          .join(', ') +
        ')'
      );

    case 'Identifier':
      return node.name;

    case 'NumberLiteral':
      return node.value;

    case 'StringLiteral':
      return '"' + node.value + '"';

    default:
      throw new TypeError(node.type);
  }
}

export function compiler (rawInput: string) {
  let tokens = tokenizer(rawInput);
  console.log('tokens', tokens);
  let ast = parser(tokens);
  console.log('ast', JSON.stringify(ast, null, 2));
  let newAst = transformer(ast);
  return codeGenerator(newAst);
}
