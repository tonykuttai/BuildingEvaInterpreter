# BuildingEvaInterpreter
Building an Interpreter for the Language Eva in Javascript

## Design Goals
- Simple syntax: S-expression
- Everything is an expression
- No explicit return, last evaluated expression is the result
- First-class functions
    - assign to variables
    - Pass as arguments
    - return as values
- Static Scope: all functions are closures
- Lambda functions, IILEs
- Functional programming
- Imperative programming
- Namespaces and modules
- OOP
    - Class-based
    - prototype based

## Dependencies

### syntax-cli
Install it from npm
```bash
sudo npm install -g syntax-cli
syntax-cli --help
```

## Reference 
### Use Syntax-cli to test the grammar

```bash
syntax-cli --grammar parser/eva-grammer.bnf --mode LALR1 --parse '42'
syntax-cli --grammar parser/eva-grammer.bnf --mode LALR1 --parse '42' --tokenize
syntax-cli --grammar parser/eva-grammer.bnf --mode LALR1 --parse '(+ 5 foo)'
```

### Generate the eva Parser
```bash
syntax-cli --grammar parser/eva-grammer.bnf --mode LALR1 --output parser/evaParser.js
```

