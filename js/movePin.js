'use strict';

const mapPinMain = document.querySelector(`.map__pin--main`);
mapPinMain.addEventListener(`mousedown`, function (evt) {
  // console.log(`на меня нажали`);
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };
  const onMapPinMainMouseMove = function (evtMove) {
    // console.log(`меня двигают`);
    evtMove.preventDefault();
    const shift = {
      x: startCoords.x - evtMove.clientX,
      y: startCoords.y - evtMove.clientY,
    };
    startCoords = {
      x: evtMove.clientX,
      y: evtMove.clientY,
    };

    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + `px`;
    mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + `px`;
  };

  const onMapPinMainMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMapPinMainMouseMove);
    document.removeEventListener(`mouseup`, onMapPinMainMouseUp);
  };
  document.addEventListener(`mousemove`, onMapPinMainMouseMove);
  document.addEventListener(`mouseup`, onMapPinMainMouseUp);
});


