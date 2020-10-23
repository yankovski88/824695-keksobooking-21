'use strict';

(function () {
  const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const createPin = function (obj) {
    const pinTemplate = pin.cloneNode(true);
    pinTemplate.querySelector(`img`).src = obj.author.avatar;
    pinTemplate.querySelector(`img`).alt = obj.offer.title;
    pinTemplate.style.left = `${obj.location.x}px`;
    pinTemplate.style.top = `${obj.location.y}px`;
    return pinTemplate;
  };

  const mapOverlay = document.querySelector(`.map__overlay`);
  const onError = function (errorMessage) {
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
    mapOverlay.appendChild(node);
  };

  const fragment = document.createDocumentFragment();
  const onLoad = function (arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      const fragmentPin = createPin(arr[i]);
      fragmentPin.setAttribute(`data-index`, i);
      fragment.appendChild(fragmentPin);
    }
  };
  window.backend.load(onLoad, onError);

  const mapPinsHtml = document.querySelector(`.map__pins`);

  const renderPin = function (fragmentItem) {
    mapPinsHtml.appendChild(fragmentItem);
  };
  window.pin = {
    fragment,
    mapPinsHtml,
    pin,
    renderPin,
    onError,
  };

})();
