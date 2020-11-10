'use strict';

// + все что связано с формой
const KEY_CODE_ESC = 27;
const KEY_CODE_ENTER = 13;
const MIN_LENGTH = 30;
const MAX_PRICE = 1000000;
const capacity = document.querySelector(`#capacity`); // нашли id формы по гостям
const capacityOptions = capacity.querySelectorAll(`option`); // выбрали у нее все всплывающие пункты
const СountGuests = [[0, 1, 3], [0, 3], [3], [0, 1, 2]]; // это перечисление дляустановки определенным полям гостей disabled
const avatar = document.querySelector(`#avatar`);
const image = document.querySelector(`#images`);
const timein = document.querySelector(`#timein`);
const timeinOptions = timein.querySelectorAll(`option`);
const timeout = document.querySelector(`#timeout`);
const timeoutOptions = timeout.querySelectorAll(`option`);
const mapPins = document.querySelector(`.map__pins`);
const success = document.querySelector(`#success`).content.querySelector(`.success`); // нашел шаблон для вставки
const successTemplate = success.cloneNode(true); // обязательно клонируем шаблон, без клона не вставится в html
const error = document.querySelector(`#error`).content.querySelector(`.error`); // нашел шаблон
const nodeError = error.cloneNode(true); // делаем клон ноду шаблона без нее не вставим
const START_ADDRESS_X = Math.round(parseInt(window.movePin.MAP_PIN_MAIN_LEFT, 10) + window.movePin.mapPinMain.offsetWidth / 2);
const START_ADDRESS_Y = Math.round(parseInt(window.movePin.MAP_PIN_MAIN_TOP, 10) + window.movePin.mainPinHeight);
const type = document.querySelector(`#type`);
const types = type.querySelectorAll(`option`);
// const titles = getArrValueFromHtml(types);
const Prices = [0, 1000, 5000, 10000]; // тоже идет как перечисление
let errorButton; // вынес кнопку в глобальную видимость т.к. нужно ее найти только после добавленя ее в DOM

// функция которая удаляет все поля и возвращает сайт в начальное состояние
const startSite = function () {
  form.reset(); // удаление полей в форме подачи объявления
  window.filter.mapFilters.reset(); // удаление всех данных фильтра ПОЧЕМУ ФОРМА УДАЛЯЕТСЯ 1 РАЗ
  window.main.addAdFormDisabled(form); // дизейбл формы
  window.main.addMapFaded(window.card.map); // дизейбл карты
  window.main.addDisabled(window.main.formFieldsets); // добавление к полям формы disabled
  window.main.addDisabled(window.main.mapFilterSelects); //  к селектам карты добавил disabled


  // удаление карточки если была открыта
  if (window.card.map.querySelector(`.map__card`)) {
    window.card.map.removeChild(window.card.map.querySelector(`.map__card`)); // если карточка открта то удалить
  }
  // установка метки в центре
  if (window.card.map.classList.contains(`map--faded`)) { // если с карта содержит map--faded т.е. заблокирована
    window.movePin.mapPinMain.style.top = window.movePin.MAP_PIN_MAIN_TOP; // прописали стиль координат на данные с html
    window.movePin.mapPinMain.style.left = window.movePin.MAP_PIN_MAIN_LEFT; // прописали стиль координат на данные с html
  }
  // возвращает начальное поле адреса
  window.movePin.fillAddress(window.movePin.address, START_ADDRESS_X, START_ADDRESS_Y);
  // удаление аватара и устнановка старой картинки
  if (window.photo.previewAvatar.querySelector(`img`).src !== `img/muffin-grey.svg`) {
    window.photo.previewAvatar.replaceChildren(); // replaceChildren()предоставляет очень удобный механизм для очистки узла от всех его дочерних элементов
    window.photo.previewAvatar.style.display = `flex`;
    window.photo.previewAvatar.style.alignItems = `center`;
    window.photo.previewAvatar.style.justifyContent = `center`;
    const imgAvatar = document.createElement(`img`);
    imgAvatar.style.width = `40px`;
    imgAvatar.style.height = `44px`;
    window.photo.previewAvatar.appendChild(imgAvatar);
    imgAvatar.src = `img/muffin-grey.svg`;
  }

  // удаление старого фото квартииры
  if (window.photo.previewPhotoFlat.querySelector(`img`)) {
    window.photo.previewPhotoFlat.querySelector(`img`).remove();
  }

  setGuestsDefault(); // функция делает по умолчанию поле с гостями
  delPinButtons(); // удалить все метки
  // добавил обработчик клика по главной метке, если будет клик, то все отрисуется обратно как в начале загрузки сайта
  window.main.mapPinMain.addEventListener(`mousedown`, window.main.onMapPinMainMousedown);
};

