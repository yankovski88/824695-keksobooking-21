'use strict';

const showError = function (errorMessage) { // всплывающее окно с ошибкой
  const node = document.createElement(`div`);
  node.style = `
    position: absolute;
    left: 0;
    right: 0;
    color: red;
    font-size: 50px;
    z-index: 100; 
    margin: 0 auto; 
    text-align: center; 
    background-color: white; 
    height: 130px;
    display: flex; 
    justify-content: center; 
    align-items: center  
  `;

  node.textContent = errorMessage;
  window.card.map.appendChild(node); // вставили окно с ошибкой, ПОКА не знаю в чем разница между appendChild и append
};
window.error = {
  showError,
};

