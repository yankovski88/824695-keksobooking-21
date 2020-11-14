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
const comparisonArrsAndAddClassNameHidden = function (firstItems, secondItems, elements) {
  if (firstItems.length > 0) {
    for (let i = 0; i < firstItems.length; i++) { // перебираем все список плюсов полученого из объекта
      for (let j = 0; j < secondItems.length; j++) { // перебираем общий список плюсов полученный из шаблона
        if (firstItems[i] === secondItems[j]) { // если есть вопадение плюсов
          elements[j].textContent = firstItems[i]; // то пишем textContent
        }
        if (elements[j].textContent) {
          elements[j].classList.remove(`hidden`);
        } else {
          elements[j].classList.add(`hidden`); // добавили всем скрыться полям сразу
        }
      }
    }
  } else {
    for (let j = 0; j < secondItems.length; j++) { // перебираем общий список плюсов полученный из шаблона
      elements[j].classList.add(`hidden`); // и добавляем всем скрыться
    }
  }
};

// функция неактивного состояния сайта
const disabledMapFilter = function () {
  window.util.hideMap(window.card.map); // сделать карту неактивной
  window.main.addAdFormDisabled(window.filter.mapFilters);
  window.main.disableNodeElement(window.main.formFieldsets);
};

// удаляем атрибут disabled в полученом массиве option
const removeToArrDisabled = function (items) {
  items.forEach((item) => {
    item.removeAttribute(`disabled`);
  });
};

const getArrValueFromHtml = function (items) {
  const itemValues = [];
  items.forEach((item) => {
    itemValues.push(item.value);
  });
  return itemValues;
};

// добавить к классу map--faded
const hideMap = function (item) {
  item.classList.add(`map--faded`);
};

// добавить disabled disableNodeElement
const disableNodeElement = function (arrItems) {
  arrItems.forEach((item) => {
    item.setAttribute(`disabled`, `true`);
  });
};

window.util = {
  getArrOfTextBeforeDash,
  getArrClassNameHtml,
  comparisonArrsAndAddClassNameHidden,
  disabledMapFilter,
  removeToArrDisabled,
  getArrValueFromHtml,
  hideMap,
  disableNodeElement
};

