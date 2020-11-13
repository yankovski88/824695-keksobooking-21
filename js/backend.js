'use strict';

const URL_DATA = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_SAVE = `https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT_IN_MS = 10000;
const STATUS_OK = 200; // статус который означаем, что запрос прошел

// Делаем запрос по данным там вся информация по объявлениям и координатам меток
const load = function (onLoad, showError) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, function () {
    if (xhr.status === STATUS_OK) {
      onLoad(xhr.response); // в функцию поместили данные
    } else {
      showError(`Статус ответа:  ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, function () {
    showError(`Запрос не удался`);
  });
  xhr.addEventListener(`timeout`, function () {
    showError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(`GET`, URL_DATA);
  xhr.send();
};

// отправляю форму
const save = function (data, onSuccess, showErrorSave) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, function () {
    if (xhr.status === STATUS_OK) {
      onSuccess();
    } else {
      showErrorSave();
    }
  });
  xhr.addEventListener(`timeout`, function () {
    showErrorSave();
  });
  xhr.addEventListener(`error`, function () {
    showErrorSave();
  });
  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(`POST`, URL_SAVE);
  xhr.send(data);
};

window.backend = {
  load,
  save,
};

