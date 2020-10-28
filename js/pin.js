'use strict';

(function () {
  const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`); // нашли шаблон по pin

  const createPin = function (obj) { // по этому макету создается метка
    const pinTemplate = pin.cloneNode(true); // создаем клоны метки
    pinTemplate.querySelector(`img`).src = obj.author.avatar; // вставили ссылку на аватар
    pinTemplate.querySelector(`img`).alt = obj.offer.title; // вставили заголовок
    pinTemplate.style.left = `${obj.location.x}px`; // вставили координаты
    pinTemplate.style.top = `${obj.location.y}px`;
    return pinTemplate; // вернули метку
  };

  // const mapOverlay = document.querySelector(`.map__overlay`); // нашли место куда вставлять метки
  // const onError = function ( errorMessage) { // всплывающее окно с ошибкой
  //   const node = document.createElement(`div`);
  //   node.style = `
  //   z-index: 100;
  //   margin: 0 auto;
  //   text-align: center;
  //   background-color: white;
  //   height: 130px;display: flex;
  //   justify-content: center;
  //   align-items: center`;
  //   node.style.position = `absolute`;
  //   node.style.left = 0;
  //   node.style.right = 0;
  //   node.style.color = `red`;
  //   node.style.fontSize = `50px`;
  //
  //   node.textContent = errorMessage;
  //   mapOverlay.appendChild(node); // вставили окно с ошибкой, ПОКА не знаю в чем разница между appendChild и append
  // };

  const fragment = document.createDocumentFragment(); // создаем фрагмент т.к. без него не вставим
  // функция которая получает объект с данными
  const onLoad = function (arr) {
    for (let i = 0; i < arr.length - 1; i++) { // перебрать все данные кроме последнего
      const fragmentPin = createPin(arr[i]); // создаем метку через функцию выше
      fragmentPin.setAttribute(`data-index`, i); // устанавливаем меткам индекс
      fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
    }
  };

  window.backend.load(onLoad, window.error.onError); // делаем запрос для заполнения данных для метки

  const mapPinsHtml = document.querySelector(`.map__pins`); // место куда будут вставлятся pinы
  const renderPin = function () { // отрисовать метки
    mapPinsHtml.appendChild(fragment); // одним фрагментом Pin вствили в html
  };
  window.pin = {
    fragment,
    pin,
    renderPin,
    // onError,
    onLoad
  };

})();
