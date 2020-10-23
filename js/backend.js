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

const save = function (data, onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  xhr.responseType = 'json';
  xhr.addEventListener(`load`, function () {
    if(xhr.status === 200){
      onSuccess();
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Отправка не успела выполниться за ` + xhr.timeout + `мс`);
  });
  xhr.timeout = 10000;
  xhr.open(`POST`, URL);
  xhr.send(data);
};
  // save();

  window.backend = {
    load,
    save
  };
})();
