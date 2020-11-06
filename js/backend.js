'use strict';
(function () {
  const URL_DATA = `https://21.javascript.pages.academy/keksobooking/data`;
  const TIMEOUT_IN_MS = 10000;
  const STATUS = 200; // статус который означаем, что запрос прошел

  // Делаем запрос по данным там вся информация по объявлениям и координатам меток
  const load = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      if (xhr.status === STATUS) {
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

  // отправляю форму
  const save = function (data, onSuccess, onErrorSave) {
    const xhr = new XMLHttpRequest();
    const URL = `https://21.javascript.pages.academy/keksobooking`;
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      if (xhr.status === STATUS) {
        onSuccess();
      } else {
        onErrorSave();
      }
    });
    xhr.addEventListener(`timeout`, function () {
      onErrorSave();
    });
    xhr.addEventListener(`error`, function () {
      onErrorSave();
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.backend = {
    load,
    save,
  };

})();
