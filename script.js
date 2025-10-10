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
    display.textContent = current || '0';
}

function appendNumber(num){
    if(current.startsWith('Error')){
        current = '';
        previous = '';
        operator = null;
    }

    if(num === '.' && current.includes('.')){
        return;
    }
    current += num;
    updateDisplay();
}

function chooseOperator(op){
    if(current.startsWith('Error')){
        clearAll;
        return;
    }

    if(op === 'x'){
        op = '*';
    }

    if(previous !== '' && current !== ''){
        const result = operate(operator, previous, current);
        if(typeof result === 'string'){
            current = result;
            updateDisplay();
            previous = '';
            operator = null;
            updateHistory();
            return;
        }
        previous = String(result);
        current = '';
    } else if(current !== ''){
        previous = current;
        current = '';
    }

    operator = op;
    updateHistory(previous, operator === '*' ? 'x' : operator);
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

    if(typeof result === 'string'){
        current = result;
        updateDisplay();
        previous = '';
        operator = null;
        updateHistory();
        return;
    }

    updateHistory(previous, operator === '*' ? 'x' : operator, current);
    current = String(result);
    previous = '';
    operator = null;
    updateDisplay();
}

function clearAll(){
    current = '';
    previous = '';
    operator = null;
    updateDisplay();
    updateHistory();
}

function backspace(){
    if(current.startsWith('Error')){
        clearAll();
        return;
    }
    current = current.slice(0, -1);
    updateDisplay();
}

function updateHistory(op1, opSign, op2){
    if(op1 && opSign && op2 !== undefined){
        historyDisplay.textContent = `${op1} ${opSign} ${op2} =`;
    } else if(op1 && opSign){
        historyDisplay.textContent = `${op1} ${opSign}`;
    } else{
        historyDisplay.textContent = '';
    }
}