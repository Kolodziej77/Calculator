const display = document.getElementById('result');
const historyDisplay = document.getElementById('history');

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