// Variables to store calculator state
let displayValue = '0'; // Current display value
let firstOperand = null; // First operand for any expression
let secondOperand = null; // Second operand for any expression
let currentOperation = null; // Current operation in use

// Updates the display with the current display value
function updateDisplay() {
    document.querySelector('#display').textContent = displayValue;
}

// Handles number and decimal input
function pressNum(num) {
    if (num === '.' && displayValue.includes('.')) return; // Prevent multiple decimals
    if (num === '-' && displayValue === '0') {
        displayValue = '-'; // Allows for negative number input
    } else {
        displayValue = (displayValue === '0' || displayValue === '-') ? num : displayValue + num;
    }
    updateDisplay(); // Update display after pressing a number
}

// Sets the current operation and first operand
function setOperation(operator) {
    if (currentOperation !== null && displayValue !== '-') operate();
    if (displayValue === '-') return; // Do nothing if only '-' is entered
    firstOperand = parseFloat(displayValue);
    currentOperation = operator;
    displayValue = '';
}

// Performs the calculation based on the current operation
function operate() {
    if (currentOperation === null || displayValue === '' || displayValue === '-') return;
    secondOperand = parseFloat(displayValue);
    if (currentOperation === '/' && secondOperand === 0) {
        displayValue = "Error: Divide by zero";
    } else {
        displayValue = String(performCalculation(firstOperand, secondOperand, currentOperation));
    }
    updateDisplay(); // Update display after calculation
    firstOperand = parseFloat(displayValue); // Ready for next operation
    currentOperation = null;
}

// Calculates the result based on operation
function performCalculation(a, b, operation) {
    switch (operation) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return b; // Return second operand if no operation is set
    }
}

// Resets the calculator display and state
function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    currentOperation = null;
    updateDisplay(); // Clear and update the display
}

// Adding keyboard support
document.addEventListener('keydown', function(e) {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') pressNum(e.key); // Handle number keys and decimal
    if (e.key === 'Enter' || e.key === '=') operate(); // Execute calculation on 'Enter' or '='
    if (e.key === 'Escape' || e.key === 'Delete') clearDisplay(); // Clear display on 'Escape' or 'Delete'
    if (['+', '-', '*', '/'].includes(e.key)) setOperation(e.key); // Handle operation keys
});
