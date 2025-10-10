const display = document.getElementById('result');
const historyDisplay = document.getElementById('history');

let current = '';
let previous = '';
let operator = null;

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b === 0){
        return 'Error! Do not divide by 0!';
    }
    return a / b;
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.textContent);
        if(button.classList.contains('number')){
            appendNumber(button.textContent);
        } else if(button.classList.contains('operator')){
            chooseOperator(button.textContent);
        } else if(button.classList.contains('equals')){
            compute();
        } else if(button.classList.contains('clear')){
            clearAll();
        } else if(button.classList.contains('backspace')){
            backspace();
        }
    })
})

function updateDisplay(){
    display.textContent = current;
}

function appendNumber(num){
    if(num === '.' && current.includes('.')){
        return;
    }
    current += num;
    updateDisplay();
}

function chooseOperator(op){
    operator = op;
    previous = current;
    current = '';
}

function operate(op, a, b){
    a = parseFloat(a);
    b = parseFloat(b);
    switch(op){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);

    }
}

function compute(){
    if(operator === null || current === '' || previous === ''){
        return;
    }
    const result = operate(operator, previous, current);
    current = String(result);
    operator = null;
    previous = '';
    updateDisplay();
}

function clearAll(){
    current = '';
    previous = '';
    operator = null;
    updateDisplay();
}

function backspace(){
    current = current.slice(0, -1);
    updateDisplay();
}