"use strict";

const OBJECT_TOTAL = 8;
const OFFER_TYPES = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`,
};
const OFFER_TIMES = [`12:00`, `13:00`, `14:00`];
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const ROOMS_MAX = 4;
const GUESTS_MAX = 4;
const OFFER_PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;
const mapBlock = document.querySelector(`.map`);
const offers = [];

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
  const randomNumber = getRandomInt(values.length);
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
  const numberItem = parseInt(stringNumber, 10);
  return numberItem;
};

const fillAddress = function (address, left, top) {
  address.value = `${left}, ${top}`;
};

for (let i = 0; i < OBJECT_TOTAL; i++) {
  const locationX = getRandomMinMax(1, mapBlock.clientHeight);
  const locationY = getRandomMinMax(LOCATION_Y_MIN, LOCATION_Y_MAX);
  offers.push({
    "author": {
      "avatar": `img/avatars/user0${i + 1}.png`,
    },
    "offer": {
      "title": `Предложение ${i + 1}`,
      "address": `${locationX}, ${locationY}`,
      "price": `${getRandomMinMax(1000, 10000)} ₽/ночь`,
      "type": `${getRandomValueOfObject(OFFER_TYPES)}`,
      "rooms": getRandomMinMax(1, ROOMS_MAX),
      "guests": getRandomMinMax(1, GUESTS_MAX),
      "checkin": OFFER_TIMES[getRandomInt(OFFER_TIMES.length)],
      "checkout": OFFER_TIMES[getRandomInt(OFFER_TIMES.length)],
      "features": getRandomPartOfArr(OFFER_FEATURES),
      "description": `Описание ${i + 1}`,
      "photos": getRandomPartOfArr(OFFER_PHOTOS),
    },
    "location": {
      "x": `${locationX}`,
      "y": `${locationY}`,
    },
  });
}


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
addCreatePinToFragment(fragment, offers);

const renderPin = function (fragmentItem) {
  mapPinsHtml.appendChild(fragmentItem);
};


const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);

const createCard = function (obj) {
  const cardTemplate = card.cloneNode(true);
  if (obj.offer.title) {
    cardTemplate.querySelector(`.popup__title`).textContent = obj.offer.title;
  } else {
    cardTemplate.querySelector(`.popup__title`).classList.add(`hidden`);
  }
  if (obj.offer.address[0] && obj.offer.address[1]) {
    cardTemplate.querySelector(`.popup__text--address`).textContent = `${getFirstItemOfString(obj.offer.address)} Tōkyō-to, Chiyoda-ku, Ichibanchō, ${getLastItemOfString(obj.offer.address)}`;
  } else {
    cardTemplate.querySelector(`.popup__text--address`).classList.add(`hidden`);
  }
  if (obj.offer.price) {
    cardTemplate.querySelector(`.popup__text--price`).textContent = obj.offer.price;
  } else {
    cardTemplate.querySelector(`.popup__text--price`).classList.add(`hidden`);
  }
  if (obj.offer.type) {
    cardTemplate.querySelector(`.popup__type`).textContent = obj.offer.type;
  } else {
    cardTemplate.querySelector(`.popup__type`).classList.add(`hidden`);
  }
  if (obj.offer.rooms && obj.offer.guests) {
    cardTemplate.querySelector(`.popup__text--capacity`).textContent = `${obj.offer.rooms} комнатa(ы) для ${obj.offer.guests} гостя(ей)`;
  } else {
    cardTemplate.querySelector(`.popup__text--capacity`).classList.add(`hidden`);
  }
  if (obj.offer.checkin && obj.offer.checkout) {
    cardTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
  } else {
    cardTemplate.querySelector(`.popup__text--time`).classList.add(`hidden`);
  }


  const cardTemplateLis = cardTemplate.querySelector(`.popup__features`).querySelectorAll(`li`);
  const ClassNames = getArrClassNameHtml(cardTemplateLis);
  const CopyClassNames = ClassNames.slice();
  const htmlOfferFeatures = getArrOfTextBeforeDash(CopyClassNames);
  comparisonArrsAndAddClassNameHidden(obj.offer.features, htmlOfferFeatures, cardTemplateLis);

  if (obj.offer.description) {
    cardTemplate.querySelector(`.popup__description`).textContent = `${obj.offer.description}`;
  } else {
    cardTemplate.querySelector(`.popup__description`).classList.add(`hidden`);
  }

  const popupPhoto = cardTemplate.querySelector(`.popup__photos`);
  const popupPhotoImg = cardTemplate.querySelector(`.popup__photos`).querySelector(`img`);

  if (obj.offer.photos) {
    for (let i = 0; i < obj.offer.photos.length; i++) {
      const popupPhotoImgClone = popupPhotoImg.cloneNode();
      popupPhotoImgClone.src = obj.offer.photos[i];
      popupPhotoImgClone.textContent = `clone`;
      popupPhoto.appendChild(popupPhotoImgClone);
    }
    popupPhoto.removeChild(popupPhotoImg);
  } else {
    popupPhoto.classList.add(`hidden`);
  }

  if (obj.author.avatar) {
    cardTemplate.querySelector(`.popup__avatar`).src = obj.author.avatar;
  } else {
    cardTemplate.querySelector(`.popup__avatar`).classList.add(`hidden`);
  }
  return cardTemplate;
};

const fragmentCard = document.createDocumentFragment();
for (let i = 0; i < offers.length; i++) {
  fragmentCard.appendChild(createCard(offers[i]));
}

const map = document.querySelector(`.map`);


const renderCard = function (fragmentCardItem, mapFiltersContainerItem) {
  map.insertBefore(fragmentCardItem, mapFiltersContainerItem);
};


map.addEventListener(`click`, function (evt) {
  let target = evt.target;
  if (target.tagName === `IMG`) {
    target = target.parentNode;
  }

  if ((target.classList.contains(`map__pin`)) && (!target.classList.contains(`map__pin--main`))) {
    if (map.querySelector(`.map__card`)) {
      map.removeChild(map.querySelector(`.map__card`));
    } else {
      renderCard(createCard(offers[target.dataset.index]), mapFiltersContainer);// map.children[1]

      const popupClose = document.querySelector(`.popup__close`);
      const mapCard = map.querySelector(`.map__card`);
      const removeMapCard = function () {
        map.removeChild(mapCard);
      };
      popupClose.addEventListener(`click`, function () {
        removeMapCard();
      });
      popupClose.addEventListener(`keydown`, function () {
        if (evt.target.code === 13) {
          removeMapCard();
        }
      });
    }
  }
});

map.addEventListener(`keydown`, function (evt) {
  if ((evt.key === `Escape`) && (map.querySelector(`.map__card`))) {
    map.removeChild(map.querySelector(`.map__card`));
  }
});


const mapPinMain = document.querySelector(`.map__pin--main`);
const adFormFieldsets = document.querySelectorAll(`fieldset`);
const mapFilter = document.querySelector(`.map__filters`);

const addMapFaded = function (item) {
  item.classList.add(`map--faded`);
};
addMapFaded(map);

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
  const position = getNumberOfString(distance) + widthItem + widthItemLow / 2;
  return position;
};

const leftMapPin = getPosition(mapPinMainLeft, mapPinImgWidth, widthMapPin);
const topMapPin = getPosition(mapPinMainTop, mapPinImgHeight, heightMapPin);

const mousedownMapPinMain = function () {
  mapPinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1) {
      map.classList.remove(`map--faded`);
    }
    removeAdFormDisabled();
    removeAdFormFieldsetsDisabled();
    renderPin(fragment);
    // renderCard(fragmentCard, mapFiltersContainer);
    fillAddress(address, leftMapPin, topMapPin);
    checkRoomAndGuest();
    setMinPrice();
    setTimeinAndTimeout();
  });
};
mousedownMapPinMain();

const keydownmapPinMain = function () {
  mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.code === `Enter`) {
      map.classList.remove(`map--faded`);
    }
    removeAdFormDisabled();
    removeAdFormFieldsetsDisabled();
    renderPin(fragment);
    // renderCard(fragmentCard, mapFiltersContainer);
    fillAddress(address, leftMapPin, topMapPin);
    checkRoomAndGuest();
    setMinPrice();
    setTimeinAndTimeout();
  });
};
keydownmapPinMain();

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


