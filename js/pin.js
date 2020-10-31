'use strict';

(function () {
  const MAX_PIN = 5;

  const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`); // нашли шаблон по pin

  const createPin = function (obj) { // по этому макету создается метка
    const pinTemplate = pin.cloneNode(true); // создаем клоны метки
    pinTemplate.querySelector(`img`).src = obj.author.avatar; // вставили ссылку на аватар
    pinTemplate.querySelector(`img`).alt = obj.offer.title; // вставили заголовок
    pinTemplate.style.left = `${obj.location.x}px`; // вставили координаты
    pinTemplate.style.top = `${obj.location.y}px`;
    return pinTemplate; // вернули метку
  };

  // const fragment = document.createDocumentFragment(); // создаем фрагмент т.к. без него не вставим
  // let dataFlats = []; // записали массив данных чтобы постоянно не делать запрос
  // // функция которая получает объект с данными
  // const onLoad = function (arr) {
  //   dataFlats = arr;
  //   for (let i = 0; i < MAX_PIN; i++) { // перебрать все данные кроме последнего
  //     const fragmentPin = createPin(arr[i]); // создаем метку через функцию выше
  //     fragmentPin.setAttribute(`data-index`, i); // устанавливаем меткам индекс
  //     fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
  //
  //   }
  // };
  // console.log(dataFlats);
  //
  // window.backend.load(onLoad, window.error.onError); // делаем запрос для заполнения данных для метки









  // const mapPinsHtml = document.querySelector(`.map__pins`); // место куда будут вставлятся pinы
  // const renderPin = function () { // отрисовать метки
  //   mapPinsHtml.appendChild(fragment); // одним фрагментом Pin вствили в html
  // };
  window.pin = {
    // fragment,
    pin,
    // renderPin,
    // mapPinsHtml,
    // dataFlats,
    MAX_PIN,
    createPin
  };

})();
