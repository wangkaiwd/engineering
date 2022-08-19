import type { Ast, Visitor } from '../types';

export const traverser = (ast: Ast, visitor: Visitor) => {
  const traverseArray = (nodes: any[], parent: any) => {
    nodes.forEach(node => {
      traverseNode(node, parent);
    });
  };
  const traverseNode = (node: any, parent: any) => {
    const methods = visitor[node.type];
    methods?.enter?.(node, parent);
    if (node.type === 'Program') {
      traverseArray(node.body, node);
    }
    if (node.type === 'CallExpression') {
      traverseArray(node.params, node);
    }
    methods?.exit?.(node, parent);
  };
  traverseNode(ast, null);
};