// удаляем атрибут disabled в полученом массиве option
const removeToArrDisabled = function (arr) {
  arr.forEach((item) => {
    item.removeAttribute(`disabled`);
  });
};
removeToArrDisabled(capacityOptions);

// установка поле гостя по умолчанию
const setGuestsDefault = function () {
  for (let i = 0; i < СountGuests[0].length; i++) { // перебираем массив для 1 комнаты
    capacityOptions[СountGuests[0][i]].setAttribute(`disabled`, `true`); // устанавливаем всеим полям гостей disabled
  }
  capacityOptions[2].selected = true; // покажется активный выриант колличества гостей
};
setGuestsDefault();

const setDisabledGuest = function (indexСountGuests, countGuests, guestOptions, indexSelectedGuestOptions) {
  for (let i = 0; i < countGuests[indexСountGuests].length; i++) { // перебираем массив для 1 комнаты
    guestOptions[countGuests[indexСountGuests][i]].setAttribute(`disabled`, `true`); // устанавливаем всеим полям гостей disabled
  }
  guestOptions[indexSelectedGuestOptions].selected = true; // покажется активный выриант колличества гостей
};

const checkRoomAndGuest = function () {
  const roomNumber = document.querySelector(`#room_number`); // нашел поле комнат
  // идет работа по функция комнаты и гости
  const onRoomNumberChange = function () {
    const ROOM_ONE = `1`;
    const ROOM_TWO = `2`;
    const ROOM_THREE = `3`;

    const roomValue = roomNumber.value; // нашли значение выбраного поля пользователем
    if (roomValue === ROOM_ONE) { // если значение 1 то это 1 комната выбрана
      window.main.removeAddDisabled(capacityOptions); // функция удаляет у всех полей disabled
      setDisabledGuest(0, СountGuests, capacityOptions, 2);
    } else if (roomValue === ROOM_TWO) { // если значение 1 то это 1 комната выбрана
      window.main.removeAddDisabled(capacityOptions);
      setDisabledGuest(1, СountGuests, capacityOptions, 1);
    } else if (roomValue === ROOM_THREE) { // если значение 1 то это 1 комната выбрана
      window.main.removeAddDisabled(capacityOptions);
      setDisabledGuest(2, СountGuests, capacityOptions, 0);
    } else if (roomValue > СountGuests.length - 1) { // если значение 1 то это 1 комната выбрана. Исп
      window.main.removeAddDisabled(capacityOptions);
      setDisabledGuest(3, СountGuests, capacityOptions, 3);
    }
  };
  roomNumber.addEventListener(`change`, onRoomNumberChange);
};

const title = document.querySelector(`#title`);
title.setAttribute(`minlength`, MIN_LENGTH);
const price = document.querySelector(`#price`);
price.setAttribute(`max`, MAX_PRICE);

const getArrValueFromHtml = function (arrHtml) {
  const itemValues = [];
  arrHtml.forEach((item) => {
    itemValues.push(item.value);
  });
  return itemValues;
};

const titles = getArrValueFromHtml(types);

// функция сравнения цены по типу жилья
const onTypeChange = function () {
  const titleValue = type.value;
  for (let i = 0; i < titles.length; i++) {
    if (titleValue === titles[i]) {
      price.setAttribute(`placeholder`, `от ${Prices[i]}`);
      price.setAttribute(`min`, `${Prices[i]}`);
    }
  }
};
type.addEventListener(`change`, onTypeChange);

