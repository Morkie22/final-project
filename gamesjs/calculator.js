// Initialization of variables
let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperation = null;

// Function to update the calculator display
function updateDisplay() {
    document.querySelector('#display').textContent = displayValue;
}

// Function to handle number and decimal inputs
function pressNum(num) {
    if (num === '.' && displayValue.includes('.')) return;  // Prevent multiple decimals
    if (displayValue === '0' || currentOperation && secondOperand === null) {
        displayValue = num;
    } else {
        displayValue += num;
    }
    updateDisplay();
}

// Function to set the current operation and handle chaining of operations
function setOperation(operator) {
    if (currentOperation && secondOperand === null) {
        displayValue = '0';  // Prepare to receive the second operand
    } else if (currentOperation) {
        operate();  // Calculate result with the previous operation before setting the new operation
    }
    firstOperand = parseFloat(displayValue);  // Set the first operand
    currentOperation = operator;
    secondOperand = null;  // Reset second operand
    displayValue = '0';  // Clear display for new number input
}

// Function to perform calculation and update the display
function operate() {
    if (!currentOperation || displayValue === '-') return;  // Do nothing if operation is incomplete or only '-' is entered
    secondOperand = parseFloat(displayValue);
    if (currentOperation === '/' && secondOperand === 0) {
        displayValue = "Error: Divide by zero";
    } else {
        displayValue = performCalculation(firstOperand, secondOperand, currentOperation).toString();
    }
    updateDisplay();
    firstOperand = parseFloat(displayValue);  // Prepare for next operation
    currentOperation = null;
    secondOperand = null;
}

// Function to calculate result based on operation type
function performCalculation(a, b, operation) {
    switch (operation) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
    }
}

// Function to clear calculator display and reset all states
function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    currentOperation = null;
    secondOperand = null;
    updateDisplay();
}

// Adding keyboard support
document.addEventListener('keydown', function(e) {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') pressNum(e.key);
    if (e.key === 'Enter' || e.key === '=') operate();
    if (e.key === 'Escape' || e.key === 'Delete') clearDisplay();
    if (['+', '-', '*', '/'].includes(e.key)) setOperation(e.key);
});
