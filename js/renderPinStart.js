(function () {
  const fragment = document.createDocumentFragment(); // создаем фрагмент т.к. без него не вставим
  let dataFlats = []; // записали массив данных чтобы постоянно не делать запрос
  // функция которая получает объект с данными

  const onLoad = function (arr) {
    dataFlats = arr;
    for (let i = 0; i < window.pin.MAX_PIN; i++) { // перебрать все данные кроме последнего
      const fragmentPin = window.pin.createPin(arr[i]); // создаем метку через функцию выше
      fragmentPin.setAttribute(`data-index`, i); // устанавливаем меткам индекс
      fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки

    }
  };

  window.backend.load(onLoad, window.error.onError); // делаем запрос для заполнения данных для метки


  const mapPinsHtml = document.querySelector(`.map__pins`); // место куда будут вставлятся pinы
  const renderPin = function () { // отрисовать метки
    mapPinsHtml.appendChild(fragment); // одним фрагментом Pin вствили в html
  };

  window.renderPinStart = {
    renderPin,
    dataFlats,
    fragment
  }


  // const fragment = document.createDocumentFragment(); // создаем фрагмент т.к. без него не вставим
  // let dataFlats = []; // записали массив данных чтобы постоянно не делать запрос
  // // функция которая получает объект с данными
  //
  //
  // const renderNewPin = function (newPins) {
  //   dataFlats = newPins;
  //   window.filter.delPin();
  //   if (newPins.length < window.pin.MAX_PIN) {
  //     for (let i = 0; i < newPins.length; i++) { // перебрать все данные которые получены и перенесены в переменную
  //       console.log(newPins[i]);
  //       const fragmentPin = window.pin.createPin(newPins[i]); // создаем метку через функцию выше
  //       fragmentPin.setAttribute(`data-index`, i); // устанавливаем меткам индекс
  //       fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
  //       renderPin(); // прорисовываем метки
  //     }
  //   } else if (newPins.length > window.pin.MAX_PIN) {
  //     for (let i = 0; i < window.pin.MAX_PIN; i++) { // перебрать все данные которые получены и перенесены в переменную
  //       console.log(newPins[i]);
  //       const fragmentPin = window.pin.createPin(newPins[i]); // создаем метку через функцию выше
  //       fragmentPin.setAttribute(`data-index`, i); // устанавливаем меткам индекс
  //       fragment.appendChild(fragmentPin); // в созданный фрагмент вставляем все наши метки
  //       renderPin(); // прорисовываем метки
  //     }
  //   }
  // };
  // // renderNewPin(sortFeatures);
  //
  // console.log(dataFlats);
  //
  // window.backend.load(renderNewPin, window.error.onError); // делаем запрос для заполнения данных для метки
  //
  //
  // const mapPinsHtml = document.querySelector(`.map__pins`); // место куда будут вставлятся pinы
  // const renderPin = function () { // отрисовать метки
  //   mapPinsHtml.appendChild(fragment); // одним фрагментом Pin вствили в html
  // };
  //
  // window.renderNewPin = {
  //   renderPin
  // }




})();
