'use strict';

// получить массив названия классов от html
const getArrClassNameHtml = function (elementHtml) {
  const classNames = [];
  elementHtml.forEach((item) => {
    classNames.push(item.className);
  });
  return classNames;
};

// получить массив слов до тире
const getArrOfTextBeforeDash = function (arr) {
  const texts = [];
  const allTexts = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr[i].length - 1; j > 0; j--) {
      if (arr[i][j] === `-`) {
        texts.reverse();
        allTexts.push(texts.join(``));
        texts.splice(0, texts.length);
        break;
      } else {
        texts.push(arr[i][j]);
      }
    }
  }
  return allTexts;
};

// сравниваем два массива и если есть совпадение то не скрываем, а если совпадение то к html элементу добавляем название плюса
const comparisonArrsAndAddClassNameHidden = function (arrFirst, arrSecond, htmlElement) {
  if (arrFirst.length > 0) {
    for (let i = 0; i < arrFirst.length; i++) { // перебираем все список плюсов полученого из объекта
      for (let j = 0; j < arrSecond.length; j++) { // перебираем общий список плюсов полученный из шаблона
        htmlElement[j].classList.add(`hidden`); // добавили всем скрыться полям сразу
        if (arrFirst[i] === arrSecond[j]) { // если есть вопадение плюсов
          htmlElement[j].textContent = arrFirst[i]; // то пишем textContent
        }
        if (htmlElement[j].textContent) {
          htmlElement[j].classList.remove(`hidden`);
        }
      }
    }
  } else {
    for (let j = 0; j < arrSecond.length; j++) { // перебираем общий список плюсов полученный из шаблона
      htmlElement[j].classList.add(`hidden`); // и добавляем всем скрыться
    }
  }
};

// функция неактивного состояния сайта
const disabledMapFilter = function () {
  window.main.addMapFaded(window.card.map); // сделать карту неактивной
  window.main.addAdFormDisabled(window.filter.mapFilters);
  window.main.addDisabled(window.main.formFieldsets);
};

// удаляем атрибут disabled в полученом массиве option
const removeToArrDisabled = function (arr) {
  arr.forEach((item) => {
    item.removeAttribute(`disabled`);
  });
};


const getArrValueFromHtml = function (arrHtml) {
  const itemValues = [];
  arrHtml.forEach((item) => {
    itemValues.push(item.value);
  });
  return itemValues;
};

window.util = {
  getArrOfTextBeforeDash,
  getArrClassNameHtml,
  comparisonArrsAndAddClassNameHidden,
  disabledMapFilter,
  removeToArrDisabled,
  getArrValueFromHtml
};

