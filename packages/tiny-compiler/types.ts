export interface Token {
  type: string;
  value: string;
}

export interface Ast {
  [K: string]: any;
}

interface VisitProps {
  enter? (node: any, parent: any): void;

  exit? (node: any, parent: any): void;
}

export interface Visitor {
  [K: string]: VisitProps;
}

