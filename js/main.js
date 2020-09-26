"use strict";

const OBJECT_TOTAL = 8;
const OFFER_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const OFFER_TIMES = [`12:00`, `13:00`, `14:00`];
const OFFER_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const OFFER_PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const LOCATION_Y_MAX = 630;
const LOCATION_Y_MIN = 130;
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


for (let i = 0; i < OBJECT_TOTAL; i++) {
  offers.push({
    "author": {
      "avatar": `img/avatars/user0${i + 1}.png`,
    },
    "offer": {
      "title": `Предложение ${i + 1}`,
      "address": `${getRandomMinMax(0, mapBlock.clientHeight)}, ${getRandomMinMax(LOCATION_Y_MIN, LOCATION_Y_MAX)}`,
      "price": `${getRandomMinMax(1000, 10000)}`,
      "type": OFFER_TYPES[getRandomInt(OFFER_TYPES.length)],
      "rooms": getRandomInt(4),
      "guests": getRandomInt(4),
      "checkin": OFFER_TIMES[getRandomInt(OFFER_TIMES.length)],
      "checkout": OFFER_TIMES[getRandomInt(OFFER_TIMES.length)],
      "features": getRandomPartOfArr(OFFER_FEATURES),
      "description": `Описание ${i}`,
      "photos": getRandomPartOfArr(OFFER_PHOTOS),
    },
    "location": {
      "x": getRandomMinMax(0, mapBlock.clientHeight),
      "y": getRandomMinMax(LOCATION_Y_MIN, LOCATION_Y_MAX),
    },
  });
}
const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const createPin = function (obj) {
  const pinTemplate = pin.cloneNode(true);
  pinTemplate.querySelector(`img`).src = obj.author.avatar;
  pinTemplate.querySelector(`img`).alt = obj.title;
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


