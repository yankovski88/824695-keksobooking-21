'use strict';

const LEFT_KEY_MOUSE_CODE = 1;
const mapPinMain = document.querySelector(`.map__pin--main`);
const formFieldsets = document.querySelectorAll(`fieldset`);
const mapFilter = document.querySelector(`.map__filters`);
const mapFilterSelects = mapFilter.querySelectorAll(`select`);
const form = document.querySelector(`.ad-form`);

// функция по закрытию карточки через esc
const onMapEscapePress = function (evt) {
  if ((evt.key === `Escape`) && (window.card.map.querySelector(`.map__card`))) {
    window.card.map.removeChild(window.card.map.querySelector(`.map__card`));
  }
};
window.card.map.addEventListener(`keydown`, onMapEscapePress); // отслеживаем нажатие esc (также мне кажется нужно удалять колбек)

window.util.hideMap(window.card.map); // дизэйбл карты

window.util.disableNodeElement(formFieldsets);
window.util.disableNodeElement(mapFilterSelects); //  к селектам карты добавил disabled

// удаление disabled fieldset
const removeAddDisabled = function (items) {
  items.forEach((item) => {
    item.removeAttribute(`disabled`);
  });
};

// добавить ad-form--disabled
const addAdFormDisabled = function (item) {
  item.classList.add(`ad-form--disabled`);
};

// удаление ad-form--disabled
const removeAdFormDisabled = function (item) {
  item.classList.remove(`ad-form--disabled`);
};

// удаление disabled fieldset
const removeformFieldsetsDisabled = function () {
  formFieldsets.forEach((item) => {
    item.removeAttribute(`disabled`);
  });
};

const activateSite = function () {
  window.card.map.classList.remove(`map--faded`); // карта становится активной
  window.backend.load(window.filter.filterPin, window.error.showError); // делаем запрос для заполнения данных для метки
  removeAdFormDisabled(form); // форма становится активной
  removeformFieldsetsDisabled(); // удаляется где есть disabled в форме
  window.form.checkRoomAndGuest(); // запускается проверка по гостям
  window.form.onTypeChange(); // запускаемся проверка по типу жилья
  window.form.setTimeinAndTimeout(); // запускается проверка по въеду и выезду
  mapPinMain.removeEventListener(`mousedown`, onMapPinMainMousedown); // удаляем обработчик на клик и кнопку на главную метку
  mapPinMain.removeEventListener(`keydown`, onMapPinMainKeydown); // удаляем обработчик на кнопку,

  // добаить обработчик очистки формы
  window.form.adFormReset.addEventListener(`click`, window.form.onFormClick);
  window.form.adFormReset.addEventListener(`keydown`, window.form.onFormPressEnter);
};

// если был клик левой кнопки мыши на клавную метку
const onMapPinMainMousedown = function (evt) {
  if (evt.which === LEFT_KEY_MOUSE_CODE) { // было evt.which
    activateSite();
  }
};

// добавление обработчика на главную метку
if (window.card.map.classList.contains(`map--faded`)) {
  mapPinMain.addEventListener(`mousedown`, onMapPinMainMousedown);
}

// вызываем все теже функции что и при клике на главную метку
const onMapPinMainKeydown = function (evt) {
  if (evt.keyCode === window.form.KEY_CODE_ENTER) {
    activateSite();
  }
};

if (window.card.map.classList.contains(`map--faded`)) {
  mapPinMain.addEventListener(`keydown`, onMapPinMainKeydown);
}

window.main = {
  addAdFormDisabled,
  mapFilter,
  mapPinMain,
  onMapPinMainMousedown,
  formFieldsets,
  mapFilterSelects,
  LEFT_KEY_MOUSE_CODE,
  removeAddDisabled,
  onMapPinMainKeydown
};
