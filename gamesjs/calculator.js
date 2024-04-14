let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperation = null;

function pressNum(num) {
    displayValue = displayValue === '0' ? num : displayValue + num;
    document.getElementById('display').textContent = displayValue;
}

function setOperation(operator) {
    if (currentOperation !== null) operate();
    firstOperand = parseFloat(displayValue);
    currentOperation = operator;
    displayValue = '';
}

function operate() {
    if (currentOperation === null || displayValue === '') return;
    secondOperand = parseFloat(displayValue);
    if (currentOperation === '/' && secondOperand === 0) {
        document.getElementById('display').textContent = "Error: Divide by zero";
        return;
    }
    displayValue = String(performCalculation(firstOperand, secondOperand, currentOperation));
    document.getElementById('display').textContent = displayValue;
    currentOperation = null;
}

function performCalculation(a, b, operation) {
    switch (operation) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
    }
}

function clearDisplay() {
    displayValue = '0';
    document.getElementById('display').textContent = displayValue;
}

