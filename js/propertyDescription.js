'use strict';

// + прорисовка карты объявления
const card = document.querySelector(`#card`).content.querySelector(`.map__card`); // нашел шаблон и подключился к нему
const mapFiltersContainer = document.querySelector(`.map__filters-container`); // перед каким html элементов вставка
const map = document.querySelector(`.map`); // находим место в которое надо вставить карточку

const hideElement = function (elementHtml) {
  elementHtml.classList.add(`hidden`);
};

const checkFieldOfObj = function (fieldOfObj, classNameOfFieldHtml) {
  if (fieldOfObj) {
    classNameOfFieldHtml.textContent = fieldOfObj;
  } else {
    hideElement(classNameOfFieldHtml);
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
    const popupDescription = cardTemplate.querySelector(`.popup__description`);

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

    const htmlOfferFeatures = window.util.getArrOfTextBeforeDash(classNames); // получили массив плюсов квартиры
    window.util.comparisonArrsAndAddClassNameHidden(objData.offer.features, htmlOfferFeatures, cardTemplateLiTegs); // сравниваем 2 массива плюсов что есть с наличием по факту и добавляем название в html Элемент

    checkFieldOfObj(objData.offer.description, popupDescription);

    const popupPhoto = cardTemplate.querySelector(`.popup__photos`); // находим в карточке обертку тега Img в которую будем все вставлять
    const popupPhotoImg = popupPhoto.querySelector(`img`); // находим сам тег img

    if (objData.offer.photos) { // если фото есть
      for (let i = 0; i < objData.offer.photos.length; i++) { // перебираем фото
        const popupPhotoImgClone = popupPhotoImg.cloneNode(); // клонируем тег img для вставки фото
        popupPhotoImgClone.src = objData.offer.photos[i]; // в тег img вставляем ссылку
        popupPhoto.appendChild(popupPhotoImgClone); // добавляем в обертку все теги img
      }
      popupPhoto.removeChild(popupPhotoImg); // удаляем  шаблонное фото
    } else {
      popupPhoto.removeChild(popupPhotoImg); // удаляем  поле img если нет фото
    }

    const popupAvatar = cardTemplate.querySelector(`.popup__avatar`);
    if (objData.author.avatar) {
      popupAvatar.src = objData.author.avatar; // добавляем аватар
    } else {
      hideElement(popupAvatar);
    }
  }
  return cardTemplate; // возвращаем полностью заполненую карточку по шаблону
};

// функция по вставке элемента перед другим элементом
const renderCard = function (fragmentCardItem, mapFiltersContainerItem) {
  map.insertBefore(fragmentCardItem, mapFiltersContainerItem); // map это родитель для нового элемента, fragmentCardItem это элемент для вставки, mapFiltersContainerItem перед этим элементом вставится элемент
};

// функция которая проверяет или карточка открыта, если открыта и есть измения фильтра то карточка закрывается
const delCard = function () {
  const mapCardItem = window.propertyDescription.map.querySelector(`.map__card`);
  if (mapCardItem) { // если карточка открыта
    mapCardItem.remove(); // удаляем карточку т.к. условие при клике любого фильтра удаляем карточку
  }
};

window.propertyDescription = {
  createCard,
  mapFiltersContainer,
  renderCard,
  map,
  delCard,
};
