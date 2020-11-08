'use strict';
(function () {


  const MAX_PIN = 5;

  const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`); // нашли шаблон по pin

  const createPin = function (obj) { // по этому макету создается метка
    const pinTemplate = pin.cloneNode(true); // создаем клоны метки
    const img = pinTemplate.querySelector(`img`); // создал константу чтобы 2 раза не искать
    img.src = obj.author.avatar; // вставили ссылку на аватар
    img.alt = obj.offer.title; // вставили заголовок
    pinTemplate.style.left = `${obj.location.x}px`; // вставили координаты
    pinTemplate.style.top = `${obj.location.y}px`;

    return pinTemplate; // вернули метку
  };

  window.pin = {
    pin,
    MAX_PIN,
    createPin,
  };


})();


// // TODO: непонятно что за obj. Стоит переименовать
// const createPin = function (obj) { // по этому макету создается метка
//   const pinTemplate = pin.cloneNode(true); // создаем клоны метки
//   // TODO: стоит сохранить элемент в отдельную переменную, чтобы не искать ее два раза
//   const img = pinTemplate.querySelector(img);
//   img.src = obj.author.avatar; // вставили ссылку на аватар
//   img.alt = obj.offer.title; // вставили заголовок
//   pinTemplate.style.left = ${obj.location.x}px; // вставили координаты
//   pinTemplate.style.top = ${obj.location.y}px;
//
//   pinTemplate.addEventListener("click", () => {
//     // setPinActive(img);
//     window.card.renderCard(window.card.createCard(obj), window.card.mapFiltersContainer);
//   });
//
//   return pinTemplate; // вернули метку
// };
//
// window.pin = {
//   // TODO: неиспользуемая переменная
//   pin,
//   MAX_PIN,
//   createPin,
// };
