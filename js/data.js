'use strict';
(function () {
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
  // data
  for (let i = 0; i < OBJECT_TOTAL; i++) {
    const locationX = window.util.getRandomMinMax(1, mapBlock.clientHeight);
    const locationY = window.util.getRandomMinMax(LOCATION_Y_MIN, LOCATION_Y_MAX);
    offers.push({
      "author": {
        "avatar": `img/avatars/user0${i + 1}.png`,
      },
      "offer": {
        "title": `Предложение ${i + 1}`,
        "address": `${locationX}, ${locationY}`,
        "price": `${window.util.getRandomMinMax(1000, 10000)} ₽/ночь`,
        "type": `${window.util.getRandomValueOfObject(OFFER_TYPES)}`,
        "rooms": window.util.getRandomMinMax(1, ROOMS_MAX),
        "guests": window.util.getRandomMinMax(1, GUESTS_MAX),
        "checkin": OFFER_TIMES[window.util.getRandomInt(OFFER_TIMES.length)],
        "checkout": OFFER_TIMES[window.util.getRandomInt(OFFER_TIMES.length)],
        "features": window.util.getRandomPartOfArr(OFFER_FEATURES),
        "description": `Описание ${i + 1}`,
        "photos": window.util.getRandomPartOfArr(OFFER_PHOTOS),
      },
      "location": {
        "x": `${locationX}`,
        "y": `${locationY}`,
      },
    });
  }

  window.data = {
    offers,
    ROOMS_MAX,
    OFFER_FEATURES,
    OFFER_TIMES,
    OFFER_TYPES,
    OBJECT_TOTAL,
    mapBlock,
    LOCATION_Y_MAX,
    LOCATION_Y_MIN,
    OFFER_PHOTOS,
    GUESTS_MAX,
  };
})();
