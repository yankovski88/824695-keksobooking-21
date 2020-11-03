'use strict';

const onError = function (errorMessage) { // всплывающее окно с ошибкой
  const mapOverlay = document.querySelector(`.map__overlay`); // нашли место куда вставлять метки

  const node = document.createElement(`div`);
  node.style = `
    z-index: 100; 
    margin: 0 auto; 
    text-align: center; 
    background-color: white; 
    height: 130px;display: flex; 
    justify-content: center; 
    align-items: center`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.color = `red`;
  node.style.fontSize = `50px`;

  node.textContent = errorMessage;
  mapOverlay.appendChild(node); // вставили окно с ошибкой, ПОКА не знаю в чем разница между appendChild и append
};
window.error = {
  onError,
};

