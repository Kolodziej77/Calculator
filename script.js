const display = document.getElementById('result');
const historyDisplay = document.getElementById('history');

let current = '';
let previous = '';
let operator = null;
let resetNext = false;

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
    if(current.startsWith('Error') || resetNext){
        current = '';
        previous = '';
        operator = null;
        resetNext = false;
        updateHistory();
    }

    if(num === '.' && current.includes('.')){
        return;
    }
    
    if(current.length >= 22){
        return;
    }

    current += num;
    updateDisplay();
}

function chooseOperator(op){
    if(resetNext){
        resetNext = false;
    }

    if(current.startsWith('Error')){
        clearAll();
        return;
    }

    if(op === 'x'){
        op = '*';
    }

    if(previous !== '' && current !== '' && operator !== null){
        const result = operate(operator, previous, current);    
        if(typeof result === 'string'){
            current = result;
            updateDisplay();
            previous = '';
            operator = null;
            updateHistory();
            return;
        }
        previous = String(roundResult(result));
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
    current = String(roundResult(result));
    previous = '';
    operator = null;
    resetNext = true;
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

function roundResult(result){
    if(typeof result === 'string'){
        return result;
    }

    return Math.round(result * 100000) / 100000;
}

window.addEventListener('keydown', (e) => {
    const key = e.key;

    if(!isNaN(key)){
        appendNumber(key);
    }
    if(key === '.' || key === ','){
        appendNumber('.');
    }
    if(key === '+' ||
        key === '-' ||
        key === '*' ||
        key === '/' ||
        key === 'x' ||
        key === 'X'){
            chooseOperator(key === 'x' || key === 'X' ? '*' : key);
    }
    if(key === 'Enter'){
        compute();
    }
    if(key === 'Backspace'){
        backspace();
    }
    if(key === 'c' || key === 'C'){
        clearAll();
    }
})