"use strict";
(function () {
  // удаление меток если было изменения фильтра
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


  // функция которая проверяет или карточка открыта, если открыта и есть измения фильтра то карточка закрывается
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

      const filterTypeFlats = copyDataFlats.filter(function (item) { // фильтр. copyDataFlats - сортируем этот фильтр. copyDataFlats это item типа [q, w] item = q и т.д.
        if (item.offer.type === flatName) { // заходим в каждую строку объекта тип и если он равен значению пользователя то
          return item.offer.type === flatName; //  возвращаем все объекты в которых нашли схожесть
        } else if (flatName === `any`) { // если выбрали все  то
          return item.offer.type; // возвращаем все
        } else {
          return false;
        }
      });

      // const getFilterPriceFlats = function (copyDataFlats, flatPrice) {
      const filterPriceFlats = copyDataFlats.filter(function (item) {
        const mapPrice = {
          any: `any`,
          middleMin: 10000,
          middleMax: 50000,
          low: 10000,
          high: 50000,
        };
        if (flatPrice === `middle`) {
          if (item.offer.price >= mapPrice.middleMin && item.offer.price < mapPrice.middleMax) {
            return item.offer.price >= mapPrice.middleMin && item.offer.price < mapPrice.middleMax;
          }
        }
        if (flatPrice === `low`) {
          return item.offer.price < mapPrice.low;
        }
        if (flatPrice === `high`) {
          return item.offer.price >= mapPrice.high;
        }
        if (flatPrice === `any`) {
          return item.offer.price;
        }
        return false;
      });

      //   return filterPriceFlats;
      // };

      const filterRoomFlats = copyDataFlats.filter(function (item) {
        if (flatRoom !== `any`) {
          const numberFlatRoom = parseInt(flatRoom, 10);
          return item.offer.rooms === numberFlatRoom;

        } else {
          return item.offer.rooms;
        }
      });

      const filterGuestFlats = copyDataFlats.filter(function (item) {
        if (flatGuest !== `any`) {
          const numberFlatGuest = parseInt(flatGuest, 10);
          return item.offer.guests === numberFlatGuest;
        } else {
          return item.offer.guests;
        }
      });

      // // функция воозращает массив если было выбрано преимущество ножно Html Элемента
      //       const getArrCheckedFeature = function (elementHtml, elementChecked) {
      //         const filterFeatures = copyDataFlats.filter(function (copyDataFlats) {
      //             if (elementHtml.checked) {
      //               for (let i = 0; i < copyDataFlats.offer.features.length; i++) {
      //                 if (elementChecked === copyDataFlats.offer.features[i]) {
      //                   return copyDataFlats.offer.features[i];
      //                 }
      //               }
      //             }
      //           },
      //         );
      //         return filterFeatures;
      //       };


      const totalFilterFlats = filterTypeFlats.concat(filterPriceFlats).concat(filterRoomFlats).concat(filterGuestFlats); // создали обдщий массив по выбраным фильтрам кроме features

      const uniqueTotalFilterFlats = totalFilterFlats.filter(function (item, index) { // удалили повторяющие квартиры друг с другом в фильтррах
        return totalFilterFlats.indexOf(item) === index; // пока не понял этой записи
      });

      // сортируем уникальный массив, но походу первая часть сортировки лишняя
      const sortUniqueTotalFilterFlats = uniqueTotalFilterFlats.filter(function (item) {
        if (flatName !== `any` && item.offer.type !== flatName) {
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
          if (flatPrice !== `any` && item.offer.price > mapPrice.low) {
            return false;
          }
        }
        if (flatPrice === `high`) {
          if (flatPrice !== `any` && item.offer.price <= mapPrice.high) {
            return false;
          }
        }

        if (flatRoom !== `any` && item.offer.rooms !== parseInt(flatRoom, 10)) {
          return false;
        }

        if (flatGuest !== `any` && item.offer.guests !== parseInt(flatGuest, 10)) {
          return false;
        }
        return true;
      });

      // код возвращает все приимущества что выбрал пользователь
      const allFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
      const featuresNodeList = document.querySelectorAll(`.map__checkbox`); // нашли поле со всеми features
      const activeFlatFeatures = []; // сюда записываем приимущества которые выбрал пользователь
      for (let j = 0; j < featuresNodeList.length; j++) { // делаем обход
        if (featuresNodeList[j].checked) { // если фильтр идет попарядку как и массив allFeatures
          activeFlatFeatures.push(allFeatures[j]); // если что-то выберет пользователь в html то и попадет в массив приимущесть
        }
      }

      // сортируем основной уникальный массив на приимущества features
      const sortFeatures = sortUniqueTotalFilterFlats.filter(function (item) {
        let countFeature = 0; // счетчик нужен для сравнения или есть все совпадения
        for (let r = 0; r < activeFlatFeatures.length; r++) { // перебираем все активные приимущества что выбрал пользователь
          for (let i = 0; i < item.offer.features.length; i++) { // перебираем все примущества каждого объекта недважимости
            if (activeFlatFeatures[r] === item.offer.features[i]) { // сравниваем каждое приимущество с каждым набором примущест каждого обхекта недвижимости
              countFeature++; // если есть совадение то добавляем к счетчику
            }
          }
        }
        if (countFeature !== activeFlatFeatures.length) { // если счетчик отличается от числа массива примуществ выбраного пользователем, то
          return false; // означает не все приимущества есть в этом объекте недвижимости. Значит вернут  false
        }
        return true; // если совпадаем вернуть, то вернуть этот массив для отрисовки Меток
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
