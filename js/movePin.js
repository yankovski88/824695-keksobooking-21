'use strict';
(function () {
  const MAIN_PIN_TIP = 22;
  const PIN_FIELD_MIN_Y = 130;
  const PIN_FIELD_HEIGHT = 630;
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const address = document.querySelector(`#address`);
  const similarListElement = document.querySelector(`.map__pins`);
  const mainPinHeight = mapPinMain.offsetHeight + MAIN_PIN_TIP; // полная высота of pin

  function fillAddress(elementHtml, currentX, currentY) {
    elementHtml.setAttribute(`value`, `${currentX}, ${currentY}`);
  }

  mapPinMain.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    // запоминаем начальные точки без размера Pin
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    // высчитываем изначальные точки c учетом ширин и высот
    let activeMainPinX = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
    let activeMainPinY = Math.round(mapPinMain.offsetTop + mainPinHeight);

    // сразу изначальные точки записываем в Input адреса
    address.setAttribute(`value`, `${activeMainPinX}, ${activeMainPinY}`);

    // функция по расчету координат когда началось движение
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      // изменение начальное точки после движения в ту или другую сторону на 1px
      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // идет постоянный перерасчет координат
      const currentX = activeMainPinX - shift.x; // точнки для серидины Pin
      const currentY = activeMainPinY - shift.y;

      // надо повоторить не понимаю что делают эти строки кода
      activeMainPinX = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
      activeMainPinY = Math.round(mapPinMain.offsetTop + mainPinHeight);
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + `px`; // пеедвижение по левому углу
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + `px`;
      fillAddress(address, currentX, currentY);

      if (currentX <= 0) {
        mapPinMain.style.left = `${-mapPinMain.offsetWidth / 2}px`;
        fillAddress(address, 0, currentY);
      }
      if (currentX >= similarListElement.offsetWidth) {
        mapPinMain.style.left = `${similarListElement.offsetWidth - mapPinMain.offsetWidth / 2}px`;
        fillAddress(address, similarListElement.offsetWidth, currentY);
      }

      if (currentY <= PIN_FIELD_MIN_Y) {
        mapPinMain.style.top = `${PIN_FIELD_MIN_Y - mainPinHeight}px`;
        fillAddress(address, currentX, PIN_FIELD_MIN_Y);
      }
      if (currentY >= PIN_FIELD_MIN_Y + PIN_FIELD_HEIGHT) {
        mapPinMain.style.top = `${PIN_FIELD_MIN_Y + PIN_FIELD_HEIGHT - mainPinHeight}px`;
        fillAddress(address, currentX, PIN_FIELD_MIN_Y + PIN_FIELD_HEIGHT);
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    }

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();
