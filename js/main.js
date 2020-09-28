"use strict";

const OBJECT_TOTAL = 8;
const OFFER_TYPES = [`Дворец`, `Квартира`, `Дом`, `Бунгало`];
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

const getArrClassNameHtmlAll = function (tegHtmlAll) {
  const arrItem = [];
  tegHtmlAll.forEach((item) => {
    arrItem.push(item.className);
  });
  return arrItem;
};


const getNameFeaturesHtml = function (arrItemCopy) {
  const arrF = [];
  const arrFTotal = [];
  for (let i = 0; i < arrItemCopy.length; i++) {
    for (let j = arrItemCopy[i].length - 1; j >= 0; j--) {
      if (arrItemCopy[i][j] === `-`) {
        arrF.reverse();
        arrFTotal.push(arrF.join(``));
        arrF.splice(0, arrF.length);
        break;
      } else {
        arrF.push(arrItemCopy[i][j]);
      }
    }
  }
  return arrFTotal;
};

const arrFeatureVsArrFeatureHtmlInsertInHtmlAndDel = function (offerFeatures, allArrFeatureHtml, cardTemplateLi) {
  for (let i = 0; i < offerFeatures.length; i++) {
    for (let j = 0; j < allArrFeatureHtml.length; j++) {
      cardTemplateLi[j].classList.add(`hidden`);
      if (offerFeatures[i] === allArrFeatureHtml[j]) {
        cardTemplateLi[j].textContent = offerFeatures[i];
      }
      if (cardTemplateLi[j].textContent) {
        cardTemplateLi[j].classList.remove(`hidden`);
      }
    }
  }
};


for (let i = 0; i < OBJECT_TOTAL; i++) {
  offers.push({
    "author": {
      "avatar": `img/avatars/user0${i + 1}.png`,
    },
    "offer": {
      "title": `Предложение ${i + 1}`,
      "address": [getRandomMinMax(1, mapBlock.clientHeight), getRandomMinMax(LOCATION_Y_MIN, LOCATION_Y_MAX)],
      "price": `${getRandomMinMax(1000, 10000)} ₽/ночь`,
      "type": OFFER_TYPES[getRandomInt(OFFER_TYPES.length)],
      "rooms": getRandomMinMax(1, ROOMS_MAX),
      "guests": getRandomMinMax(1, GUESTS_MAX),
      "checkin": OFFER_TIMES[getRandomInt(OFFER_TIMES.length)],
      "checkout": OFFER_TIMES[getRandomInt(OFFER_TIMES.length)],
      "features": getRandomPartOfArr(OFFER_FEATURES),
      "description": `Описание ${i + 1}`,
      "photos": getRandomPartOfArr(OFFER_PHOTOS),
    },
    "location": {
      "x": getRandomMinMax(1, mapBlock.clientHeight),
      "y": getRandomMinMax(LOCATION_Y_MIN, LOCATION_Y_MAX),
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

mapPinsHtml.appendChild(fragment);

const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
const cardBeforeHtml = document.querySelector(`.map__filters-container`);

const createCard = function (obj) {


  const cardTemplate = card.cloneNode(true);
  if (obj.offer.title) {
    cardTemplate.querySelector(`.popup__title`).textContent = obj.offer.title;
  } else {
    cardTemplate.querySelector(`.popup__title`).classList.add(`hidden`);
  }
  if (obj.offer.address[0] && obj.offer.address[1]) {
    cardTemplate.querySelector(`.popup__text--address`).textContent = `${obj.offer.address[0]} Tōkyō-to, Chiyoda-ku, Ichibanchō, ${obj.offer.address[1]}`;
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


  const cardTemplateLi = cardTemplate.querySelector(`.popup__features`).querySelectorAll(`li`);
  const arrItem = getArrClassNameHtmlAll(cardTemplateLi);
  const arrItemCopy = arrItem.slice();
  const allArrFeatureHtml = getNameFeaturesHtml(arrItemCopy);
  arrFeatureVsArrFeatureHtmlInsertInHtmlAndDel(obj.offer.features, allArrFeatureHtml, cardTemplateLi);

  if (obj.offer.description) {
    cardTemplate.querySelector(`.popup__description`).textContent = `${obj.offer.description}`;
  } else {
    cardTemplate.querySelector(`.popup__description`).classList.add(`hidden`);
  }

  const tegPhoto = cardTemplate.querySelector(`.popup__photos`);
  const tegPhotoImg = cardTemplate.querySelector(`.popup__photos`).querySelector(`img`);

  if (obj.offer.photos) {
    for (let i = 0; i < obj.offer.photos.length; i++) {
      const tegPhotoImgClone = tegPhotoImg.cloneNode();
      tegPhotoImgClone.src = obj.offer.photos[i];
      tegPhotoImgClone.textContent = `clone`;
      tegPhoto.appendChild(tegPhotoImgClone);
    }
    tegPhoto.removeChild(tegPhotoImg);
  } else {
    tegPhoto.classList.add(`hidden`);
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

const mapCardHtml = document.querySelector(`.map`);
mapCardHtml.insertBefore(fragmentCard, cardBeforeHtml);
