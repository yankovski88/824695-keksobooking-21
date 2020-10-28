'use strict';

(function () {
  const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const createPin = function (obj) { // по этому макету создается метка
    const pinTemplate = pin.cloneNode(true);
    pinTemplate.querySelector(`img`).src = obj.author.avatar;
    pinTemplate.querySelector(`img`).alt = obj.offer.title;
    pinTemplate.style.left = `${obj.location.x}px`;
    pinTemplate.style.top = `${obj.location.y}px`;
    return pinTemplate;
  };

  const mapOverlay = document.querySelector(`.map__overlay`);
  const onError = function (errorMessage) { // всплывающее окно с ошибкой
    const node = document.createElement(`div`);
    node.style = `
    z-index: 100; 
    margin: 0 auto; 
    text-align: center; 
    background-color: white; 
    height: 130px;display: flex; 
    justify-content: center; 
    align-items: center`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.color = `red`;
    node.style.fontSize = `50px`;

    node.textContent = errorMessage;
    mapOverlay.appendChild(node); // вставили окно с ошибкой, ПОКА не знаю в чем разница между appendChild и append
  };

  const fragment = document.createDocumentFragment();
  const onLoadPin = function (arr) {
    console.log(`запустил функцию onLoad2`, arr);
    for (let i = 0; i < arr.length - 1; i++) {
      const fragmentPin = createPin(arr[i]);
      fragmentPin.setAttribute(`data-index`, i);
      fragment.appendChild(fragmentPin);
    }
    // console.log(fragment);
  };
window.backend.load(window.pin.onLoadPin, onError);


  const mapPinsHtml = document.querySelector(`.map__pins`); // место куда будут вставлятся pinы
  const renderPin = function () { // отрисовать метки
    // window.backend.load(onLoad, onError);
    console.log(`запуск renderPin`);
    mapPinsHtml.appendChild(fragment); // одним фрагментом Pin вствили в html
  };
  window.pin = {
    fragment,
    pin,
    renderPin,
    onError,
    onLoadPin,
  };

})();
