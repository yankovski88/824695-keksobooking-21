"use strict";
(function () {

  // // Задережка в мс
  // const DEBOUNCE_INTERVAL = 500;
  //
  // let lastTimeout = null;
  //
  // // Передается функция коллбэк, которую нужно вызвать с задержкой.
  // const debounceFilter = function (cb) {
  //   if (lastTimeout) {
  //     window.clearTimeout(lastTimeout);
  //   }
  //   lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  // };

  // const DEBAUNCE_INTERVAL = 500;
  // const debounceFilter = function (cb) {
  //   let lastTimeout = null; // определили lastTimeout
  //
  //   // исопльзуем замыкание, это нужно если нужно использовать функция дребизга в нескольких местах
  //   return function () {
  //     const parameters = arguments;
  //
  //     // если не сделать этот код, то будут рендерится метки несколько раз(в зависимости от кликов по фильтру) только с задержкой
  //     if (lastTimeout) { // если в переменной есть идентификатор timeouta
  //       clearTimeout(lastTimeout); // то мы удаляем timeout
  //     } // т.е. если есть какоето действие мы должны его выждать, а потом только удалить
  //     lastTimeout = setTimeout(function () {
  //       cb.apply(null, parameters); // вызвали apply чтобы передать функции необходимый параметр parameters
  //     }, DEBAUNCE_INTERVAL); // setTimeout возвращает идентификатор усановленного timeouta
  //   };
  // };
  //
  //
  // window.debounce = {
  //   debounceFilter,
  // };
})();


