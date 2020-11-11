'use strict';

// + прорисовка карты объявления
const card = document.querySelector(`#card`).content.querySelector(`.map__card`); // нашел шаблон и подключился к нему
const mapFiltersContainer = document.querySelector(`.map__filters-container`); // перед каким html элементов вставка
const map = document.querySelector(`.map`); // находим место в которое надо вставить карточку

const addClassHidden = function (elementHtml) {
  elementHtml.classList.add(`hidden`);
};

const checkFieldOfObj = function (fieldOfObj, classNameOfFieldHtml) {
  if (fieldOfObj) {
    classNameOfFieldHtml.textContent = fieldOfObj;
  } else {
    addClassHidden(classNameOfFieldHtml);
  }
};

// создание карточки заполнение всех полей по шаблону
const createCard = function (objData) { // помещаем в функцию объект с которого возьмем данные
  const cardTemplate = card.cloneNode(true); // клонируем шаблон т.к. много объявлений и без клона не вставить в html
  if (objData && objData.offer) {
    const popupTitle = cardTemplate.querySelector(`.popup__title`);
    const popupTextAddress = cardTemplate.querySelector(`.popup__text--address`);
    const popupTextPrice = cardTemplate.querySelector(`.popup__text--price`);
    const popupType = cardTemplate.querySelector(`.popup__type`);
    const popupTextCapacity = cardTemplate.querySelector(`.popup__text--capacity`);
    const popupTextTime = cardTemplate.querySelector(`.popup__text--time`);

    checkFieldOfObj(objData.offer.title, popupTitle);
    checkFieldOfObj(objData.offer.address, popupTextAddress);
    checkFieldOfObj(objData.offer.price, popupTextPrice);
    checkFieldOfObj(objData.offer.type, popupType);

    if (objData.offer.rooms && objData.offer.guests) {
      const text = `${objData.offer.rooms} комнатa(ы) для ${objData.offer.guests} гостя(ей)`;
      checkFieldOfObj(text, popupTextCapacity);
    }

    if (objData.offer.checkin && objData.offer.checkout) {
      const text = `Заезд после ${objData.offer.checkin}, выезд до ${objData.offer.checkout}`;
      checkFieldOfObj(text, popupTextTime);
    }

    const cardTemplateLiTegs = cardTemplate.querySelector(`.popup__features`).querySelectorAll(`li`); // находим все li теги с плюсами квартиры
    const classNames = window.util.getArrClassNameHtml(cardTemplateLiTegs); // получаем все названия классов массива li
    const copyClassNames = classNames.map(function (item) {
      return item;
    }); // копируем полученный массив классов по приимуществам квартиры

    const htmlOfferFeatures = window.util.getArrOfTextBeforeDash(copyClassNames); // получили массив плюсов квартиры
    window.util.comparisonArrsAndAddClassNameHidden(objData.offer.features, htmlOfferFeatures, cardTemplateLiTegs); // сравниваем 2 массива плюсов что есть с наличием по факту и добавляем название в html Элемент

    if (objData.offer.description) {
      cardTemplate.querySelector(`.popup__description`).textContent = `${objData.offer.description}`;
    } else {
      cardTemplate.querySelector(`.popup__description`).classList.add(`hidden`);
    }

    const popupPhoto = cardTemplate.querySelector(`.popup__photos`); // находим в карточке обертку тега Img в которую будем все вставлять
    const popupPhotoImg = popupPhoto.querySelector(`img`); // находим сам тег img

    if (objData.offer.photos) { // если фото есть
      for (let i = 0; i < objData.offer.photos.length; i++) { // перебираем фото
        const popupPhotoImgClone = popupPhotoImg.cloneNode(); // клонируем тег img для вставки фото
        popupPhotoImgClone.src = objData.offer.photos[i]; // в тег img вставляем ссылку
        popupPhotoImgClone.textContent = `clone`; // между тегом img пишем clone
        popupPhoto.appendChild(popupPhotoImgClone); // добавляем в обертку все теги img
      }
      popupPhoto.removeChild(popupPhotoImg); // удаляем  шаблонное фото
    } else {
      popupPhoto.classList.add(`hidden`); // если нет фото то скрываем поле
    }

    if (objData.author.avatar) {
      cardTemplate.querySelector(`.popup__avatar`).src = objData.author.avatar; // добавляем аватар
    } else {
      cardTemplate.querySelector(`.popup__avatar`).classList.add(`hidden`);
    }
  }
  return cardTemplate; // возвращаем полностью заполненую карточку по шаблону
};

// функция по вставке элемента перед другим элементом
const renderCard = function (fragmentCardItem, mapFiltersContainerItem) {
  map.insertBefore(fragmentCardItem, mapFiltersContainerItem); // map это родитель для нового элемента, fragmentCardItem это элемент для вставки, mapFiltersContainerItem перед этим элементом вставится элемент
};

window.card = {
  createCard,
  mapFiltersContainer,
  card,
  renderCard,
  map,
};
