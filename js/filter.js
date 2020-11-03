'use strict';

const DEBOUNCE_INTERVAL = 500; // интервал задержки
const ANY_CHOUCE = `any`;
const ALL_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`]; // переисление всех кнопок приимущества в точности как в разметке

const MapPrice = { // словарь для фильтрации middle
  MIDDLE_MIN: 10000,
  MIDDLE_MAX: 50000,
  LOW: 10000,
  HIGH: 50000,
};

const PriceValue = {
  ANY: `any`,
  LOW: `low`,
  MIDDLE: `middle`,
  HIGH: `high`,
};


// удаление меток если было изменения фильтра
const delPin = function () {
  // удаление всех меток кроме главной
  const mapPins = window.startPins.mapPinsHtml.querySelectorAll(`.map__pin`); // найти все метки
  for (let i = 0; i < mapPins.length; i++) { // перебрать все метки
    if (!mapPins[i].classList.contains(`map__pin--main`)) { // все метки которой нет главной
      mapPins[i].remove(); // удалить все метки кроме главной
    }
  }
};


// функция которая проверяет или карточка открыта, если открыта и есть измения фильтра то карточка закрывается
const delCard = function () {
  if (window.card.map.querySelector(`.map__card`)) { // если карточка открыта
    const mapCards = document.querySelector(`.map__card`); // то находим карточку
    mapCards.remove(); // удаляем карточку т.к. условие при клике любого фильтра удаляем карточку
  }
};


// функция которая отрисовывает pin после изменения фильтра
const renderNewPin = function (newPins) {
  delPin();
  if (newPins.length < window.pin.MAX_PIN) {
    for (let i = 0; i < newPins.length; i++) { // перебрать все данные которые получены и перенесены в переменную
      const fragmentPin = window.pin.createPin(newPins[i]); // создаем метку через функцию выше
      fragmentPin.setAttribute(`data-index`, i); // устанавливаем меткам индекс
      window.startPins.fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
      window.startPins.renderPin(); // прорисовываем метки
    }
  } else if (newPins.length > window.pin.MAX_PIN) {
    for (let i = 0; i < window.pin.MAX_PIN; i++) { // перебрать все данные которые получены и перенесены в переменную
      const fragmentPin = window.pin.createPin(newPins[i]); // создаем метку через функцию выше
      fragmentPin.setAttribute(`data-index`, i); // устанавливаем меткам индекс
      window.startPins.fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
      window.startPins.renderPin(); // прорисовываем метки
    }
  }
};


let lastTimeout;
const mapFilters = document.querySelector(`.map__filters`); // выбрал все фильтры

const filterPin = function (arr) {
  const copyDataFlats = arr; // скопировали запрос по массиву, чтобы не делать каждый раз запрос

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
  // const mapFilters = document.querySelector(`.map__filters`); // выбрал все фильтры
  mapFilters.addEventListener(`change`, function () { // если в каждом фильтре есть изменения
    delCard(); // вставили функцию удаления карточки

    const filterTypeFlats = copyDataFlats.filter(function (item) { // фильтр. copyDataFlats - сортируем этот фильтр. copyDataFlats это item типа [q, w] item = q и т.д.
      if (item.offer.type === flatName) { // заходим в каждую строку объекта тип и если он равен значению пользователя то
        return item.offer.type === flatName; //  возвращаем все объекты в которых нашли схожесть
      } else if (flatName === ANY_CHOUCE) { // если выбрали все  то
        return item.offer.type; // возвращаем все
      }
      // else {
      return false;
      // }
    });

    const filterPriceFlats = copyDataFlats.filter(function (item) {
      if (flatPrice === PriceValue.MIDDLE) {
        if (item.offer.price >= MapPrice.MIDDLE_MIN && item.offer.price < MapPrice.MIDDLE_MAX) {
          return item.offer.price >= MapPrice.MIDDLE_MIN && item.offer.price < MapPrice.MIDDLE_MAX;
        }
      }
      if (flatPrice === PriceValue.LOW) {
        return item.offer.price < MapPrice.LOW;
      }
      if (flatPrice === PriceValue.HIGH) {
        return item.offer.price >= MapPrice.HIGH;
      }
      if (flatPrice === PriceValue.ANY) {
        return item.offer.price;
      }
      return false;
    });

    const filterRoomFlats = copyDataFlats.filter(function (item) {
      if (flatRoom !== ANY_CHOUCE) {
        const numberFlatRoom = parseInt(flatRoom, 10);
        return item.offer.rooms === numberFlatRoom;
      }
      return item.offer.rooms;
    });

    const filterGuestFlats = copyDataFlats.filter(function (item) {
      if (flatGuest !== ANY_CHOUCE) {
        const numberFlatGuest = parseInt(flatGuest, 10);
        return item.offer.guests === numberFlatGuest;
      }
      return item.offer.guests;
    });


    const totalFilterFlats = filterTypeFlats.concat(filterPriceFlats).concat(filterRoomFlats).concat(filterGuestFlats); // создали обдщий массив по выбраным фильтрам кроме features

    const uniqueTotalFilterFlats = totalFilterFlats.filter(function (item, index) { // удалили повторяющие квартиры друг с другом в фильтррах
      return totalFilterFlats.indexOf(item) === index; // пока не понял этой записи
    });

    // сортируем уникальный массив, но походу первая часть сортировки лишняя
    const sortUniqueTotalFilterFlats = uniqueTotalFilterFlats.filter(function (item) {
      if (flatName !== ANY_CHOUCE && item.offer.type !== flatName) {
        return false;
      }

      if (flatPrice === PriceValue.MIDDLE) {

        if (flatPrice !== PriceValue.ANY && item.offer.price < MapPrice.MIDDLE_MIN) {
          return false;
        } // не получилось соединить эти 2 условия. Не знаю почему.
        if (flatPrice !== PriceValue.ANY && item.offer.price >= MapPrice.MIDDLE_MAX) {
          return false;
        }
      }
      if (flatPrice === PriceValue.LOW) {
        if (flatPrice !== PriceValue.ANY && item.offer.price > MapPrice.LOW) {
          return false;
        }
      }
      if (flatPrice === PriceValue.HIGH) {
        if (flatPrice !== PriceValue.ANY && item.offer.price <= MapPrice.HIGH) {
          return false;
        }
      }

      if (flatRoom !== ANY_CHOUCE && item.offer.rooms !== parseInt(flatRoom, 10)) {
        return false;
      }

      if (flatGuest !== ANY_CHOUCE && item.offer.guests !== parseInt(flatGuest, 10)) {
        return false;
      }
      return true;
    });

    // код возвращает все приимущества что выбрал пользователь
    const featuresNodeList = document.querySelectorAll(`.map__checkbox`); // нашли поле со всеми features
    const activeFlatFeatures = []; // сюда записываем приимущества которые выбрал пользователь
    for (let j = 0; j < featuresNodeList.length; j++) { // делаем обход
      if (featuresNodeList[j].checked) { // если фильтр идет попарядку как и массив ALL_FEATURES
        activeFlatFeatures.push(ALL_FEATURES[j]); // если что-то выберет пользователь в html то и попадет в массив приимущесть
      }
    }

    // сортируем основной уникальный массив на приимущества features
    const sortFeatures = sortUniqueTotalFilterFlats.filter(function (item) {
      let countFeature = 0; // счетчик нужен для сравнения или есть все совпадения
      for (let i = 0; i < activeFlatFeatures.length; i++) { // перебираем все активные приимущества что выбрал пользователь
        for (let j = 0; j < item.offer.features.length; j++) { // перебираем все примущества каждого объекта недважимости
          if (activeFlatFeatures[i] === item.offer.features[j]) { // сравниваем каждое приимущество с каждым набором примущест каждого обхекта недвижимости
            countFeature++; // если есть совадение то добавляем к счетчику
          }
        }
      }
      if (countFeature !== activeFlatFeatures.length) { // если счетчик отличается от числа массива примуществ выбраного пользователем, то
        return false; // означает не все приимущества есть в этом объекте недвижимости. Значит вернут  false
      }
      return true; // если совпадаем вернуть, то вернуть этот массив для отрисовки Меток
    });

    // установка задержки прорисовки меток, теперь не будут маргать
    // если не сделать этот код, то будут рендерится метки несколько раз(в зависимости от кликов по фильтру) только с задержкой
    if (lastTimeout) { // если в переменной есть идентификатор timeouta
      clearTimeout(lastTimeout); // то мы удаляем timeout
    } // т.е. если есть какоето действие мы должны его выждать, а потом только удалить
    lastTimeout = setTimeout(function () { // setTimeout возвращает идентификатор усановленного timeouta
      renderNewPin(sortFeatures);
    }, DEBOUNCE_INTERVAL);
  });
};

window.backend.load(filterPin, window.error.onError); // делаем запрос для заполнения данных для метки

window.filter = {
  mapFilters
};
