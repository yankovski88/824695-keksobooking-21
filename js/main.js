"use strict";
(function () {
  const onMapClick = function (evt) {
    let target = evt.target; // цель по которой был клик
    if (target.tagName === `IMG`) { // если таргет был с тегом IMG
      target = target.parentNode; // то переопределяем таргет на его родителя, с помощью target.parentNode
    }


    if ((target.classList.contains(`map__pin`)) && (!target.classList.contains(`map__pin--main`))) {// делаем проверку или это не главная метка
      if (window.card.map.querySelector(`.map__card`)) { // если наша карточка находится в map это означает, что она открыта
        window.card.map.removeChild(window.card.map.querySelector(`.map__card`)); // и удаляем ее
      } else {
        //иначе создаем новую карточку
        // window.card.renderCard(window.card.createCard(window.data.offers[target.dataset.index]), window.card.mapFiltersContainer);
        window.card.renderCard(window.card.createCard(window.card.onLoad()), window.card.mapFiltersContainer);

        // [target.dataset.index] устанавливаем в карточки индекс, пока не знаю для чего
        console.log(target.dataset.index);
        window.card.renderCard();

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
      }
    }
  };
  window.card.map.addEventListener(`click`, onMapClick); // думаю этот колбек надо удалять


  const onMapEscapePress = function (evt) {
    if ((evt.key === `Escape`) && (window.card.map.querySelector(`.map__card`))) {
      window.card.map.removeChild(window.card.map.querySelector(`.map__card`));
    }
  };
  window.card.map.addEventListener(`keydown`, onMapEscapePress); // также мне кажется нужно удалять колбек


  const mapPinMain = document.querySelector(`.map__pin--main`);
  const adFormFieldsets = document.querySelectorAll(`fieldset`);
  const mapFilter = document.querySelector(`.map__filters`);

  const addMapFaded = function (item) {
    item.classList.add(`map--faded`);
  };
  addMapFaded(window.card.map); // дизэйбл карты

  const addDisabled = function (arrItems) {
    arrItems.forEach((item) => {
      item.setAttribute(`disabled`, `true`);
    });
  };
  addDisabled(adFormFieldsets);

  const addAdFormDisabled = function (item) {
    item.classList.add(`ad-form--disabled`);
  };
  // addAdFormDisabled(); // дизэйбл формы


  const removeAdFormDisabled = function (item) {
    item.classList.remove(`ad-form--disabled`);
  };

  const removeAdFormFieldsetsDisabled = function () {
    adFormFieldsets.forEach((item) => {
      item.removeAttribute(`disabled`);
    });
  };
  const form = document.querySelector(`.ad-form`);
  const onMapPinMainMousedown = function (evt) {
    if (evt.which === 1) {
      window.card.map.classList.remove(`map--faded`);
    }
    removeAdFormDisabled(form);
    removeAdFormFieldsetsDisabled();
    window.pin.renderPin();
    window.form.checkRoomAndGuest();
    window.form.onTypeChange();
    window.form.setTimeinAndTimeout();
    mapPinMain.removeEventListener(`mousedown`, onMapPinMainMousedown);

  };
  if (window.card.map.classList.contains(`map--faded`)) {
    mapPinMain.addEventListener(`mousedown`, onMapPinMainMousedown);
  } else {
    mapPinMain.removeEventListener(`mousedown`, onMapPinMainMousedown);
  }

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
    // теперь ничего не будет вызываться когда вызввано
  };
  if (window.card.map.classList.contains(`map--faded`)) {
    mapPinMain.addEventListener(`keydown`, onMapPinMainKeydown);
  } else {
    mapPinMain.removeEventListener(`keydown`, onMapPinMainKeydown);
  }


  window.main = {
    addMapFaded,
    addAdFormDisabled,
    mapFilter,
    mapPinMain,
    onMapPinMainMousedown
  };
})();
