'use strict';

(function () {
  const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`); // нашли шаблон по pin

  const createPin = function (obj) { // по этому макету создается метка
    const pinTemplate = pin.cloneNode(true); // создаем клоны метки
    pinTemplate.querySelector(`img`).src = obj.author.avatar; // вставили ссылку на аватар
    pinTemplate.querySelector(`img`).alt = obj.offer.title; // вставили заголовок
    pinTemplate.style.left = `${obj.location.x}px`; // вставили координаты
    pinTemplate.style.top = `${obj.location.y}px`;
    return pinTemplate; // вернули метку
  };

  const fragment = document.createDocumentFragment(); // создаем фрагмент т.к. без него не вставим
  const MAX_PIN = 5;
  let dataFlats = []; // записали массив данных чтобы постоянно не делать запрос
  // функция которая получает объект с данными
  const onLoad = function (arr) {
    dataFlats = arr;
    for (let i = 0; i < MAX_PIN; i++) { // перебрать все данные кроме последнего
      const fragmentPin = createPin(arr[i]); // создаем метку через функцию выше
      fragmentPin.setAttribute(`data-index`, i); // устанавливаем меткам индекс
      fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки

    }
  };
  window.backend.load(onLoad, window.error.onError); // делаем запрос для заполнения данных для метки


  const delPin = function () {
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

  const filterPin = function () {


    let flatName = `any`; // будет значение которое выбрал пользователь по квартире
    let flatPrice = `any`; // будет значение которое выбрал пользователь по цене
    let flatRoom = `any`; // будет значение которое выбрал пользователь по цене
    let flatGuest = `any`; // будет значение которое выбрал пользователь по цене

    // делаем отслеживание кликов на типе квартир
    const housingType = document.querySelector(`#housing-type`); // находим поле с фильтром по типу жилья

    // функция наименования перменной по типу жилья
    const onTypeChangeFilter = function () {
      flatName = housingType.value;

      // let count = 0; // создаем счетчик чтобы не было больше 5 объявлений
      // for (let i = 0; i < dataFlats.length; i++) { // перебрать все данные которые получены и перенесены в переменную
      //   if ((flatName === dataFlats[i].offer.type) && (flatPrice === dataFlats[i].offer.type)) { // если значение value выбраное пользователем равно значению из базы данных то
      //     count++; // первое совподение есть к счетчику приплюсовать
      //     if (count <= MAX_PIN) { // пока счетчик меньше 5 то
      //       arrTypes.push(dataFlats[i]); // добавить объект квартиры в массив выборки
      //       const fragmentPin = createPin(dataFlats[i]); // создаем метку через функцию выше
      //       fragmentPin.setAttribute(`data-index`, i); // устанавливаем меткам индекс
      //       fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
      //       renderPin(); // прорисовываем метки
      //     }
      //   } else if (flatName === `any`) { // если пользователь выбрал все жилье
      //     for (let j = 0; j < MAX_PIN; j++) { // перебираем все жилье до максиммума 5
      //       arrTypes.push(dataFlats[i]); // добавить объект квартиры в массив выборки
      //       const fragmentPin = createPin(dataFlats[j]); // создаем метку через функцию выше
      //       fragmentPin.setAttribute(`data-index`, j); // устанавливаем меткам индекс
      //       fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
      //       renderPin(); // прорисовываем метки
      //     }
      //   }
      // }
      // console.log(arrTypes);

    };

    let arrTypes = []; // создали массив с выборкой типа жилья выбраного пользователем

    housingType.addEventListener(`change`, function () { // после изменения поля тип
      delPin();

      onTypeChangeFilter(); // записываем данные на что выбрали
    });


    const housingPrice = document.querySelector(`#housing-price`); // находим поле с ценой
    housingPrice.addEventListener(`change`, function () {
      delPin();
      flatPrice = housingPrice.value;
// console.log(housingPrice.value);
// if(housingPrice.value === `any`){
//
// }
    });
    const housingRoom = document.querySelector(`#housing-rooms`); // находим поле с ценой
    housingRoom.addEventListener(`change`, function () {
      delPin();
      flatRoom = housingRoom.value;
// console.log(housingPrice.value);
// if(housingPrice.value === `any`){
//
// }
    });
    const housingGuest = document.querySelector(`#housing-guests`); // находим поле с ценой
    housingGuest.addEventListener(`change`, function () {
      delPin();
      // console.log(housingGuest.value);
      flatGuest = housingGuest.value;
// console.log(housingPrice.value);
// if(housingPrice.value === `any`){
//
// }
    });


    // удаление карточки если она была открыта
    const mapFilters = document.querySelector(`.map__filters`); // выбрал все фильтры
    // for (let i = 0; i < allFilter.length; i++) { // перебираю все фильтры
    mapFilters.addEventListener(`change`, function () { // если в каждом фильтре есть изменения
      console.log(`удаляем pin произошла замена`);
      delCard(); // вставили функцию удаления карточки

      // функция по фильтру для типа квартиры
      // console.log(dataFlats[i].offer.type);
      const copyDataFlats = dataFlats.slice();
// console.log(copyDataFlats);
      const filterTypeFlats = copyDataFlats.filter(function (copyDataFlats) {
        return copyDataFlats.offer.type === flatName;
      });
      const filterPriceFlats = copyDataFlats.filter(function (copyDataFlats) {
        const mapPrice = {
          any: `все цены`,
          middleMin: 10000,
          middleMax: 50000,
          low: 10000,
          high: 50000,
        };

        if (flatPrice === `middle`) {
          return copyDataFlats.offer.price > mapPrice.middleMin || copyDataFlats.offer.price < mapPrice.middleMax;
        }
        if (flatPrice === `low`) {
          return copyDataFlats.offer.price < mapPrice.low;
        }
        if (flatPrice === `high`) {
          return copyDataFlats.offer.price > mapPrice.high;
        }
        if (flatPrice === `any`) {
          return copyDataFlats.offer.price;
        }
      });
      const filterRoomFlats = copyDataFlats.filter(function (copyDataFlats) {
        if (flatRoom !== `any`) {
          console.log(flatRoom);
          console.log(copyDataFlats.offer.rooms);
          const numberFlatRoom = parseInt(flatRoom);
          return copyDataFlats.offer.rooms === numberFlatRoom;

        } else {
          return copyDataFlats.offer.rooms;
        }
      });
      // console.log(flatGuest);

      const filterGuestFlats = copyDataFlats.filter(function (copyDataFlats) {
        if (flatGuest !== `any`) {
          console.log(flatGuest);
          console.log(copyDataFlats.offer.guests);
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
          }
        );
        return filterFeatures
      };

      const filterWifi = document.querySelector(`#filter-wifi`);
      const filterDishwasher = document.querySelector(`#filter-dishwasher`);
      const filterParking = document.querySelector(`#filter-parking`);
      const filterWasher = document.querySelector(`#filter-washer`);
      const filterElevator = document.querySelector(`#filter-elevator`);
      const filterConditioner = document.querySelector(`#filter-conditioner`);

      const allFilterFeatures = [filterWifi, filterDishwasher, filterParking, filterWasher, filterElevator, filterConditioner];
      const allFeatures = [`wifi`,`dishwasher`,`parking`,`washer`,`elevator`,`conditioner`];


      const checkedWifi = getArrCheckedFeature(filterWifi, `wifi`);
      const checkedDishwasher = getArrCheckedFeature(filterDishwasher, `dishwasher`);
      const checkedParking = getArrCheckedFeature(filterParking, `parking`);
      const checkedWasher = getArrCheckedFeature(filterWasher, `washer`);
      const checkedElevator = getArrCheckedFeature(filterElevator, `elevator`);
      const checkedConditioner = getArrCheckedFeature(filterConditioner, `conditioner`);

      console.log(checkedWifi);
      console.log(filterPriceFlats);

      const totalFilterFlats = [filterTypeFlats.concat(filterPriceFlats).concat(filterRoomFlats).concat(filterGuestFlats).concat(checkedWifi).concat(checkedDishwasher).concat(checkedParking).concat(checkedWasher).concat(checkedElevator).concat(checkedConditioner)];
      console.log(totalFilterFlats);
      const setTotalFilterFlats = new Set(totalFilterFlats);
      console.log(setTotalFilterFlats);
      // const totalFilterFlatsTwo = [filterTypeFlats.concat(filterPriceFlats)];
      // console.log(totalFilterFlatsTwo);
      // const setTotalFilterFlatsTwo = new Set(totalFilterFlatsTwo);
      // console.log(setTotalFilterFlatsTwo);

      // console.log(setTotalFilterFlats);

// const copyDataFlats = dataFlats.slice();
// console.log(copyDataFlats);


      const renderNewPin = function (newPins) {
        if (newPins.length < MAX_PIN) {
          for (let i = 0; i < newPins.length; i++) { // перебрать все данные которые получены и перенесены в переменную
            // console.log(newPins[i])
            const fragmentPin = createPin(newPins[i]); // создаем метку через функцию выше
            fragmentPin.setAttribute(`data-index`, i); // устанавливаем меткам индекс
            fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
            renderPin(); // прорисовываем метки
          }
        } else if (newPins.length > MAX_PIN) {
          for (let i = 0; i < MAX_PIN; i++) { // перебрать все данные которые получены и перенесены в переменную
            // console.log(newPins[i])
            const fragmentPin = createPin(newPins[i]); // создаем метку через функцию выше
            fragmentPin.setAttribute(`data-index`, i); // устанавливаем меткам индекс
            fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
            renderPin(); // прорисовываем метки
          }
        }
      };
      renderNewPin(filterTypeFlats);
    });
    // }

    // удаление карточки после изменения фильтра в плюсам квартир
    // const housingFeature = document.querySelector(`#housing-features`); // находим поле плюсов квартир
    // housingFeature.addEventListener(`change`, function () { // ставим обработчик на изменения поля плюсов
    //   delCard(); // удаляем карту
    // });


    // const updateWizards = function () {
    //   window.render(wizards);
    // }
    const updatePins = function () {
      renderPin();
    };


  };
  filterPin();


  const mapPinsHtml = document.querySelector(`.map__pins`); // место куда будут вставлятся pinы
  const renderPin = function () { // отрисовать метки
    mapPinsHtml.appendChild(fragment); // одним фрагментом Pin вствили в html
  };
  window.pin = {
    fragment,
    pin,
    renderPin,
  };

})();
