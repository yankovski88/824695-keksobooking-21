"use strict";
(function () {

  // при клике на метку открывается карточка
  const onMapClick = function (evt) {
    let target = evt.target; // цель по которой был клик
    if (target.tagName === `IMG`) { // если таргет был с тегом IMG
      target = target.parentNode; // то переопределяем таргет на его родителя, с помощью target.parentNode
    }


    if ((target.classList.contains(`map__pin`)) && (!target.classList.contains(`map__pin--main`))) { // делаем проверку или это не главная метка
      if (window.card.map.querySelector(`.map__card`)) { // если наша карточка находится в map это означает, что она открыта
        window.card.map.removeChild(window.card.map.querySelector(`.map__card`)); // и удаляем ее
      } else {
        // иначе создаем новую карточку
        // [target.dataset.index] устанавливаем в карточки индекс, пока не знаю для чего
        const onLoadCard = function (arr) {
          window.card.renderCard(window.card.createCard(arr[target.dataset.index]), window.card.mapFiltersContainer); // создаем карточку, перед определенным элементом html
          const popupClose = document.querySelector(`.popup__close`);
          const mapCard = window.card.map.querySelector(`.map__card`);
          const removeChildMapCard = function () {
            window.card.map.removeChild(mapCard);
          };
          const onPopupCloseClick = function () {
            removeChildMapCard();
          };
          popupClose.addEventListener(`click`, onPopupCloseClick);

          const onPopupCloseEnterPress = function () {
            if (evt.target.code === 13) {
              removeChildMapCard();
            }
          };
          popupClose.addEventListener(`keydown`, onPopupCloseEnterPress); // думаю эти колбеки можно не удалять т.к.
          // если удалять то сробатывает область видимости
        };
        window.backend.load(onLoadCard, window.pin.onError); // Я Так понимаю вызываю функцию чтобы она изначально прорисовала метки,
      }
    }
  };
  window.card.map.addEventListener(`click`, onMapClick); // отслеживаем клик по метке и запускаем функцию по открытию карточки (думаю этот колбек надо удалять)

  // функция по закрытию карточки через esc
  const onMapEscapePress = function (evt) {
    if ((evt.key === `Escape`) && (window.card.map.querySelector(`.map__card`))) {
      window.card.map.removeChild(window.card.map.querySelector(`.map__card`));
    }
  };
  window.card.map.addEventListener(`keydown`, onMapEscapePress); // отслеживаем нажатие esc (также мне кажется нужно удалять колбек)


  const mapPinMain = document.querySelector(`.map__pin--main`);
  const adFormFieldsets = document.querySelectorAll(`fieldset`);
  const mapFilter = document.querySelector(`.map__filters`);

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
  addDisabled(adFormFieldsets);

  // добавить ad-form--disabled
  const addAdFormDisabled = function (item) {
    item.classList.add(`ad-form--disabled`);
  };
  // addAdFormDisabled(); // дизэйбл формы

  // удаление ad-form--disabled
  const removeAdFormDisabled = function (item) {
    item.classList.remove(`ad-form--disabled`);
  };

  // удаление disabled
  const removeAdFormFieldsetsDisabled = function () {
    adFormFieldsets.forEach((item) => {
      item.removeAttribute(`disabled`);
    });
  };

  const form = document.querySelector(`.ad-form`);

  // если был клик левой кнопки мыши на клавную метку
  const onMapPinMainMousedown = function (evt) {
    if (evt.which === 1) {
      window.card.map.classList.remove(`map--faded`); // карта становится активной
    }
    removeAdFormDisabled(form); // форма становится активной
    removeAdFormFieldsetsDisabled(); // удаляется где есть disabled в форме
    window.pin.renderPin(); // рисуются метки
    window.form.checkRoomAndGuest(); // запускается проверка по гостям
    window.form.onTypeChange(); // запускаемся проверка по типу жилья
    window.form.setTimeinAndTimeout(); // запускается проверка по въеду и выезду
    mapPinMain.removeEventListener(`mousedown`, onMapPinMainMousedown); // удаляем обработчик на клик и кнопку на главную метку
    mapPinMain.removeEventListener(`keydown`, onMapPinMainKeydown); // удаляем обработчик на кнопку,
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
    removeAdFormFieldsetsDisabled();
    window.pin.renderPin();
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
  };
})();
