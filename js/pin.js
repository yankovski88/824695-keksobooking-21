'use strict';

const MAX_PIN = 5;
const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`); // нашли шаблон по pin
let itemPins; // новый массив меток после изменения фильтра

// функция удаления всех активных меток
const removePinActive = function (nodePins) {
  nodePins.forEach((item) => { // перебираем все метки
    if (item.classList.contains(`map__pin--active`)) { // если находим активную метку
      item.classList.remove(`map__pin--active`); // то удаляем в ней класс активности
    }
  });
};

const createPin = function (objData) { // по этому макету создается метка
  const pinTemplate = pin.cloneNode(true); // создаем клоны метки
  const img = pinTemplate.querySelector(`img`); // создал константу чтобы 2 раза не искать
  img.src = objData.author.avatar; // вставили ссылку на аватар
  img.alt = objData.offer.title; // вставили заголовок
  pinTemplate.style.left = `${objData.location.x}px`; // вставили координаты
  pinTemplate.style.top = `${objData.location.y}px`;

  pinTemplate.addEventListener(`click`, (evt) => { // отслеживаем клик по каждой созданой метке
    let target = evt.target; // цель по которой был клик
    if (target.tagName === `IMG`) { // если таргет был с тегом IMG
      target = target.parentNode; // то переопределяем таргет на его родителя, с помощью target.parentNode
    }

    // код установки активной метки
    const mapItemPins = document.querySelectorAll(`.map__pin`); // находим все метки после рендера
    itemPins = mapItemPins;

    // функция по установке активной метки
    const setMapPinActive = function () {
      target.classList.add(`map__pin--active`); // добавление к метке класа актив
    };
    removePinActive(itemPins); // удаление активной метки
    setMapPinActive(); // установка активной метки

    const openCard = function () {
      removePinActive(itemPins);
      setMapPinActive();
      window.card.renderCard(window.card.createCard(objData), window.card.mapFiltersContainer); // если был клик по метке, то он записывается в target и создаем карточку с того же объекта что и метку
    };
    // код по открытию карточки квартир
    if ((target.classList.contains(`map__pin`)) && (!target.classList.contains(`map__pin--main`))) { // делаем проверку или это не главная метка
      if (window.card.map.querySelector(`.map__card`)) { // если наша карточка находится в map это означает, что она открыта
        window.card.map.removeChild(window.card.map.querySelector(`.map__card`)); // и удаляем ее
      }
      openCard();
    }

    const popupClose = window.card.map.querySelector(`.popup__close`);
    const mapCard = window.card.map.querySelector(`.map__card`);
    // удаление карточки
    const removeChildMapCard = function () {
      window.card.map.removeChild(mapCard);
    };
    const onPopupCloseClick = function () {
      removeChildMapCard(); // удаление карточки
      removePinActive(itemPins); // удаление активной метки
    };
    popupClose.addEventListener(`click`, onPopupCloseClick);

    const onPopupCloseEnterPress = function () {
      if (evt.target.code === window.form.KEY_CODE_ENTER) {
        removeChildMapCard(); // удаление карточки
        removePinActive(itemPins); // удаление активной метки
      }
    };
    popupClose.addEventListener(`keydown`, onPopupCloseEnterPress); // думаю эти колбеки можно не удалять т.к.
    // если удалять то сробатывает область видимости
  });
  return pinTemplate; // вернули метку
};

// функция по удалению активной метки через esc
const onMapEscapePressRemovePinActive = function (evt) {
  if ((evt.keyCode === window.form.KEY_CODE_ESC) && (window.card.map.querySelector(`.map__pin--active`))) {
    removePinActive(itemPins);
  }
};
window.card.map.addEventListener(`keydown`, onMapEscapePressRemovePinActive); // отслеживаем нажатие esc (также мне кажется нужно удалять колбек)

// удаление меток если было изменения фильтра
const delPin = function () {
  // удаление всех меток кроме главной
  const arrMapPins = window.form.mapPins.querySelectorAll(`.map__pin`); // найти все метки
  arrMapPins.forEach(function (item) { // перебрать все метки
    if (!item.classList.contains(`map__pin--main`)) { // все метки которой нет главной
      item.remove(); // удалить все метки кроме главной
    }
  });
};

const renderPin = function (fragment) { // отрисовать метки
  window.form.mapPins.appendChild(fragment); // одним фрагментом Pin вствили в html
};

// функция которая отрисовывает pin после изменения фильтра
const renderNewPin = function (newPins) {
  const fragment = document.createDocumentFragment(); // создаем фрагмент т.к. без него не вставим

  const pinsWithOffer = newPins.filter(function (item) { // фильтр который возвращает все булевое значение всех объектов в котороых етсь поле offer
    return !!item.offer;
  });
  window.pin.delPin();
  const pinsCount = pinsWithOffer.length < window.pin.MAX_PIN ? pinsWithOffer.length : window.pin.MAX_PIN;
  for (let i = 0; i < pinsCount; i++) { // перебрать все данные которые получены и перенесены в переменную
    const fragmentPin = window.pin.createPin(pinsWithOffer[i]); // создаем метку через функцию выше
    fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
    window.pin.renderPin(fragment); // прорисовываем метки
  }
};

window.pin = {
  MAX_PIN,
  createPin,
  delPin,
  renderPin,
  renderNewPin,
};

