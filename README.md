# BuildingEvaInterpreter
Building an Interpreter for the Language 'Eva' in Javascript

## Design Goals
- Simple syntax: S-expression
- Everything is an expression
- No explicit return, last evaluated expression is the result
- First-class functions
    - assign to variables
    - Pass as arguments
    - return as values
- Static Scope: all functions are closures
- Lambda functions, Immediately Invoked Lambda Expressions (IILE)
- Functional programming
- Imperative programming
- Namespaces and modules
- OOP
    - Class-based
    - prototype based

## Functions
### Native functions
- +, -, *, /, % 
    - Natively supported operations
    - They are defined in the global enviroment
    - Example Usages:
        - (+ 1 5)
        - (* 3 4)
        - (+ 1 (* 4 6))
### User defined Functions
- Functions can be declared as: (def square (x) (* x x))
- Invoked by: (square 4)

### Lambda expression
- Create an anonymous function
- Lambda function: (lambda (data) (* data 10))
    -  (def onClick (callback)
            (begin
                (var x 10)
                (var y 20)
                (callback (+ x y))
            )
        )            
        (onClick (lambda (data) (* data 10)))
- Immediately Invoked Lambda Expressions : ((lambda (x) (* x x)) 10)
    - call lambda with an input argument and return the value
- Save lambda to a variable
    - (var square (lambda (x) (* x x)))
      (square 2)


## Dependencies
### syntax-cli
Install it from npm
```bash
sudo npm install -g syntax-cli
syntax-cli --help
```

## References
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

All credits to the original author of this course: Dmitry Soshikinov