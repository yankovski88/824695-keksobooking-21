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

  let flatName = ``; // будет значение которое выбрал пользователь по квартире
  // делаем отслеживание кликов на типе квартир
  const housingType = document.querySelector(`#housing-type`); // находим поле с фильтром по типу жилья

  // функция сравнения цены по типу жилья
  const onTypeChangeFilter = function () {
    flatName = housingType.value;
  };

  housingType.addEventListener(`change`, function () { // после изменения поля тип
    // удаление всех меток кроме главной
    const mapPins = mapPinsHtml.querySelectorAll(`.map__pin`);
    for (let i = 0; i < mapPins.length; i++) {
      if (!mapPins[i].classList.contains(`map__pin--main`)) {
        mapPins[i].remove();
      }
    }
    onTypeChangeFilter(); // записываем данные на что выбрали
    let count = 0; // создаем счетчик чтобы не было больше 5 объявлений
    let arrTypes = []; // создали массив с выборкой типа жилья выбраного пользователем
    for (let i = 0; i < dataFlats.length; i++) { // перебрать все данные которые получены и перенесены в переменную
      if (flatName === dataFlats[i].offer.type) { // если значение value выбраное пользователем равно значению из базы данных то
        count++; // первое совподение есть к счетчику приплюсовать
        if (count <= MAX_PIN) { // пока счетчик меньше 5 то
          arrTypes.push(dataFlats[i]); // добавить объект квартиры в массив выборки
          const fragmentPin = createPin(dataFlats[i]); // создаем метку через функцию выше
          fragmentPin.setAttribute(`data-index`, i); // устанавливаем меткам индекс
          fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
          renderPin(); // прорисовываем метки
        }
      } else if (flatName === `any`) { // если пользователь выбрал все жилье
        for (let j = 0; j < MAX_PIN; j++) { // перебираем все жилье до максиммума 5
          const fragmentPin = createPin(dataFlats[j]); // создаем метку через функцию выше
          fragmentPin.setAttribute(`data-index`, j); // устанавливаем меткам индекс
          fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
          renderPin(); // прорисовываем метки
        }
      }
    }
  });

  // удаление карточки если она открыта
  const delCard = function () {
    if (map.querySelector(`.map__card`)) { // если карточка открыта
      const mapCards = document.querySelector(`.map__card`); // то находим карточку
      mapCards.remove(); // удаляем карточку т.к. условие при клике любого фильтра удаляем карточку
    }
  };
  // удаление карточки если она была открыта
  const map = document.querySelector(`.map`); // нашел место где отображаются карточки
  const allFilter = document.querySelectorAll(`.map__filter`); // выбрал все фильтры
  for (let i = 0; i < allFilter.length; i++) { // перебираю все фильтры
    allFilter[i].addEventListener(`change`, function () { // если в каждом фильтре есть изменения
      delCard(); // вставили функцию удаления карточки
    });
  }

  // удаление карточки после изменения фильтра в плюсам квартир
  const housingFeature = document.querySelector(`#housing-features`); // находим поле плюсов квартир
  housingFeature.addEventListener(`change`, function () { // ставим обработчик на изменения поля плюсов
    delCard(); // удаляем карту
  });

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
