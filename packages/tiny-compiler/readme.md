## Super Tiny Compiler

* [the super tiny compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)

Compiler:

* Parsing
  * Lexical Analysis 
  * Syntactic Analysis
* Transformation
* Code Generation

compile LISP syntax to C syntax:

```text
               LISP                      C
2 + 2          (add 2 2)                 add(2, 2)
4 - 2          (subtract 4 2)            subtract(4, 2)
2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))
```


