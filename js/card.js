'use strict';
(function () {

  const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);

  const createCard = function (obj) {
    const cardTemplate = card.cloneNode(true);
    if (obj.offer.title) {
      cardTemplate.querySelector(`.popup__title`).textContent = obj.offer.title;
    } else {
      cardTemplate.querySelector(`.popup__title`).classList.add(`hidden`);
    }
    if (obj.offer.address[0] && obj.offer.address[1]) {
      cardTemplate.querySelector(`.popup__text--address`).textContent = `${window.util.getFirstItemOfString(obj.offer.address)} Tōkyō-to, Chiyoda-ku, Ichibanchō, ${window.util.getLastItemOfString(obj.offer.address)}`;
    } else {
      cardTemplate.querySelector(`.popup__text--address`).classList.add(`hidden`);
    }
    if (obj.offer.price) {
      cardTemplate.querySelector(`.popup__text--price`).textContent = obj.offer.price;
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


    const cardTemplateLis = cardTemplate.querySelector(`.popup__features`).querySelectorAll(`li`);
    const classNames = window.util.getArrClassNameHtml(cardTemplateLis);
    const copyClassNames = classNames.slice();
    const htmlOfferFeatures = window.util.getArrOfTextBeforeDash(copyClassNames);
    window.util.comparisonArrsAndAddClassNameHidden(obj.offer.features, htmlOfferFeatures, cardTemplateLis);

    if (obj.offer.description) {
      cardTemplate.querySelector(`.popup__description`).textContent = `${obj.offer.description}`;
    } else {
      cardTemplate.querySelector(`.popup__description`).classList.add(`hidden`);
    }

    const popupPhoto = cardTemplate.querySelector(`.popup__photos`);
    const popupPhotoImg = cardTemplate.querySelector(`.popup__photos`).querySelector(`img`);

    if (obj.offer.photos) {
      for (let i = 0; i < obj.offer.photos.length; i++) {
        const popupPhotoImgClone = popupPhotoImg.cloneNode();
        popupPhotoImgClone.src = obj.offer.photos[i];
        popupPhotoImgClone.textContent = `clone`;
        popupPhoto.appendChild(popupPhotoImgClone);
      }
      popupPhoto.removeChild(popupPhotoImg);
    } else {
      popupPhoto.classList.add(`hidden`);
    }

    if (obj.author.avatar) {
      cardTemplate.querySelector(`.popup__avatar`).src = obj.author.avatar;
    } else {
      cardTemplate.querySelector(`.popup__avatar`).classList.add(`hidden`);
    }
    return cardTemplate;
  };

  const fragmentCard = document.createDocumentFragment();
  for (let i = 0; i < window.data.offers.length; i++) {
    fragmentCard.appendChild(createCard(window.data.offers[i]));
  }

  const map = document.querySelector(`.map`);


  const renderCard = function (fragmentCardItem, mapFiltersContainerItem) {
    map.insertBefore(fragmentCardItem, mapFiltersContainerItem);
  };

  window.card = {
    createCard,
    mapFiltersContainer,
    card,
    fragmentCard,
    renderCard,
    map
  };
})();
