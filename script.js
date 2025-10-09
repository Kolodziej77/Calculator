const display = document.getElementById('result');
const historyDisplay = document.getElementById('history');

let current = '';
let previous = '';
let operator = null;

function add(a, b){
    return a + b;
}

function substract(a, b){
    return a - b;
}

function multuply(a, b){
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