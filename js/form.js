'use strict';
(function () {
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

    const onRoomNumberChange = function () {
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
    };
    roomNumber.addEventListener(`change`, onRoomNumberChange);

    // везде где есть обработчики вставил фнкции по ссылке. Это правильно или нужно было оставить как былом(отдельной функцией)?
    // ну и приходится менять название функции на название обработчика с checkCapacity на onCapacityChange
    const onCapacityChange = function () {
      const guestValue = capacity.value;
      guest = guestValue;
      if ((capacitys[romIndex].includes(room) && capacitys[romIndex].includes(guest)) === false) {
        roomNumber.setCustomValidity(MESSAGE_ROOMS_ERROR);
      } else {
        roomNumber.setCustomValidity(``);
      }
    };
    capacity.addEventListener(`change`, onCapacityChange);
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


  const type = document.querySelector(`#type`);
  const types = type.querySelectorAll(`option`);
  const titles = getArrValueFromHtml(types);
  const prices = [0, 1000, 5000, 10000];

  const onTypeChange = function () {
    const titleValue = type.value;
    for (let i = 0; i < titles.length; i++) {
      if (titleValue === titles[i]) {
        price.setAttribute(`placeholder`, `от ${prices[i]}`);
        price.setAttribute(`min`, `${prices[i]}`);
      }
    }
  };
  type.addEventListener(`change`, onTypeChange);

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
    const onTimeinChange = function () {
      for (let i = 0; i < timeinOptions.length; i++) {
        if (timeinOptions[i].value === timein.value) {
          timeout.value = timein[i].value;
        }
      }
    };

    timein.addEventListener(`change`, onTimeinChange);

    const onTimeoutChange = function () {
      for (let i = 0; i < timeoutOptions.length; i++) {
        if (timeoutOptions[i].value === timeout.value) {
          timein.value = timeout[i].value;
        }
      }
    };
    timeout.addEventListener(`change`, onTimeoutChange);
  };

  window.form = {
    setTimeinAndTimeout,
    capacityOptions,
    capacity,
    checkRoomAndGuest,
  };
})();

