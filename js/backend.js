'use strict';

(function () {
  const URL_DATA = `https://21.javascript.pages.academy/keksobooking/data`;
  const TIMEOUT_IN_MS = 10000;

  const load = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onLoad(xhr.response); // в функцию поместили данные
      } else {
        onError(`Статус ответа:  ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Запрос не удался`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`GET`, URL_DATA);
    xhr.send();
  };


  window.backend = {
    load,
  };
})();
