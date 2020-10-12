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

    timein.addEventListener(`change`, setTimein);

    const setTimeout = function () {
      for (let i = 0; i < timeoutOptions.length; i++) {
        if (timeoutOptions[i].value === timeout.value) {
          timein.value = timeout[i].value;
        }
      }
    };
    timeout.addEventListener(`change`, setTimeout);
  };

  window.form = {
    setTimeinAndTimeout,
    setMinPrice,
    capacityOptions,
    capacity,
    checkRoomAndGuest
  };
})();

