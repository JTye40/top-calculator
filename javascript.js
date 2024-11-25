function add(a, b) {
  return a + b;
};

function subtract(a, b) {
  return a - b;
};

function multiply(a, b) {
  return a * b;
};

function divide(a, b) {
  return a / b;
};

function operate(a = 0, b = 0, operator = "+") {
  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "*") return multiply(a, b);
  if (operator === "/") return divide(a, b);
};

const numbers = document.querySelectorAll(".numbers");
const screenData = document.querySelector("#data");
const equalButton = document.querySelector("#equal-sign");

let firstNum = '';
let secondNum = '';
let operator = '';
let finalNumber = 0;
let firstNumberLimit = 4;
let secondNumberLimit = 4;
let firstNumberCount = 0; 
let secondNumberCount = 0;
let operatorLimit = 1;
let operatorCount = 0;
let firstDecimalLimit = 1;
let secondDecimalLimit = 1;
let firstNegativeLimit = 1;
let secondNegativeLimit = 1; 

function getNumber() {
  numbers.forEach(number => number.addEventListener('click', () => {
    if (operatorCount === 1) {
      if (secondNumberLimit === 0) alert('No more possible entries. Please select "=" to solve')
      else {
        secondNum += Number(number.innerText);
        screenData.innerText += number.innerText;
        secondNumberLimit -= 1;
        secondNumberCount += 1;
      };
    }
    else if (firstNumberLimit === 0 && secondNumberLimit === 4) alert("Only four numbers are allowed. Please select an operator.");
    else {
      firstNum += Number(number.innerText);
      screenData.innerText += number.innerText;
      firstNumberLimit -= 1;
      firstNumberCount += 1;
    };
  }));
};

const operatorPress = document.querySelectorAll(".operators");

function getOperator() {
  operatorPress.forEach(op => op.addEventListener('click', () => {
    if (op.innerText === "-" && firstNumberCount === 0 && firstNegativeLimit > 0) {
      screenData.innerText += "-";
      firstNum += "-";
      firstNegativeLimit -= 1;
    }
    else if (op.innerText === "-" && operatorLimit === 0 && secondNumberCount === 0 && secondNegativeLimit > 0) {
      screenData.innerText += "-";
      secondNum += "-";
      secondNegativeLimit -= 1;
    }
    else if (operatorLimit === 0) alert("You can only select one operator at a time!");
    else if (firstNumberCount === 0) alert("You must select a number first!");
    else {  
      screenData.innerText += op.innerText;
      operator = op.innerText;
      operatorLimit -= 1;
      operatorCount += 1;
      firstNumberLimit = 0;
    };
  }));
};

const clearButton = document.querySelector("#clear");
clearButton.addEventListener('click', clearScreen);

function clearScreen() {
  screenData.innerText = '';
  firstNum = '';
  secondNum = '';
  finalNumber = 0;
  firstNumberLimit = 4;
  secondNumberLimit = 4;
  operatorLimit = 1;
  firstNumberCount = 0;
  secondNumberCount = 0;
  firstDecimalLimit = 1;
  secondDecimalLimit = 1;
  operatorCount = 0;
};

const decimal = document.querySelector("#decimal");
decimal.addEventListener('click', setDecimal);

function setDecimal() {
  if (operatorCount === 1 && secondNumberCount < 4 && secondDecimalLimit === 1) {
    screenData.innerText += ".";
    secondNum += ".";
    secondDecimalLimit -= 1;
  }
  else if (firstNumberCount < 4 && firstDecimalLimit === 1) {
    screenData.innerText += ".";
    firstNum += ".";
    firstDecimalLimit -= 1;
  }
};

getNumber();
getOperator();

equalButton.addEventListener('click', () => {
  if (secondNumberCount > 0) {
    if (secondNum == 0 && operator === "/") {
      screenData.innerText = "One cannot simply divide by zero!!";
    } else {
      finalNumber = operate(Number(firstNum), Number(secondNum), operator);
      finalNumber = parseFloat(finalNumber.toFixed(4));
      console.log(finalNumber);
      screenData.innerText = finalNumber;
      firstNum = finalNumber;
      secondNum = '';
      firstNumberLimit = 0;
      secondNumberLimit = 4;
      secondNumberCount = 0;
      secondDecimalLimit = 1;
      operatorLimit = 1;
      operatorCount = 0;
    }
  }
});