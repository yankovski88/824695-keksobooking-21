"use strict";

window.card.map.addEventListener(`click`, function (evt) {
  let target = evt.target;
  if (target.tagName === `IMG`) {
    target = target.parentNode;
  }


  if ((target.classList.contains(`map__pin`)) && (!target.classList.contains(`map__pin--main`))) {
    if (window.card.map.querySelector(`.map__card`)) {
      window.card.map.removeChild(map.querySelector(`.map__card`));
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

//активация сайта
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
    checkRoomAndGuest();
    setMinPrice();
    setTimeinAndTimeout();
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
    checkRoomAndGuest();
    setMinPrice();
    setTimeinAndTimeout();
  });
};
keydownmapPinMain();

//valid form
const capacity = document.querySelector(`#capacity`);
const capacityOptions = capacity.querySelectorAll(`option`);

const removeToArrDisabled = function (arr) {
  arr.forEach((item) => {
    item.removeAttribute(`disabled`);
  });
};

removeToArrDisabled(capacityOptions);


const checkRoomAndGuest = function () {
  const roomNumber = document.querySelector(`#room_number`);


  const MESSAGE_ROOMS_ERROR = `
1 комната — «для 1 гостя»;
2 комнаты — «для 2 гостей» или «для 1 гостя»;
3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
100 комнат — «не для гостей».`;

  let room = roomNumber.value;
  let guest = capacity.value;
  let romIndex = room - 1;
  const MAX_ROOM = 3;
  const NO_FOR_GUEST = `0`;
  const capacitys = [[`1`], [`1`, `2`], [`1`, `2`, `3`], [`0`]];

  const checkRoomDefault = function () {
    if ((capacitys[romIndex].includes(room) && capacitys[romIndex].includes(guest)) === false) {
      roomNumber.setCustomValidity(MESSAGE_ROOMS_ERROR);
    } else {
      roomNumber.setCustomValidity(``);
    }
  };
  checkRoomDefault();

  const checkRoom = function () {
    roomNumber.addEventListener(`change`, function () {
      const roomValue = roomNumber.value;
      room = roomValue;
      if (room > MAX_ROOM) {
        room = NO_FOR_GUEST;
        romIndex = capacitys.length - 1;
      } else {
        romIndex = room - 1;
      }
      if ((capacitys[romIndex].includes(room) && capacitys[romIndex].includes(guest)) === false) {
        roomNumber.setCustomValidity(MESSAGE_ROOMS_ERROR);
      } else {
        roomNumber.setCustomValidity(``);
      }
    });
  };
  checkRoom();

  const checkCapacity = function () {
    capacity.addEventListener(`change`, function () {
      const guestValue = capacity.value;
      guest = guestValue;
      if ((capacitys[romIndex].includes(room) && capacitys[romIndex].includes(guest)) === false) {
        roomNumber.setCustomValidity(MESSAGE_ROOMS_ERROR);
      } else {
        roomNumber.setCustomValidity(``);
      }
    });
  };
  checkCapacity();
};

const title = document.querySelector(`#title`);
title.setAttribute(`minlength`, `30`);
const price = document.querySelector(`#price`);
price.setAttribute(`max`, `1000000`);

const getArrValueFromHtml = function (arrHtml) {
  const itemValue = [];
  arrHtml.forEach((item) => {
    itemValue.push(item.value);
  });
  return itemValue;
};

const setMinPrice = function () {
  const type = document.querySelector(`#type`);
  const types = type.querySelectorAll(`option`);
  const titles = getArrValueFromHtml(types);
  const prices = [0, 1000, 5000, 10000];
  type.addEventListener(`change`, function () {
    const titleValue = type.value;
    for (let i = 0; i < titles.length; i++) {
      if (titleValue === titles[i]) {
        price.setAttribute(`placeholder`, `от ${prices[i]}`);
        price.setAttribute(`min`, `${prices[i]}`);
      }
    }
  });
};


const MAX_PRICE = 1000000;
price.setAttribute(`required`, `required`);
price.setAttribute(`type`, `number`);
price.setAttribute(`max`, `${MAX_PRICE}`);

const avatar = document.querySelector(`#avatar`);
avatar.setAttribute(`accept`, `image/*`);

const images = document.querySelector(`#images`);
images.setAttribute(`accept`, `image/*`);

const timein = document.querySelector(`#timein`);
const timeinOptions = timein.querySelectorAll(`option`);
const timeout = document.querySelector(`#timeout`);
const timeoutOptions = timeout.querySelectorAll(`option`);

const setTimeinAndTimeout = function () {
  const setTimein = function () {
    for (let i = 0; i < timeinOptions.length; i++) {
      if (timeinOptions[i].value === timein.value) {
        timeout.value = timein[i].value;
      }
    }
  };

  timein.addEventListener(`change`, function () {
    setTimein();
  });

  const setTimeout = function () {
    for (let i = 0; i < timeoutOptions.length; i++) {
      if (timeoutOptions[i].value === timeout.value) {
        timein.value = timeout[i].value;
      }
    }
  };
  timeout.addEventListener(`change`, function () {
    setTimeout();
  });
};


