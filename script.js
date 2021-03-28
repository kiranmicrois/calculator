'use strict';

const btnNum = document.querySelectorAll('.btn_num');
const btnCalc = document.querySelectorAll('.btn_calc');
const curValue = document.querySelector('.current_value');
const history = document.querySelector('.history_value');
const btnClearAll = document.querySelector('.btn_clear');
const btnClear = document.querySelector('.btn_del');
const btnEvaluate = document.querySelector('.btn_evaluate');

let resultDisplayed = false;
let lastValue = function () {
  return history.innerHTML.slice(-1);
};

//numbers
btnNum.forEach(num => {
  num.addEventListener('click', e => {
    //default
    if (resultDisplayed == false) {
      curValue.textContent =
        curValue.textContent == 0 ? ' ' : curValue.textContent;

      curValue.textContent += num.textContent;
      new Intl.NumberFormat('en-IN').format(curValue.textContent);
      lastValue();
    }
    //prssing operator will continue with current calculation
    else if (
      (resultDisplayed == true && lastValue() === '*') ||
      lastValue() === '+' ||
      lastValue() === '-' ||
      lastValue() === '/'
    ) {
      curValue.textContent = '';

      curValue.textContent += num.textContent;
      resultDisplayed = false;
    }
    //pressing number star a new calculation
    else {
      resultDisplayed = false;
      history.textContent = ' ';
      curValue.textContent = 0;
      curValue.textContent =
        curValue.textContent == 0 ? ' ' : curValue.textContent;

      curValue.textContent += num.textContent;
    }
  });
});
//operators
btnCalc.forEach(operators => {
  operators.addEventListener('click', e => {
    let test = history.textContent.slice(0, history.textContent.length - 1);
    //it avoid adding multiple operator contineously
    if (history.textContent.includes(operators.textContent)) {
      history.textContent = !isNaN(lastValue())
        ? curValue.textContent + operators.textContent
        : history.textContent;
      console.log(lastValue(), resultDisplayed, test);
    }
    //replace the operator
    else if (
      lastValue() === '*' ||
      lastValue() === '+' ||
      lastValue() === '-' ||
      lastValue() === '/'
    ) {
      history.textContent = test + operators.textContent;
    } else {
      history.textContent = ' ';
      history.textContent += curValue.textContent + ' ' + operators.textContent;
      curValue.textContent = ' ';
    }
  });
});

//clears everything
btnClearAll.addEventListener('click', () => {
  history.textContent = ' ';
  curValue.textContent = 0;
  resultDisplayed = resultDisplayed == false ? true : false;
});

//clear last value per click in result area
btnClear.addEventListener('click', () => {
  let curLength = curValue.textContent.length;
  console.log(curLength);
  curValue.textContent = curValue.textContent.slice(0, curLength - 1);
});

// evaluate

btnEvaluate.addEventListener('click', () => {
  history.textContent += ' ' + curValue.textContent;
  curValue.textContent = eval(history.textContent);

  //for decimal point shows max upto 4 decimal points if decimal result occurs
  curValue.textContent = curValue.textContent.includes('.')
    ? eval(curValue.textContent).toFixed(4)
    : eval(curValue.textContent);

  resultDisplayed = true;
  console.log(lastValue(), resultDisplayed);
});
