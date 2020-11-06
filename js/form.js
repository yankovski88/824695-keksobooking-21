'use strict';
(function () {

// + все что связано с формой
const KEY_CODE_ESC = 27;
const KEY_CODE_ENTER = 13;
const MIN_LENGTH = 30;
const MAX_PRICE = 1000000;
// переменная с указанием информации что нет таких комант с гостями
const MESSAGE_ROOMS_ERROR = `
1 комната — «для 1 гостя»;
2 комнаты — «для 2 гостей» или «для 1 гостя»;
3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
100 комнат — «не для гостей».`;

const MAX_ROOM = 3;
const NO_FOR_GUEST = `0`;

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

  // удаление аватара и устнановка старой картинки
  if (window.foto.previewAvatar.querySelector(`img`).src !== `img/muffin-grey.svg`) {
    window.foto.previewAvatar.replaceChildren(); // replaceChildren()предоставляет очень удобный механизм для очистки узла от всех его дочерних элементов

    window.foto.previewAvatar.style.display = `flex`;
    window.foto.previewAvatar.style.alignItems = `center`;
    window.foto.previewAvatar.style.justifyContent = `center`;
    const imgAvatar = document.createElement(`img`);
    imgAvatar.style.width = `40px`;
    imgAvatar.style.height = `44px`;
    window.foto.previewAvatar.appendChild(imgAvatar);
    imgAvatar.src = `img/muffin-grey.svg`;
  }

  // удаление старого фото квартииры
  if (window.foto.previewFotoFlat.querySelector(`img`)) {
    window.foto.previewFotoFlat.querySelector(`img`).remove();
  }

  delPinButtons(); // удалить все метки
  // добавил обработчик клика по главной метке, если будет клик, то все отрисуется обратно как в начале загрузки сайта
  window.main.mapPinMain.addEventListener(`mousedown`, window.main.onMapPinMainMousedown);
};

const capacity = document.querySelector(`#capacity`); // нашли id формы по гостям
const capacityOptions = capacity.querySelectorAll(`option`); // выбрали у нее все всплывающие пункты

// удаляем атрибут disabled в полученом массиве option
const removeToArrDisabled = function (arr) {
  arr.forEach((item) => {
    item.removeAttribute(`disabled`);
  });
};
removeToArrDisabled(capacityOptions);

const checkRoomAndGuest = function () {
  const roomNumber = document.querySelector(`#room_number`);

  // идет работа по функция компанты и гости
  let room = roomNumber.value;
  let guest = capacity.value;
  let romIndex = room - 1;
  const Capacitys = [[`1`], [`1`, `2`], [`1`, `2`, `3`], [`0`]]; // это перечисление заменил с массива

  const checkRoomDefault = function () {
    if ((Capacitys[romIndex].includes(room) && Capacitys[romIndex].includes(guest)) === false) {
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
      romIndex = Capacitys.length - 1;
    } else {
      romIndex = room - 1;
    }
    if ((Capacitys[romIndex].includes(room) && Capacitys[romIndex].includes(guest)) === false) {
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
    if ((Capacitys[romIndex].includes(room) && Capacitys[romIndex].includes(guest)) === false) {
      roomNumber.setCustomValidity(MESSAGE_ROOMS_ERROR);
    } else {
      roomNumber.setCustomValidity(``);
    }
  };
  capacity.addEventListener(`change`, onCapacityChange);
};

const title = document.querySelector(`#title`);
title.setAttribute(`minlength`, MIN_LENGTH);
const price = document.querySelector(`#price`);
price.setAttribute(`max`, MAX_PRICE);

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
const Prices = [0, 1000, 5000, 10000]; // тоже идет как перечисление

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
    timeinOptions.forEach((item) =>{
      if (item.value === timein.value) {
        timeout.value = item.value;
      }
    });
  };

  timein.addEventListener(`change`, onTimeinChange);

  const onTimeoutChange = function () {
    timeoutOptions.forEach((item)=>{
      if (item.value === timeout.value) {
        timein.value = item.value;
      }
    });
  };
  timeout.addEventListener(`change`, onTimeoutChange);
};

const mapPins = document.querySelector(`.map__pins`);

// после того как форма отправится любым способом, то вызовитесь следующие колбеки
const form = document.querySelector(`.ad-form`);
form.addEventListener(`submit`, function (evt) {
  evt.preventDefault(); // отменил отправку формы по умолчанию
  window.backend.save(new FormData(form), onSuccess, onErrorSave);
});

const success = document.querySelector(`#success`).content.querySelector(`.success`); // нашел шаблон для вставки
const successTemplate = success.cloneNode(true); // обязательно клонируем шаблон, без клона не вставится в html
const onSuccess = function () { // обработчик отправки успешной формы
  mapPins.appendChild(successTemplate); // Добавил нод в Html
  document.addEventListener(`keydown`, onSuccessPressEsc); // добавивл обработчик по ссылке
  // где onSuccessPressEsc этот колбек удаляет себя же как обработчика
  document.addEventListener(`click`, onSuccessClick); // обработчик на клик, удаляет себя и обработик на ESC

  startSite(); // функция которая приводит сайт в начальное состояние
};

const delPinButtons = function () {
  const buttonPins = mapPins.querySelectorAll(`button`);
  buttonPins.forEach((item)=>{
    if (!item.classList.contains(`map__pin--main`)) {
      item.remove();
    }
  });
};

// Добавляю удаление сообщения об успешной отправке через ESC
const onSuccessPressEsc = function (evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
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
  if (evt.keyCode === KEY_CODE_ESC) {
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
};

})();
