'use strict';

const DEBOUNCE_INTERVAL = 500; // интервал задержки
const ANY_CHOICE = `any`;
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
const mapFilters = document.querySelector(`.map__filters`); // выбрал все фильтры
let lastTimeout;

const filterPin = function (arr) {
  window.head.removeAddDisabled(window.head.mapFilterSelects); // удалили disabled из фильтра на карте ТОЛЬКО после загрузки меток

  const copyDataFlats = arr; // скопировали запрос по массиву, чтобы не делать каждый раз запрос

  let flatName = `any`; // будет значение которое выбрал пользователь по квартире
  let flatPrice = `any`; // будет значение которое выбрал пользователь по цене
  let flatRoom = `any`; // будет значение которое выбрал пользователь по цене
  let flatGuest = `any`; // будет значение которое выбрал пользователь по цене

  // делаем отслеживание кликов на типе квартир и заменяем данные any на выбраные пользователем
  const housingType = document.querySelector(`#housing-type`); // находим поле с фильтром по типу жилья
  // следим за фильтрами если есть зименения то перписываем value фильтра
  housingType.addEventListener(`change`, function (evt) { // после изменения поля тип
    flatName = evt.target.value;
  });
  const housingPrice = document.querySelector(`#housing-price`); // находим поле с ценой
  housingPrice.addEventListener(`change`, function (evt) {
    flatPrice = evt.target.value;
  });
  const housingRoom = document.querySelector(`#housing-rooms`); // находим поле с ценой
  housingRoom.addEventListener(`change`, function (evt) {
    flatRoom = evt.target.value;
  });
  const housingGuest = document.querySelector(`#housing-guests`); // находим поле с ценой
  housingGuest.addEventListener(`change`, function (evt) {
    flatGuest = evt.target.value;
  });

  // удаление карточки если она была открыта
  mapFilters.addEventListener(`change`, function () { // если в каждом фильтре есть изменения
    window.label.delPin(); // вставили функцию удаления меток
    window.propertyDescription.delCard(); // вставили функцию удаления карточки
    const filterTypeFlat = copyDataFlats.filter(function (item) { // фильтр. copyDataFlats - сортируем этот фильтр. copyDataFlats это item типа [q, w] item = q и т.д.
      if (item.offer.type === flatName) { // заходим в каждую строку объекта тип и если он равен значению пользователя то
        return item.offer.type === flatName; //  возвращаем все объекты в которых нашли схожесть
      }
      return true; // возвращем ничего true т.е. все объекты с квартирами, если false то вернется [] пустота и ничего не покажется
    });

    const filterPriceFlat = copyDataFlats.filter(function (item) {
      if (flatPrice === PriceValue.MIDDLE && item.offer.price >= MapPrice.MIDDLE_MIN && item.offer.price < MapPrice.MIDDLE_MAX) {
        return item.offer.price >= MapPrice.MIDDLE_MIN && item.offer.price < MapPrice.MIDDLE_MAX;
      }
      if (flatPrice === PriceValue.LOW) {
        return item.offer.price < MapPrice.LOW;
      }
      if (flatPrice === PriceValue.HIGH) {
        return item.offer.price >= MapPrice.HIGH;
      }
      return true; // возвращем ничего true т.е. все объекты с квартирами, если false то вернется [] пустота и ничего не покажется
    });

    const filterRoomFlat = copyDataFlats.filter(function (item) {
      if (flatRoom !== ANY_CHOICE) {
        const numberFlatRoom = parseInt(flatRoom, 10);
        return item.offer.rooms === numberFlatRoom;
      }
      return true; // возвращем true т.е. все объекты с квартирами, если false то вернется [] пустота и ничего не покажется
    });

    const filterGuestFlat = copyDataFlats.filter(function (item) {
      if (flatGuest !== ANY_CHOICE) {
        const numberFlatGuest = parseInt(flatGuest, 10);
        return item.offer.guests === numberFlatGuest;
      }
      return true; // возвращем ничего true т.е. все объекты с квартирами, если false то вернется [] пустота и ничего не покажется
    });

    const totalFilterFlats = filterTypeFlat.concat(filterPriceFlat).concat(filterRoomFlat).concat(filterGuestFlat); // создали обдщий массив по выбраным фильтрам кроме features

    const uniqueTotalFilterFlats = totalFilterFlats.filter(function (item, index) { // удалили повторяющие квартиры друг с другом в фильтррах
      return totalFilterFlats.indexOf(item) === index; // пока не понял этой записи
    });

    // фильтруем уникальный массив, но походу первая часть сортировки лишняя
    const filteredUniqueTotalFilterFlats = uniqueTotalFilterFlats.filter(function (item) {
      if (flatName !== ANY_CHOICE && item.offer.type !== flatName) {
        return false;
      }

      if (flatPrice === PriceValue.MIDDLE && flatPrice !== PriceValue.ANY && item.offer.price < MapPrice.MIDDLE_MIN) {
        return false;
      } else if (flatPrice === PriceValue.MIDDLE && flatPrice !== PriceValue.ANY && item.offer.price >= MapPrice.MIDDLE_MAX) {
        return false;
      } else if (flatPrice === PriceValue.LOW && flatPrice !== PriceValue.ANY && item.offer.price >= MapPrice.LOW) {
        return false;
      } else if (flatPrice === PriceValue.HIGH && flatPrice !== PriceValue.ANY && item.offer.price <= MapPrice.HIGH) {
        return false;
      }

      if (flatRoom !== ANY_CHOICE && item.offer.rooms !== parseInt(flatRoom, 10)) {
        return false;
      }

      if (flatGuest !== ANY_CHOICE && item.offer.guests !== parseInt(flatGuest, 10)) {
        return false;
      }
      return true;
    });

    // код возвращает все приимущества что выбрал пользователь
    const featuresNodeList = document.querySelectorAll(`.map__checkbox`); // нашли поле со всеми features
    const activeFlatFeatures = []; // сюда записываем приимущества которые выбрал пользователь

    featuresNodeList.forEach((item, i) => { // делаем обход
      if (item.checked) { // если фильтр идет попарядку как и массив ALL_FEATURES
        activeFlatFeatures.push(ALL_FEATURES[i]); // если что-то выберет пользователь в html то и попадет в массив приимуществ
      }
    });

    // сортируем основной уникальный массив на приимущества features
    const filteredFeatures = filteredUniqueTotalFilterFlats.filter(function (item) {
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
      window.label.renderNewPin(filteredFeatures);
    }, DEBOUNCE_INTERVAL);
  });
  window.label.renderNewPin(copyDataFlats);
};

window.sort = {
  mapFilters,
  filterPin,
};

