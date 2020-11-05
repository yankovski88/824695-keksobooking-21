'use strict';
// (function () {

// + прорисовка карты объявления
const card = document.querySelector(`#card`).content.querySelector(`.map__card`); // нашел шаблон и подключился к нему
const mapFiltersContainer = document.querySelector(`.map__filters-container`); // перед каким html элементов вставка

// создание карточки заполнение всех полей по шаблону
const createCard = function (obj) { // помещаем в функцию объект с которого возьмем данные
  const cardTemplate = card.cloneNode(true); // клонируем шаблон т.к. много объявлений и без клона не вставить в html
  if (obj.offer) { // если есть описание offer
    if (obj.offer.title) { // заходим в поле объекта заголовок
      cardTemplate.querySelector(`.popup__title`).textContent = obj.offer.title; // переименовываем заголовок на заголовок с объекта
    } else {
      cardTemplate.querySelector(`.popup__title`).classList.add(`hidden`); // если нет заголовка, то скрываем эту строку карточки
    }
    if (obj.offer.address[0] && obj.offer.address[1]) { // если есть текст адреса то вставляем
      cardTemplate.querySelector(`.popup__text--address`).textContent = `${window.util.getFirstItemOfString(obj.offer.address)} Tōkyō-to, Chiyoda-ku, Ichibanchō, ${window.util.getLastItemOfString(obj.offer.address)}`;
    } else {
      cardTemplate.querySelector(`.popup__text--address`).classList.add(`hidden`);
    }
    if (obj.offer.price) {
      cardTemplate.querySelector(`.popup__text--price`).textContent = obj.offer.price; // заполняем поле цены
    } else {
      cardTemplate.querySelector(`.popup__text--price`).classList.add(`hidden`);
    }
    if (obj.offer.type) {
      cardTemplate.querySelector(`.popup__type`).textContent = obj.offer.type;
    } else {
      cardTemplate.querySelector(`.popup__type`).classList.add(`hidden`);
    }
    if (obj.offer.rooms && obj.offer.guests) {
      cardTemplate.querySelector(`.popup__text--capacity`).textContent = `${obj.offer.rooms} комнатa(ы) для ${obj.offer.guests} гостя(ей)`;
    } else {
      cardTemplate.querySelector(`.popup__text--capacity`).classList.add(`hidden`);
    }
    if (obj.offer.checkin && obj.offer.checkout) {
      cardTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
    } else {
      cardTemplate.querySelector(`.popup__text--time`).classList.add(`hidden`);
    }
  } else {
    obj.remove(); // иначе удаляем объект с объявлением. мысль если нет объекта, то он и не будет показываться
  }

  const cardTemplateLis = cardTemplate.querySelector(`.popup__features`).querySelectorAll(`li`); // находим все li теги с плюсами квартиры
  const classNames = window.util.getArrClassNameHtml(cardTemplateLis); // получаем все названия классов массива li
  const copyClassNames = classNames.slice(); // копируем полученный массив классов по приимуществам квартиры
  const htmlOfferFeatures = window.util.getArrOfTextBeforeDash(copyClassNames); // получили массив плюсов квартиры
  window.util.comparisonArrsAndAddClassNameHidden(obj.offer.features, htmlOfferFeatures, cardTemplateLis); // сравниваем 2 массива плюсов что есть с наличием по факту и добавляем название в html Элемент

  if (obj.offer.description) {
    cardTemplate.querySelector(`.popup__description`).textContent = `${obj.offer.description}`;
  } else {
    cardTemplate.querySelector(`.popup__description`).classList.add(`hidden`);
  }

  const popupPhoto = cardTemplate.querySelector(`.popup__photos`); // находим в карточке обертку тега Img в которую будем все вставлять
  const popupPhotoImg = cardTemplate.querySelector(`.popup__photos`).querySelector(`img`); // находим сам тег img

  if (obj.offer.photos) { // если фото есть
    for (let i = 0; i < obj.offer.photos.length; i++) { // перебираем фото
      const popupPhotoImgClone = popupPhotoImg.cloneNode(); // клонируем тег img для вставки фото
      popupPhotoImgClone.src = obj.offer.photos[i]; // в тег img вставляем ссылку
      popupPhotoImgClone.textContent = `clone`; // между тегом img пишем clone
      popupPhoto.appendChild(popupPhotoImgClone); // добавляем в обертку все теги img
    }
    popupPhoto.removeChild(popupPhotoImg); // удаляем  шаблонное фото
  } else {
    popupPhoto.classList.add(`hidden`); // если нет фото то скрываем поле
  }

  if (obj.author.avatar) {
    cardTemplate.querySelector(`.popup__avatar`).src = obj.author.avatar; // добавляем аватар
  } else {
    cardTemplate.querySelector(`.popup__avatar`).classList.add(`hidden`);
  }
  return cardTemplate; // возвращаем полностью заполненую карточку по шаблону
};

const map = document.querySelector(`.map`); // находим место в которое надо вставить карточку

// функция по вставке элемента перед другим элементом
const renderCard = function (fragmentCardItem, mapFiltersContainerItem) {
  map.insertBefore(fragmentCardItem, mapFiltersContainerItem);

  // map это родитель для нового элемента
  // insertBefore(newElement, referenceElement)
  // newElement это элемент для вставки
  // referenceElement элемент перед которым будет вставлен newElement
};

window.card = {
  createCard,
  mapFiltersContainer,
  card,
  renderCard,
  map,
};

// })();
