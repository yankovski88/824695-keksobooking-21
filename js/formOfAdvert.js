'use strict';

// все что связано с формой
const KEY_CODE_ESC = 27;
const KEY_CODE_ENTER = 13;
const MIN_LENGTH = 30;
const MAX_PRICE = 1000000;
const START_ADDRESS_X = Math.round(parseInt(window.movePin.MAP_PIN_MAIN_LEFT, 10) + window.movePin.mapPinMain.offsetWidth / 2);
const START_ADDRESS_Y = Math.round(parseInt(window.movePin.MAP_PIN_MAIN_TOP, 10) + window.movePin.mapPinMain.offsetHeight / 2);
const CountGuests = [[0, 1, 3], [0, 3], [3], [0, 1, 2]]; // это перечисление дляустановки определенным полям гостей disabled
const Prices = [0, 1000, 5000, 10000]; // тоже идет как перечисление
const capacity = document.querySelector(`#capacity`); // нашли id формы по гостям
const capacityOptions = capacity.querySelectorAll(`option`); // выбрали у нее все всплывающие пункты
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
const type = document.querySelector(`#type`);
const types = type.querySelectorAll(`option`);
const title = document.querySelector(`#title`);
const titles = window.util.getArrValueFromHtml(types);
const price = document.querySelector(`#price`);
const form = document.querySelector(`.ad-form`);
const adFormReset = document.querySelector(`.ad-form__reset`); // клик по этой кнопке
let errorButton; // вынес кнопку в глобальную видимость т.к. нужно ее найти только после добавленя ее в DOM

const delOpenCard = function () {
  // удаление карточки если была открыта
  if (window.propertyDescription.map.querySelector(`.map__card`)) {
    window.propertyDescription.map.removeChild(window.propertyDescription.map.querySelector(`.map__card`)); // если карточка открта то удалить
  }
};

const setMainPinCenter = function () {
  // установка метки в центре
  if (window.propertyDescription.map.classList.contains(`map--faded`)) { // если с карта содержит map--faded т.е. заблокирована
    window.movePin.mapPinMain.style.top = window.movePin.MAP_PIN_MAIN_TOP; // прописали стиль координат на данные с html
    window.movePin.mapPinMain.style.left = window.movePin.MAP_PIN_MAIN_LEFT; // прописали стиль координат на данные с html
  }
};

const delAvatar = function () {
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
};

const delPhoto = function () {
  const imgPhotoFlat = window.photo.previewFlat.querySelector(`img`); // нашли поле с фоткой квартиры
  // удаление старого фото квартииры
  if (imgPhotoFlat) {
    imgPhotoFlat.remove();
  }
};

// функция которая удаляет все поля и возвращает сайт в начальное состояние
const startSite = function () {
  form.reset(); // удаление полей в форме подачи объявления
  window.sort.mapFilters.reset(); // удаление всех данных фильтра ПОЧЕМУ ФОРМА УДАЛЯЕТСЯ 1 РАЗ
  window.head.addAdFormDisabled(form); // дизейбл формы
  window.util.hideMap(window.propertyDescription.map); // дизейбл карты
  window.util.disableNodeElement(window.head.formFieldsets); // добавление к полям формы disabled
  window.util.disableNodeElement(window.head.mapFilterSelects); //  к селектам карты добавил disabled

  delOpenCard();
  setMainPinCenter();
  delAvatar();
  delPhoto();
  onTypeChange(); // добавил чистку т.к. нпч

  // возвращает начальное поле адреса
  window.movePin.fillAddress(window.movePin.address, START_ADDRESS_X, START_ADDRESS_Y);

  setGuestsDefault(); // функция делает по умолчанию поле с гостями
  delPinButtons(); // удалить все метки
  adFormReset.removeEventListener(`click`, onFormClick); // удалить обработчик на reset form через клик
  adFormReset.removeEventListener(`click`, onFormPressEnter); // удалить обработчик на reset form через enter
  // добавил обработчик клика по главной метке, если будет клик, то все отрисуется обратно как в начале загрузки сайта
  window.head.mapPinMain.addEventListener(`mousedown`, window.head.onMapPinMainMousedown);
  window.head.mapPinMain.addEventListener(`keydown`, window.head.onMapPinMainKeydown); // добавил обработчик на загрузку главной страницы через enter
};

window.util.removeToArrDisabled(capacityOptions);

// установка поле гостя по умолчанию
const setGuestsDefault = function () {
  for (let i = 0; i < CountGuests[0].length; i++) { // перебираем массив для 1 комнаты
    capacityOptions[CountGuests[0][i]].setAttribute(`disabled`, `true`); // устанавливаем всеим полям гостей disabled
  }
  capacityOptions[2].selected = true; // покажется активный выриант колличества гостей
};
setGuestsDefault();

const setDisabledGuest = function (indexCountGuests, countGuests, guestOptions, indexSelectedGuestOptions) {
  for (let i = 0; i < countGuests[indexCountGuests].length; i++) { // перебираем массив для 1 комнаты
    guestOptions[countGuests[indexCountGuests][i]].setAttribute(`disabled`, `true`); // устанавливаем всеим полям гостей disabled
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

    window.head.removeAddDisabled(capacityOptions); // функция удаляет у всех полей disabled

    const roomValue = roomNumber.value; // нашли значение выбраного поля пользователем
    if (roomValue === ROOM_ONE) { // если значение 1 то это 1 комната выбрана
      setDisabledGuest(0, CountGuests, capacityOptions, 2);
    } else if (roomValue === ROOM_TWO) { // если значение 1 то это 1 комната выбрана
      setDisabledGuest(1, CountGuests, capacityOptions, 1);
    } else if (roomValue === ROOM_THREE) { // если значение 1 то это 1 комната выбрана
      setDisabledGuest(2, CountGuests, capacityOptions, 0);
    } else if (roomValue > CountGuests.length - 1) { // если значение 1 то это 1 комната выбрана. Исп
      setDisabledGuest(3, CountGuests, capacityOptions, 3);
    }
  };
  roomNumber.addEventListener(`change`, onRoomNumberChange);
};

title.setAttribute(`minlength`, MIN_LENGTH);
price.setAttribute(`max`, MAX_PRICE);

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
onTypeChange();
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

window.formOfAdvert = {
  setTimeinAndTimeout,
  capacityOptions,
  capacity,
  checkRoomAndGuest,
  onTypeChange,
  KEY_CODE_ENTER,
  adFormReset,
  onFormClick,
  onFormPressEnter,
  mapPins,
  KEY_CODE_ESC,
};
