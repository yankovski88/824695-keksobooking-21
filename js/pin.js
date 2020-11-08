'use strict';
(function () {


  const MAX_PIN = 5;

  const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`); // нашли шаблон по pin

  const createPin = function (objData) { // по этому макету создается метка
    if (objData.offer) { // если есть описание offer,  то рисуем метки.

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
        // функция удаления всех активных меток
        const removeMapPinActive = function () {
          mapItemPins.forEach((item) => { // перебираем все метки
            if (item.classList.contains(`map__pin--active`)) { // если находим активную метку
              item.classList.remove(`map__pin--active`); // то удаляем в ней класс активности
            }
          });
        };
        // функция по установке активной метки
        const setMapPinActive = function () {
          target.classList.add(`map__pin--active`); // добавление к метке класа актив
        };
        removeMapPinActive(); // удаление активной метки
        setMapPinActive(); // установка активной метки


        // код по открытию карточки квартир
        if ((target.classList.contains(`map__pin`)) && (!target.classList.contains(`map__pin--main`))) { // делаем проверку или это не главная метка
          if (window.card.map.querySelector(`.map__card`)) { // если наша карточка находится в map это означает, что она открыта
            window.card.map.removeChild(window.card.map.querySelector(`.map__card`)); // и удаляем ее
            removeMapPinActive();
            setMapPinActive();
            window.card.renderCard(window.card.createCard(objData), window.card.mapFiltersContainer); // если был клик по метке, то он записывается в target и создаем карточку с того же объекта что и метку
          } else {
            removeMapPinActive();
            setMapPinActive();
            window.card.renderCard(window.card.createCard(objData), window.card.mapFiltersContainer); // если был клик по метке, то он записывается в target и создаем карточку с того же объекта что и метку
          }
        }


        const popupClose = document.querySelector(`.popup__close`);
        const mapCard = window.card.map.querySelector(`.map__card`);
        // удаление карточки
        const removeChildMapCard = function () {
          window.card.map.removeChild(mapCard);
        };
        const onPopupCloseClick = function () {
          removeChildMapCard(); // удаление карточки
          removeMapPinActive(); // удаление активной метки
        };
        popupClose.addEventListener(`click`, onPopupCloseClick);

        const onPopupCloseEnterPress = function () {
          if (evt.target.code === window.card.KEY_CODE_ENTER) {
            removeChildMapCard(); // удаление карточки
            removeMapPinActive(); // удаление активной метки
          }
        };
        popupClose.addEventListener(`keydown`, onPopupCloseEnterPress); // думаю эти колбеки можно не удалять т.к.
        // если удалять то сробатывает область видимости
      });

      return pinTemplate; // вернули метку
    }
  };

  window.pin = {
    MAX_PIN,
    createPin,
  };


})();

