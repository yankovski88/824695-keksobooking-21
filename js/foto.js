'use strict';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector(`.ad-form__field input[type=file]`); // находим элемент загрузки фото внутри которго input
const preview = document.querySelector(`.ad-form-header__preview img`); // картинка, куда мы будем выставлять превью загруженного изображения
const loadFile = function (fileChooser, preview, fileTypes) {
  fileChooser.addEventListener(`change`, () => { // обработчик, пользователь кликает поле для загрузки
    const file = fileChooser.files[0]; // получаем из списка загруженный один файл
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
        preview.src = reader.result; // В обработчике результат чтения файла — изображение — мы положим в атрибут src DOM-узла с превью картинки.
      });
      reader.readAsDataURL(file); // просим ридер прочитать наш файл
    }
  });
};

loadFile(fileChooser, preview, FILE_TYPES);
const fotoFlat = document.querySelector(`.ad-form__upload input[type=file]`);
const previewFotoFlat = document.querySelector(`.ad-form__photo`);
const img = document.createElement(`img`);
img.style.width = `70px`;
img.style.height = `70px`;
// img.alt = `Превью добавленного изображеия`;
const previewFoto = previewFotoFlat.appendChild(img); // отличие append от apppendChild
loadFile(fotoFlat, previewFoto, FILE_TYPES);
