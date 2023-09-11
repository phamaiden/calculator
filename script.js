const display = document.querySelector('.display');
let operator;
let firstNumber, secondNumber;
let result;
let displayValue = '0';

// Display control
function updateDisplay() {
    display.innerText = displayValue;
}

updateDisplay();

// Operate functions
function operate(operator, a, b) {
    let res = 0;
    let x = parseFloat(a);
    let y = parseFloat(b);
    // switch (operator){
    //     case '+':
    //         res = x + y;
    //     case '-':
    //         res = x - y;
    //     case '*':
    //         res = x * y;
    //     case '/':
    //         if (y === 0) {
    //             return 'error';
    //         } else {
    //             res = x / y;
    //         }
    //}
    if (operator === '+') {
        res = x+y;
    } else if (operator === '-') {
        res = x-y;
    } else if (operator === '*') {
        res = x*y;
    } else if (operator === '/') {
        if (y === 0) {
            return 'error';
        } res = x/y;
    }
    if (res.toString().length < 14) return res;
    return res.toExponential(5);
}

function addDigit(digit) {
    if (!operator) { // case 1: first number hasn't been entered
        if (displayValue === '0') { 
            displayValue = digit;
        } else if (displayValue === firstNumber) {
            displayValue = digit;
        } else if (displayValue === result) { // if new digit is pressed after solution
            displayValue = digit;
        }
        else {
            displayValue += digit;
        }
    }
    if (operator) { // if operator is clicked, continue to second number
        if (displayValue === firstNumber) {
            displayValue = digit;
        } else {
            displayValue += digit;
        }
    }
    updateDisplay();
}

function addOperator(op) {
    // if (displayValue) {
    //     firstNumber = displayValue;
    //     operator = op;
    //     console.log(firstNumber);
    // } else if (firstNumber && displayValue){
        
    // } else if (!displayValue || !firstNumber) {
    //     // don't do anything if first number hasn't been entered
    // } else if (displayValue === secondNumber) {
    //     equals();
    // }
    if (displayValue && operator) {
        equals();
        operator = op;
    }
    if (displayValue) { 
        operator = op;
        if (!firstNumber) {
            firstNumber = displayValue;
        } 
        // if (firstNumber && operator) {
        //     secondNumber = displayValue;
        //     equals();
        // }
    } 
}

function equals() {
    if (displayValue && !secondNumber) {
        secondNumber = displayValue;
    }
    result = displayValue = operate(operator, firstNumber, secondNumber);
    operator = firstNumber = secondNumber = undefined;
    updateDisplay();
}

function clear() {
    operator = firstNumber = secondNumber = undefined;
    displayValue = '0';
    updateDisplay();
}
