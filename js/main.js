"use strict";
(function () {
  window.card.map.addEventListener(`click`, function (evt) {
    let target = evt.target;
    if (target.tagName === `IMG`) {
      target = target.parentNode;
    }


    if ((target.classList.contains(`map__pin`)) && (!target.classList.contains(`map__pin--main`))) {
      if (window.card.map.querySelector(`.map__card`)) {
        window.card.map.removeChild(window.card.map.querySelector(`.map__card`));
      } else {
        window.card.renderCard(window.card.createCard(window.data.offers[target.dataset.index]), window.card.mapFiltersContainer);

        const popupClose = document.querySelector(`.popup__close`);
        const mapCard = window.card.map.querySelector(`.map__card`);
        const removeChildMapCard = function () {
          window.card.map.removeChild(mapCard);
        };
        const onPopupCloseClick = function () {
          removeChildMapCard();
        };
        popupClose.addEventListener(`click`, onPopupCloseClick);

        const onpPopupCloseEnterPress = function () {
          if (evt.target.code === 13) {
            removeChildMapCard();
          }
        };
        popupClose.addEventListener(`keydown`, onpPopupCloseEnterPress);
      }
    }
  });


  const onMapEscapePress = function (evt) {
    if ((evt.key === `Escape`) && (window.card.map.querySelector(`.map__card`))) {
      window.card.map.removeChild(window.card.map.querySelector(`.map__card`));
    }
  };
  window.card.map.addEventListener(`keydown`, onMapEscapePress);


  const mapPinMain = document.querySelector(`.map__pin--main`);
  const adFormFieldsets = document.querySelectorAll(`fieldset`);
  const mapFilter = document.querySelector(`.map__filters`);

  const addMapFaded = function (item) {
    item.classList.add(`map--faded`);
  };
  addMapFaded(window.card.map);

  const addDisabled = function (arrItems) {
    arrItems.forEach((item) => {
      item.setAttribute(`disabled`, `true`);
    });
  };
  addDisabled(adFormFieldsets);

  const addAdFormDisabled = function (item) {
    item.classList.add(`ad-form--disabled`);
  };
  addAdFormDisabled(mapFilter);


  const removeAdFormDisabled = function () {
    mapFilter.classList.remove(`ad-form--disabled`);
  };

  const removeAdFormFieldsetsDisabled = function () {
    adFormFieldsets.forEach((item) => {
      item.removeAttribute(`disabled`);
    });
  };

  const mapPin = document.querySelector(`.map__pin`);
  const mapPinImg = mapPin.querySelector(`img`);
  const mapPinImgWidth = mapPinImg.width;
  const mapPinImgHeight = mapPinImg.height;
  const address = document.querySelector(`#address`);
  const mapPinMainLeft = mapPinMain.style.left;
  const mapPinMainTop = mapPinMain.style.top;
  const widthMapPin = 10;
  const heightMapPin = 22;

  const getPosition = function (distance, widthItem, widthItemLow) {
    const position = window.util.getNumberOfString(distance) + widthItem + widthItemLow / 2;
    return position;
  };

  const leftMapPin = getPosition(mapPinMainLeft, mapPinImgWidth, widthMapPin);
  const topMapPin = getPosition(mapPinMainTop, mapPinImgHeight, heightMapPin);

  const mousedownMapPinMain = function () {
    mapPinMain.addEventListener(`mousedown`, function (evt) {
      if (evt.which === 1) {
        window.card.map.classList.remove(`map--faded`);
      }
      removeAdFormDisabled();
      removeAdFormFieldsetsDisabled();
      window.pin.renderPin(window.pin.fragment);
      window.util.fillAddress(address, leftMapPin, topMapPin);
      window.form.checkRoomAndGuest();
      window.form.setMinPrice();
      window.form.setTimeinAndTimeout();
    });
  };
  mousedownMapPinMain();

  const keydownmapPinMain = function () {
    mapPinMain.addEventListener(`keydown`, function (evt) {
      if (evt.code === `Enter`) {
        window.card.map.classList.remove(`map--faded`);
      }
      removeAdFormDisabled();
      removeAdFormFieldsetsDisabled();
      window.pin.renderPin(window.pin.fragment);
      window.util.fillAddress(address, leftMapPin, topMapPin);
      window.form.checkRoomAndGuest();
      window.form.setMinPrice();
      window.form.setTimeinAndTimeout();
    });
  };
  keydownmapPinMain();
})();
