'use strict';
(function () {
  // здесь куча колбеков не знаю стоит ли удалять и когда стоит? если говорят, что надо удалять их всегда???
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

  const mapPins = document.querySelector(`.map__pins`);

  // после того как форма отправится любым способом, то вызовитесь следующие колбеки
  const form = document.querySelector(`.ad-form`);
  form.addEventListener(`submit`, function (evt) {
    window.backend.save(new FormData(form), onSuccess, onErrorSave);
    evt.preventDefault(); // отменил отправку формы по умолчанию
  });

  const success = document.querySelector(`#success`).content.querySelector(`.success`); // нашел шаблон для вставки
  const successTemplate = success.cloneNode(true); // обязательно клонируем шаблон, без клона не вставится в html
  const onSuccess = function () {

    mapPins.appendChild(successTemplate); // Добавил нод в Html
    document.addEventListener(`keydown`, onSuccessPressEsc); // добавивл обработчик по ссылке
    // где onSuccessPressEsc этот колбек удаляет себя же как обработчика
    document.addEventListener(`click`, onSuccessClick); // обработчик на клик, удаляет себя и обработик на ESC
    form.reset();
    window.main.addAdFormDisabled(form); // дизейбл формы
    window.main.addMapFaded(window.card.map);

    delPinButtons();
    window.main.mapPinMain.addEventListener(`mousedown`, window.main.onMapPinMainMousedown);

  };
  const delPinButtons = function () {
    const buttonPins = mapPins.querySelectorAll(`button`);
    for (let i = 0; i < buttonPins.length; i++) {

      if (!buttonPins[i].classList.contains(`map__pin--main`)) {
        buttonPins[i].remove();
      }
    }
  };

  // Добавляю удаление сообщения об успешной отправке через ESC
  const onSuccessPressEsc = function (evt) {
    if (evt.keyCode === 27) {
      successTemplate.remove();
      document.removeEventListener(`keydown`, onSuccessPressEsc);
      document.removeEventListener(`click`, onSuccessClick);

    }
  };
  const onSuccessClick = function () {
    successTemplate.remove();
    document.removeEventListener(`click`, onSuccessClick);
    document.removeEventListener(`keydown`, onSuccessPressEsc);

  };
  const error = document.querySelector(`#error`).content.querySelector(`.error`); // нашел шаблон
  const nodeError = error.cloneNode(true); // делаем клон ноду шаблона без нее не вставим
  let errorButton; // вынес кнопку в глобальную видимость т.к. нужно ее найти только после добавленя ее в DOM
  // сделал функцю по обработке ошибки
  const onErrorSave = function () {
    const main = document.querySelector(`main`); // нашел куда вставляем
    main.appendChild(nodeError); // вставил в html элемент наш шаблон
    errorButton = document.querySelector(`.error__button`);// находим кнопку по которой будем кликать для закрытия

    document.addEventListener(`click`, onAroundOfErrorButtonClick);
    document.addEventListener(`keydown`, onErrorButtonPressEsc);
    errorButton.addEventListener(`click`, onErrorButtonClick);

  };

  // создаю колбек функцию по ссылке для удаления окна с ошибкой
  const onAroundOfErrorButtonClick = function () { // пишу функцию по клику на кнопку закрытия
    nodeError.remove(); // удаляем наш node Error
    document.removeEventListener(`click`, onAroundOfErrorButtonClick);
    document.removeEventListener(`keydown`, onErrorButtonPressEsc);
    errorButton.removeEventListener(`click`, onErrorButtonClick);
  };

  const onErrorButtonPressEsc = function (evt) {
    if (evt.keyCode === 27) {
      nodeError.remove(); // удаляем наш node Error
      document.removeEventListener(`keydown`, onErrorButtonPressEsc);
      document.removeEventListener(`click`, onAroundOfErrorButtonClick);
      errorButton.removeEventListener(`click`, onErrorButtonClick);

    }
  };
  const onErrorButtonClick = function () {
    nodeError.remove(); // удаляем наш node Error
    errorButton.removeEventListener(`click`, onErrorButtonClick);
    document.removeEventListener(`keydown`, onErrorButtonPressEsc);
    document.removeEventListener(`click`, onAroundOfErrorButtonClick);
  };

  // сделал обработчик клика на очистку формы
  const onFormClick = function () {
    form.reset();
    adFormReset.removeEventListener(`click`, onFormClick);
    adFormReset.removeEventListener(`keydown`, onFormPressEnter);

  };
  // может не надо здесь удалять оброботчики по ссылке?
  const onFormPressEnter = function (evt) {
    if (evt.keyCode === 13) {
      form.reset();
      adFormReset.removeEventListener(`click`, onFormClick);
      adFormReset.removeEventListener(`keydown`, onFormPressEnter);
    }
  };

  // добаить обработчик очистки формы
  const adFormReset = document.querySelector(`.ad-form__reset`); // клик по этой кнопке
  adFormReset.addEventListener(`click`, onFormClick);
  adFormReset.addEventListener(`keydown`, onFormPressEnter);

  window.form = {
    setTimeinAndTimeout,
    capacityOptions,
    capacity,
    checkRoomAndGuest,
    onTypeChange
  };
})();

