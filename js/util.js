"use strict";
(function () {
  function getRandomPartOfArr(arr) {
    const arrCopy = arr.slice();
    const randomNumber = getRandomInt(arrCopy.length);
    for (let i = 0; i < randomNumber; i++) {
      const randomNumberDel = getRandomInt(arrCopy.length);
      arrCopy.splice(randomNumberDel, 1);
    }
    return arrCopy;
  }


  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const getRandomMinMax = function (min, max) {
    const random = Math.floor(min + Math.random() * (max + 1 - min));
    return random;
  };


  const getArrClassNameHtml = function (elementHtml) {
    const classNames = [];
    elementHtml.forEach((item) => {
      classNames.push(item.className);
    });
    return classNames;
  };

  const getArrOfTextBeforeDash = function (arr) {
    const texts = [];
    const allTexts = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = arr[i].length - 1; j >= 0; j--) {
        if (arr[i][j] === `-`) {
          texts.reverse();
          allTexts.push(texts.join(``));
          allTexts.splice(0, texts.length);
          break;
        } else {
          texts.push(arr[i][j]);
        }
      }
    }
    return allTexts;
  };

  const comparisonArrsAndAddClassNameHidden = function (arr1, arr2, htmlElement) {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        htmlElement[j].classList.add(`hidden`);
        if (arr1[i] === arr2[j]) {
          htmlElement[j].textContent = arr1[i];
        }
        if (htmlElement[j].textContent) {
          htmlElement[j].classList.remove(`hidden`);
        }
      }
    }
  };

  const getRandomValueOfObject = function (object) {
    const values = Object.values(object);
    const randomNumber = window.util.getRandomInt(values.length);
    const randomValue = values[randomNumber];
    return randomValue;
  };

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

  const getNumberOfString = function (stringNumber) {
    return parseInt(stringNumber, 10);
  };


  window.util = {
    getArrOfTextBeforeDash,
    getArrClassNameHtml,
    getRandomMinMax,
    getRandomInt,
    getRandomPartOfArr,
    getNumberOfString,
    getLastItemOfString,
    getFirstItemOfString,
    getRandomValueOfObject,
    comparisonArrsAndAddClassNameHidden,
  };
})();
