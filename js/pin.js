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
    // for (let i = 0; i < allFilter.length; i++) { // перебираю все фильтры
    mapFilters.addEventListener(`change`, function () { // если в каждом фильтре есть изменения
      console.log(`удаляем pin произошла замена`);
      delCard(); // вставили функцию удаления карточки

      // функция по фильтру для типа квартиры
      const copyDataFlats = dataFlats.slice(); // скопировали запрос по массиву, чтобы не делать каждый раз запрос
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
      // console.log(getTypeFlats(copyDataFlats, flatName));



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

        return  filterPriceFlats;
      };
      // console.log(getFilterPriceFlats(copyDataFlats, flatPrice));
      // const priceFlats = getTypeFlats(flatPrice);


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

      const filterWifi = document.querySelector(`#filter-wifi`);
      const filterDishwasher = document.querySelector(`#filter-dishwasher`);
      const filterParking = document.querySelector(`#filter-parking`);
      const filterWasher = document.querySelector(`#filter-washer`);
      const filterElevator = document.querySelector(`#filter-elevator`);
      const filterConditioner = document.querySelector(`#filter-conditioner`);

      const allFilterFeatures = [filterWifi, filterDishwasher, filterParking, filterWasher, filterElevator, filterConditioner];
      const allFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];


      const checkedWifi = getArrCheckedFeature(filterWifi, `wifi`);
      const checkedDishwasher = getArrCheckedFeature(filterDishwasher, `dishwasher`);
      const checkedParking = getArrCheckedFeature(filterParking, `parking`);
      const checkedWasher = getArrCheckedFeature(filterWasher, `washer`);
      const checkedElevator = getArrCheckedFeature(filterElevator, `elevator`);
      const checkedConditioner = getArrCheckedFeature(filterConditioner, `conditioner`);


      // const filteredWizards = sameCoatWizards.concat(sameEyesWizards).concat(wizards);
      //




      const totalFilterFlats = getTypeFlats(copyDataFlats, flatName).concat(getFilterPriceFlats(copyDataFlats, flatPrice)); // создали обдщий массив
      // const totalFilterFlats = filterTypeFlats.concat(filterPriceFlats).concat(filterRoomFlats).concat(filterGuestFlats).concat(checkedWifi).concat(checkedDishwasher).concat(checkedParking).concat(checkedWasher).concat(checkedElevator).concat(checkedConditioner);

      console.log(totalFilterFlats);

      const uniqueTotalFilterFlats = totalFilterFlats.filter(function (item, index) { // удалили повторяющие квартиры друг с другом в фильтррах
        return totalFilterFlats.indexOf(item) === index;
      });
      console.log(uniqueTotalFilterFlats);



      // const getTypeFlats = function (copyDataFlats, flatName) {
      //   const
      //   const filterTypeFlats = copyDataFlats.filter(function (copyDataFlats2) { //фильтр. copyDataFlats - сортируем этот фильтр. copyDataFlats это item типа [q, w] item = q и т.д.
      //     if (copyDataFlats2.offer.type === flatName) { // заходим в каждую строку объекта тип и если он равен значению пользователя то
      //       return copyDataFlats.offer.type === flatName; //  возвращаем все объекты в которых нашли схожесть
      //     }
      //     else if (flatName === `any`) { // если выбрали все  то
      //       return copyDataFlats.offer.type; // возвращаем все
      //     }
      //   });
      //   return filterTypeFlats;
      // };


      // const priceFilter = 'any';
      // const colorFilter = 'red';
      //
      // [
      //   {price: 100,   color: 'red'},
      //   {price: 1000,  color: 'white'},
      //   {price: 'any', color: 'blue'}
      // ].filter(function(el) {
      //   if (priceFilter !== 'any' && el.price !== priceFilter) {
      //     return false;
      //   }
      //
      //   if (colorFilter !== 'any' && el.color !== colorFilter) {
      //     return false;
      //   }
      //
      //   return true;
      // });
// console.log(uniqueTotalFilterFlats);
      // const getSortUniqueTotalFilterFlats = function () {
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
          // if (flatPrice === `middle`) {
          //   if (copyDataFlats.offer.price >= mapPrice.middleMin && copyDataFlats.offer.price < mapPrice.middleMax) {
          //     return copyDataFlats.offer.price >= mapPrice.middleMin && copyDataFlats.offer.price < mapPrice.middleMax;
          //   }
          // }

          // if (flatPrice === `any`) {
          //   return copyDataFlats.offer.price;
          // }

          if (flatPrice === `middle`) {
            console.log(`выбрано middle`);
            console.log(item.offer.price);
            console.log(item.offer.price <= mapPrice.middleMin);

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
          if(flatPrice === `high`) {
            if (flatPrice !== 'any' && item.offer.price <= mapPrice.high) {
              return false;
            }
          }
            if(flatPrice === `any`) {
              // if (flatPrice !== 'any' && item.offer.price <= mapPrice.high) {
                return true;
              // }
          }
          return true;
        });



      console.log(sortUniqueTotalFilterFlats);







      // const sameCoatAndEyesWizards = wizards.filter(function (wizard) {
      //   return wizard.colorCoat === coatColor &&
      //     wizard.colorEyes === eyesColor;
      // });
      // const totalFilterFlats = filterTypeFlats.concat(filterPriceFlats).concat(filterRoomFlats).concat(filterGuestFlats).concat(checkedWifi).concat(checkedDishwasher).concat(checkedParking).concat(checkedWasher).concat(checkedElevator).concat(checkedConditioner);
      // console.log(totalFilterFlats);
      // console.log(uniqueTotalFilterFlats);


      // const uniqueTotalFilterFlats = totalFilterFlats.filter(function(wiz, index) {
      //   return totalFilterFlats.indexOf(wiz) === index;
      // });

      // console.log(uniqueTotalFilterFlats);
      // const setTotalFilterFlats = new Set(totalFilterFlats);
      // console.log(setTotalFilterFlats);
      // const totalFilterFlatsTwo = [filterTypeFlats.concat(filterPriceFlats)];
      // console.log(totalFilterFlatsTwo);
      // const setTotalFilterFlatsTwo = new Set(totalFilterFlatsTwo);
      // console.log(setTotalFilterFlatsTwo);

      // console.log(setTotalFilterFlats);

// const copyDataFlats = dataFlats.slice();
// console.log(copyDataFlats);


      const renderNewPin = function (newPins) {
        delPin();
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
      renderNewPin(sortUniqueTotalFilterFlats);
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
