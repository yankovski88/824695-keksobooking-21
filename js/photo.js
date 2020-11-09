'use strict';

const photoFlat = document.querySelector(`.ad-form__upload input[type=file]`);
const previewPhotoFlat = document.querySelector(`.ad-form__photo`);
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const fileChooser = document.querySelector(`.ad-form__field input[type=file]`); // находим элемент загрузки фото внутри которго input
const previewAvatar = document.querySelector(`.ad-form-header__preview`); // картинка, куда мы будем выставлять превью загруженного изображения
const loadFile = function (fileChooserLoad, previewPhoto, fileTypes) {
  fileChooserLoad.addEventListener(`change`, () => { // обработчик, пользователь кликает поле для загрузки
    const file = fileChooserLoad.files[0]; // получаем из списка загруженный один файл
    const fileName = file.name.toLowerCase(); // имя файла приводим к нижнему регистру это понадобится для сравнения файла с расширением
    // делаем проверку что выбрал польззователь

    // проверка окончания файла одним из доступных наших расширений
    const matches = fileTypes.some(function (end) { // метод some возвращает булевое значение
      return fileName.endsWith(end);
    });

    // после всех проверок создаем ридер для чтения файла
    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        previewPhoto.replaceChildren(); // replaceChildren()предоставляет очень удобный механизм для очистки узла от всех его дочерних элементов

        previewPhoto.style.display = `flex`;
        previewPhoto.style.alignItems = `center`;
        previewPhoto.style.justifyContent = `center`;
        const imgPhoto = document.createElement(`img`);
        imgPhoto.style.width = `40px`;
        imgPhoto.style.height = `44px`;
        previewPhoto.appendChild(imgPhoto);
        imgPhoto.src = reader.result; // В обработчике результат чтения файла — изображение — мы положим в атрибут src DOM-узла с превью картинки.
      });
      reader.readAsDataURL(file); // просим ридер прочитать наш файл
    }
  });
};

loadFile(fileChooser, previewAvatar, FILE_TYPES);
loadFile(photoFlat, previewPhotoFlat, FILE_TYPES);

window.photo = {
  previewAvatar,
  previewPhotoFlat
};

