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

const getNumberOfString = function (string, stopStringItem) {
  const arr = [];
  for (let i = 0; i < string.length; i++) {
    if (string[i] !== stopStringItem) {
      arr.push(string[i]);
    } else {
      break;
    }
  }
  const stringNumber = arr.join(``);
  const number = parseInt(stringNumber, 10);
  return number;
};

const addAddress = function (address, left, top) {
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
for (let i = 0; i < offers.length; i++) {
  fragment.appendChild(createPin(offers[i]));
}

const renderPin = function () {
  mapPinsHtml.appendChild(fragment);
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
fragmentCard.appendChild(createCard(offers[0]));

const map = document.querySelector(`.map`);
const renderCard = function () {
  map.insertBefore(fragmentCard, mapFiltersContainer);
};


const mapPinMain = document.querySelector(`.map__pin--main`);
const adFormFieldsets = document.querySelectorAll(`fieldset`);
const mapFilter = document.querySelector(`.map__filters`);

map.classList.add(`map--faded`);

adFormFieldsets.forEach((item) => {
  item.setAttribute(`disabled`, `true`);
});

mapFilter.classList.add(`ad-form--disabled`);

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
const elemStop = `p`;
const widthMapPin = 10;
const heightMapPin = 22;
const leftMapPin = getNumberOfString(mapPinMainLeft, elemStop) + mapPinImgWidth + widthMapPin / 2;
const topMapPin = getNumberOfString(mapPinMainTop, elemStop) + mapPinImgHeight + heightMapPin / 2;


mapPinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.which === 1) {
    map.classList.remove(`map--faded`);
  }
  removeAdFormDisabled();
  removeAdFormFieldsetsDisabled();
  renderPin();
  renderCard();
  addAddress(address, leftMapPin, topMapPin);
});

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.code === `Enter`) {
    map.classList.remove(`map--faded`);
  }
  removeAdFormDisabled();
  removeAdFormFieldsetsDisabled();
  renderPin();
  renderCard();
  addAddress(address, leftMapPin, topMapPin);
});

const capacity = document.querySelector(`#capacity`);
const capacityOptions = capacity.querySelectorAll(`option`);

const removeToArrDisabled = function (arr) {
  arr.forEach((item) => {
    item.removeAttribute(`disabled`);
  });
};

removeToArrDisabled(capacityOptions);
const roomNumber = document.querySelector(`#room_number`);
roomNumber.addEventListener(`change`, function (evt) {

  for (let i = 0; i < capacityOptions.length; i++) {
    if (evt.target.value === `1`) {
      removeToArrDisabled(capacityOptions);
      capacityOptions[0].setAttribute(`disabled`, `true`);
      capacityOptions[1].setAttribute(`disabled`, `true`);
      capacityOptions[3].setAttribute(`disabled`, `true`);
    } if (evt.target.value === `2`) {
      removeToArrDisabled(capacityOptions);
      capacityOptions[0].setAttribute(`disabled`, `true`);
      capacityOptions[3].setAttribute(`disabled`, `true`);
    } if (evt.target.value === `3`) {
      removeToArrDisabled(capacityOptions);
      capacityOptions[3].setAttribute(`disabled`, `true`);
    } if (evt.target.value === `100`) {
      removeToArrDisabled(capacityOptions);
      capacityOptions[0].setAttribute(`disabled`, `true`);
      capacityOptions[1].setAttribute(`disabled`, `true`);
      capacityOptions[2].setAttribute(`disabled`, `true`);
    }
  }
});

