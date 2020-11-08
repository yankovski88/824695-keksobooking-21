'use strict';
(function () {


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
          htmlElement[j].classList.add(`hidden`);
          if (arrFirst[i] === arrSecond[j]) {
            htmlElement[j].textContent = arrFirst[i];
          }
          if (htmlElement[j].textContent) {
            htmlElement[j].classList.remove(`hidden`);
          }
        }
      }
    } else {
      for (let j = 0; j < arrSecond.length; j++) { // перебираем общий список плюсов полученный из шаблона
        htmlElement[j].classList.add(`hidden`);
      }
    }
  };

  // получить первый итем строки до запятой
  const getFirstItemOfString = function (string) {
    const arr = [];
    for (let i = 0; i < string.length; i++) {
      if (string[i] !== `,`) {
        arr.push(string[i]);
      } else {
        break;
      }
    }
    return arr.join(``);
  };

  // получить последний итем до пробела от строки
  const getLastItemOfString = function (string) {
    const arr = [];
    for (let i = string.length - 1; i > 0; i--) {
      if (string[i] !== ` `) {
        arr.push(string[i]);
      } else {
        break;
      }
    }
    return arr.join(``);
  };

  // функция неактивного состояния сайта
  const disabledMapFilter = function () {
    window.main.addMapFaded(window.card.map); // сделать карту неактивной
    window.main.addAdFormDisabled(window.filter.mapFilters);
    window.main.addDisabled(window.main.formFieldsets);
  };

  window.util = {
    getArrOfTextBeforeDash,
    getArrClassNameHtml,
    getLastItemOfString,
    getFirstItemOfString,
    comparisonArrsAndAddClassNameHidden,
    disabledMapFilter,
  };


})();
