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

  const mapPinsHtml = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();
  const addCreatePinToFragment = function (fragmentItem, offersarr) {
    for (let i = 0; i < offersarr.length; i++) {
      const fragmentPin = createPin(offersarr[i]);
      fragmentPin.setAttribute(`data-index`, i);
      fragmentItem.appendChild(fragmentPin);
    }
  };
  addCreatePinToFragment(fragment, window.data.offers);

  const renderPin = function (fragmentItem) {
    mapPinsHtml.appendChild(fragmentItem);
  };
  window.pin = {
    fragment,
    mapPinsHtml,
    pin,
    renderPin,
  };
})();
