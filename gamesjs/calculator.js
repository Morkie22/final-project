// Enhancements to calculator.js
function pressNum(num) {
    if (num === '.' && displayValue.includes('.')) return; // Prevent multiple decimals
    if (num === '-' && displayValue === '0') {
        displayValue = '-';
    } else {
        displayValue = displayValue === '0' || displayValue === '-' ? num : displayValue + num;
    }
    document.querySelector('#display').textContent = displayValue; // Changed to querySelector for better practice
}

function setOperation(operator) {
    if (currentOperation !== null && displayValue !== '-') operate();
    if (displayValue === '-') return; // Do nothing if only '-' is entered
    firstOperand = parseFloat(displayValue);
    currentOperation = operator;
    displayValue = '';
}

function operate() {
    if (currentOperation === null || displayValue === '' || displayValue === '-') return;
    secondOperand = parseFloat(displayValue);
    if (currentOperation === '/' && secondOperand === 0) {
        document.querySelector('#display').textContent = "Error: Divide by zero";
        return;
    }
    displayValue = String(performCalculation(firstOperand, secondOperand, currentOperation));
    document.querySelector('#display').textContent = displayValue;
    firstOperand = parseFloat(displayValue); // Ready for next operation
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
    document.querySelector('#display').textContent = displayValue;
}

// Adding keyboard support
document.addEventListener('keydown', function(e) {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') pressNum(e.key); // Corrected key checks for string comparison
    if (e.key === 'Enter' || e.key === '=') operate(); // Added '=' as a trigger for operation
    if (e.key === 'Escape' || e.key === 'Delete') clearDisplay(); // Added 'Delete' as an additional clear key
    if (['+', '-', '*', '/'].includes(e.key)) setOperation(e.key);
});


