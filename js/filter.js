"use strict";
(function () {
  const delPin = function () {
    const mapPinsHtml = document.querySelector(`.map__pins`); // место куда будут вставлятся pinы
    // удаление всех меток кроме главной
    const mapPins = mapPinsHtml.querySelectorAll(`.map__pin`); // найти все метки
    for (let i = 0; i < mapPins.length; i++) { // перебрать все метки
      if (!mapPins[i].classList.contains(`map__pin--main`)) { // все метки которой нет главной
        mapPins[i].remove(); // удалить все метки кроме главной
      }
    }
  };


  // удаление карточки если она открыта
  const delCard = function () {
    const map = document.querySelector(`.map`); // нашел место где отображаются карточки
    if (map.querySelector(`.map__card`)) { // если карточка открыта
      const mapCards = document.querySelector(`.map__card`); // то находим карточку
      mapCards.remove(); // удаляем карточку т.к. условие при клике любого фильтра удаляем карточку
    }
  };



  const filterPin = function (arr) {
    let copyDataFlats = []; // скопировали запрос по массиву, чтобы не делать каждый раз запрос
      copyDataFlats = arr;


    let flatName = `any`; // будет значение которое выбрал пользователь по квартире
    let flatPrice = `any`; // будет значение которое выбрал пользователь по цене
    let flatRoom = `any`; // будет значение которое выбрал пользователь по цене
    let flatGuest = `any`; // будет значение которое выбрал пользователь по цене


    // функция наименования перменной по типу жилья
    // const onTypeChangeFilter = function () {
    //   flatName = housingType.value;
    // };

    let arrTypes = []; // создали массив с выборкой типа жилья выбраного пользователем
    // делаем отслеживание кликов на типе квартир
    const housingType = document.querySelector(`#housing-type`); // находим поле с фильтром по типу жилья
    // следим за фильтрами если есть зименения то перписываем value фильтра
    housingType.addEventListener(`change`, function () { // после изменения поля тип
      delPin();
      flatName = housingType.value;
    });
    const housingPrice = document.querySelector(`#housing-price`); // находим поле с ценой
    housingPrice.addEventListener(`change`, function () {
      delPin();
      flatPrice = housingPrice.value;
    });
    const housingRoom = document.querySelector(`#housing-rooms`); // находим поле с ценой
    housingRoom.addEventListener(`change`, function () {
      delPin();
      flatRoom = housingRoom.value;
    });
    const housingGuest = document.querySelector(`#housing-guests`); // находим поле с ценой
    housingGuest.addEventListener(`change`, function () {
      delPin();
      flatGuest = housingGuest.value;
    });


    // удаление карточки если она была открыта
    const mapFilters = document.querySelector(`.map__filters`); // выбрал все фильтры
    mapFilters.addEventListener(`change`, function () { // если в каждом фильтре есть изменения
      delCard(); // вставили функцию удаления карточки

      // функция по фильтру для типа квартиры
      // const copyDataFlats = window.renderNewPin.dataFlats.slice(); // скопировали запрос по массиву, чтобы не делать каждый раз запрос
//       let copyDataFlats = []; // скопировали запрос по массиву, чтобы не делать каждый раз запрос
//
//       const onLoadNewPin = function (arr) {
//         copyDataFlats = arr
//       };
//       window.backend.load(onLoadNewPin, window.error.onError); // делаем запрос для заполнения данных для метки
// console.log(copyDataFlats);
      const getTypeFlats = function (copyDataFlats, flatName) {
        const filterTypeFlats = copyDataFlats.filter(function (copyDataFlats) { //фильтр. copyDataFlats - сортируем этот фильтр. copyDataFlats это item типа [q, w] item = q и т.д.
          if (copyDataFlats.offer.type === flatName) { // заходим в каждую строку объекта тип и если он равен значению пользователя то
            return copyDataFlats.offer.type === flatName; //  возвращаем все объекты в которых нашли схожесть
          }
          else if (flatName === `any`) { // если выбрали все  то
            return copyDataFlats.offer.type; // возвращаем все
          }
        });
        return filterTypeFlats;
      };

      const getFilterPriceFlats = function (copyDataFlats, flatPrice) {
        const filterPriceFlats = copyDataFlats.filter(function (copyDataFlats) {
          const mapPrice = {
            any: `any`,
            middleMin: 10000,
            middleMax: 50000,
            low: 10000,
            high: 50000,
          };
          if (flatPrice === `middle`) {
            if (copyDataFlats.offer.price >= mapPrice.middleMin && copyDataFlats.offer.price < mapPrice.middleMax) {
              return copyDataFlats.offer.price >= mapPrice.middleMin && copyDataFlats.offer.price < mapPrice.middleMax;
            }
          }
          if (flatPrice === `low`) {
            return copyDataFlats.offer.price < mapPrice.low;
          }
          if (flatPrice === `high`) {
            return copyDataFlats.offer.price >= mapPrice.high;
          }
          if (flatPrice === `any`) {
            return copyDataFlats.offer.price;
          }
        });

        return filterPriceFlats;
      };

      const filterRoomFlats = copyDataFlats.filter(function (copyDataFlats) {
        if (flatRoom !== `any`) {
          const numberFlatRoom = parseInt(flatRoom);
          return copyDataFlats.offer.rooms === numberFlatRoom;

        } else {
          return copyDataFlats.offer.rooms;
        }
      });

      const filterGuestFlats = copyDataFlats.filter(function (copyDataFlats) {
        if (flatGuest !== `any`) {
          const numberFlatGuest = parseInt(flatGuest);
          return copyDataFlats.offer.guests === numberFlatGuest;
        } else {
          return copyDataFlats.offer.guests;
        }
      });

// функция воозращает массив если было выбрано преимущество ножно Html Элемента
      const getArrCheckedFeature = function (elementHtml, elementChecked) {
        const filterFeatures = copyDataFlats.filter(function (copyDataFlats) {
            if (elementHtml.checked) {
              for (let i = 0; i < copyDataFlats.offer.features.length; i++) {
                if (elementChecked === copyDataFlats.offer.features[i]) {
                  return copyDataFlats.offer.features[i];
                }
              }
            }
          },
        );
        return filterFeatures;
      };


      const totalFilterFlats = getTypeFlats(copyDataFlats, flatName).concat(getFilterPriceFlats(copyDataFlats, flatPrice).concat(filterRoomFlats).concat(filterGuestFlats)); // создали обдщий массив

      const uniqueTotalFilterFlats = totalFilterFlats.filter(function (item, index) { // удалили повторяющие квартиры друг с другом в фильтррах
        return totalFilterFlats.indexOf(item) === index;
      });

      const sortUniqueTotalFilterFlats = uniqueTotalFilterFlats.filter(function (item) {
        if (flatName !== 'any' && item.offer.type !== flatName) {
          return false;
        }


        const mapPrice = {
          any: `any`,
          middleMin: 10000,
          middleMax: 50000,
          low: 10000,
          high: 50000,
        };

        if (flatPrice === `middle`) {

          if (flatPrice !== `any` && item.offer.price < mapPrice.middleMin) {
            return false;
          } // не получилось соединить эти 2 условия. Не знаю почему.
          if (flatPrice !== `any` && item.offer.price >= mapPrice.middleMax) {
            return false;
          }
        }
        if (flatPrice === `low`) {
          if (flatPrice !== 'any' && item.offer.price > mapPrice.low) {
            return false;
          }
        }
        if (flatPrice === `high`) {
          if (flatPrice !== 'any' && item.offer.price <= mapPrice.high) {
            return false;
          }
        }

        if (flatRoom !== 'any' && item.offer.rooms !== parseInt(flatRoom)) {
          return false;
        }

        if (flatGuest !== 'any' && item.offer.guests !== parseInt(flatGuest)) {
          return false;
        }

        return true;
      });

// код возвращает все приимущества что выбрал пользователь
      const allFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
      const featuresNodeList = document.querySelectorAll(`.map__checkbox`);
      const activeFlatFeatures = [];
      for (let j = 0; j < featuresNodeList.length; j++) {
        if (featuresNodeList[j].checked) {
          activeFlatFeatures.push(allFeatures[j]);
        }
      }


      const sortFeatures = sortUniqueTotalFilterFlats.filter(function (item) {
        let countF = 0;
        for (let r = 0; r < activeFlatFeatures.length; r++) {
          for (let i = 0; i < item.offer.features.length; i++) {
            if (activeFlatFeatures[r] === item.offer.features[i]) {
              countF++;
            }
          }
        }
        if (countF !== activeFlatFeatures.length) {
          return false;
        }
        return true;
      });

      // функция которая отрисовывает pin после изменения фильтра
      const renderNewPin = function (newPins) {
        delPin();
        if (newPins.length < window.pin.MAX_PIN) {
          for (let i = 0; i < newPins.length; i++) { // перебрать все данные которые получены и перенесены в переменную
            const fragmentPin = window.pin.createPin(newPins[i]); // создаем метку через функцию выше
            fragmentPin.setAttribute(`data-index`, i); // устанавливаем меткам индекс
            window.renderPinStart.fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
            window.renderPinStart.renderPin(); // прорисовываем метки
          }
        } else if (newPins.length > window.pin.MAX_PIN) {
          for (let i = 0; i < window.pin.MAX_PIN; i++) { // перебрать все данные которые получены и перенесены в переменную
            const fragmentPin = window.pin.createPin(newPins[i]); // создаем метку через функцию выше
            fragmentPin.setAttribute(`data-index`, i); // устанавливаем меткам индекс
            window.renderPinStart.fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
            window.renderPinStart.renderPin(); // прорисовываем метки
          }
        }
      };
      renderNewPin(sortFeatures); // вызвали функцию для отрисовки новых меток после изменения фильтра
    });
  };

  window.backend.load(filterPin, window.error.onError); // делаем запрос для заполнения данных для метки
})();
