'use strict';
(function () {

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

  // установка адреса изначально
  // добавить к классу map--faded
  const addMapFaded = function (item) {
    item.classList.add(`map--faded`);
  };
  addMapFaded(window.card.map); // дизэйбл карты

  // добавить disabled
  const addDisabled = function (arrItems) {
    arrItems.forEach((item) => {
      item.setAttribute(`disabled`, `true`);
    });
  };

  addDisabled(formFieldsets);
  addDisabled(mapFilterSelects); //  к селектам карты добавил disabled

  // удаление disabled fieldset
  const removeAddDisabled = function (arr) {
    arr.forEach((item) => {
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

  // если был клик левой кнопки мыши на клавную метку
  const onMapPinMainMousedown = function (evt) {
    if (evt.which === LEFT_KEY_MOUSE_CODE) { // было evt.which
      window.card.map.classList.remove(`map--faded`); // карта становится активной
      window.backend.load(window.filter.filterPin, window.error.showError); // делаем запрос для заполнения данных для метки

      removeAdFormDisabled(form); // форма становится активной
      removeformFieldsetsDisabled(); // удаляется где есть disabled в форме
      window.form.checkRoomAndGuest(); // запускается проверка по гостям
      window.form.onTypeChange(); // запускаемся проверка по типу жилья
      window.form.setTimeinAndTimeout(); // запускается проверка по въеду и выезду
      mapPinMain.removeEventListener(`mousedown`, onMapPinMainMousedown); // удаляем обработчик на клик и кнопку на главную метку
      mapPinMain.removeEventListener(`keydown`, onMapPinMainKeydown); // удаляем обработчик на кнопку,
    }
  };

  // добавление обработчика на главную метку
  if (window.card.map.classList.contains(`map--faded`)) {
    mapPinMain.addEventListener(`mousedown`, onMapPinMainMousedown);
  }

  // вызываем все теже функции что и при клике на главную метку
  const onMapPinMainKeydown = function (evt) {
    if (evt.code === `Enter`) {
      window.card.map.classList.remove(`map--faded`);
    }
    removeAdFormDisabled(form);
    removeformFieldsetsDisabled();
    window.form.checkRoomAndGuest();
    window.form.onTypeChange();
    window.form.setTimeinAndTimeout();
    mapPinMain.removeEventListener(`keydown`, onMapPinMainKeydown); // удаляем обработчик на кнопку,
    mapPinMain.removeEventListener(`mousedown`, onMapPinMainMousedown); // удаляем обработчик на клик и кнопку на главную метку
  };
  if (window.card.map.classList.contains(`map--faded`)) {
    mapPinMain.addEventListener(`keydown`, onMapPinMainKeydown);
  }


  window.main = {
    addMapFaded,
    addAdFormDisabled,
    mapFilter,
    mapPinMain,
    onMapPinMainMousedown,
    addDisabled,
    formFieldsets,
    mapFilterSelects,
    LEFT_KEY_MOUSE_CODE,
    removeAddDisabled,
  };
})();