price.setAttribute(`required`, `required`);
price.setAttribute(`type`, `number`);
price.setAttribute(`max`, `${MAX_PRICE}`);
avatar.setAttribute(`accept`, `image/*`);
image.setAttribute(`accept`, `image/*`);

const setTimeinAndTimeout = function () {
  const onTimeinChange = function () {
    for (let i = 0; i < timeinOptions.length; i++) {
      if (timeinOptions[i].value === timein.value) {
        timeout.value = timeinOptions[i].value;
        break;
      }
    }
  };
  timein.addEventListener(`change`, onTimeinChange);
  const onTimeoutChange = function () {
    for (let i = 0; i < timeoutOptions.length; i++) {
      if (timeoutOptions[i].value === timeout.value) {
        timein.value = timeoutOptions[i].value;
        break;
      }
    }
  };
  timeout.addEventListener(`change`, onTimeoutChange);
};

// после того как форма отправится любым способом, то вызовитесь следующие колбеки
const form = document.querySelector(`.ad-form`);
form.addEventListener(`submit`, function (evt) {
  evt.preventDefault(); // отменил отправку формы по умолчанию
  window.backend.save(new FormData(form), onSuccess, showErrorSave);
});

const onSuccess = function () { // обработчик отправки успешной формы
  mapPins.appendChild(successTemplate); // Добавил нод в Html
  document.addEventListener(`keydown`, onSuccessPressEsc); // добавивл обработчик по ссылке
  // где onSuccessPressEsc этот колбек удаляет себя же как обработчика
  document.addEventListener(`click`, onSuccessClick); // обработчик на клик, удаляет себя и обработик на ESC
  startSite(); // функция которая приводит сайт в начальное состояние
};

const delPinButtons = function () {
  const buttonPins = mapPins.querySelectorAll(`button`);
  buttonPins.forEach((item) => {
    if (!item.classList.contains(`map__pin--main`)) {
      item.remove();
    }
  });
};

// функция по удалению успешного окна отправки
const removeShowSuccess = function () {
  successTemplate.remove();
  document.removeEventListener(`keydown`, onSuccessPressEsc);
  document.removeEventListener(`click`, onSuccessClick);
};

// Добавляю удаление сообщения об успешной отправке через ESC
const onSuccessPressEsc = function (evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    removeShowSuccess(); // функция удаления успешного окна отправки
  }
};

const onSuccessClick = function () {
  removeShowSuccess(); // функция удаления успешного окна отправки
};

// сделал функцю по обработке ошибки
const showErrorSave = function () {
  const main = document.querySelector(`main`); // нашел куда вставляем
  main.appendChild(nodeError); // вставил в html элемент наш шаблон
  errorButton = document.querySelector(`.error__button`);// находим кнопку по которой будем кликать для закрытия
  document.addEventListener(`click`, onAroundOfErrorButtonClick);
  document.addEventListener(`keydown`, onErrorButtonPressEsc);
  errorButton.addEventListener(`click`, onErrorButtonClick);
};

const removeShowError = function () {
  nodeError.remove(); // удаляем наш node Error
  document.removeEventListener(`click`, onAroundOfErrorButtonClick);
  document.removeEventListener(`keydown`, onErrorButtonPressEsc);
  errorButton.removeEventListener(`click`, onErrorButtonClick);
};

// создаю колбек функцию по ссылке для удаления окна с ошибкой
const onAroundOfErrorButtonClick = function () { // пишу функцию по клику на кнопку закрытия
  removeShowError();
};

const onErrorButtonPressEsc = function (evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    removeShowError();
  }
};
const onErrorButtonClick = function () {
  removeShowError();
};

// сделал обработчик клика на очистку формы
const onFormClick = function () {
  startSite(); // функция которая приводит сайт в начальное состояние
};

// может не надо здесь удалять оброботчики по ссылке?
const onFormPressEnter = function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    startSite();
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
  onTypeChange,
  KEY_CODE_ENTER,
  START_ADDRESS_X,
  START_ADDRESS_Y,
};
