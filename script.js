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

// Operator function
function addOperator(op) {
    if (displayValue && operator) { // If operator button is clicked again
        equals();
        operator = op;
    }
    if (displayValue) {
        operator = op;
        if (!firstNumber) { // Display value is present but firstNumber hasn't been assigned yet
            firstNumber = displayValue;
        } 
    } 
}

// Equals function
function equals() {
    if (displayValue && !secondNumber) {
        secondNumber = displayValue;
    }
    result = displayValue = operate(operator, firstNumber, secondNumber);
    operator = firstNumber = secondNumber = undefined;
    updateDisplay();
}

// Clear function
const clear = document.querySelector('.clear').addEventListener('click', () => {
    operator = firstNumber = secondNumber = undefined;
    displayValue = '0';
    updateDisplay();
})

// Change sign function
function negative(num) {
    displayValue = (num  * -1).toString();
    updateDisplay();
}

// Convert percentage to number
function percent(num) {
    displayValue = (num/100).toString();
    updateDisplay();
}

// Input decimal
function decimal() {
    if (displayValue === firstNumber || displayValue == secondNumber) {
        displayValue = '0';
        displayValue += '.';
    }
    else if (!displayValue.includes('.')) {
        displayValue += '.';
    } 
    updateDisplay();
}